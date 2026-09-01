# Risk Analysis

Interactive drilldown for VaR / sensitivity data, served at **`/var/risk-analysis`**.

The user decides how to analyse the data: attributes are dragged from the
right-hand panel into an ordered **drilldown hierarchy**, and AG Grid rebuilds
its row grouping to match. Reordering the hierarchy reorders the grouping
levels, so `Category → Product Level 1 → Currency` and
`Currency → Category → Product Level 1` are both one drag apart.

Changes propagate to the whole page, not just the grid — the KPI tiles, the
breadcrumb chips and the URL all react to a drag.

---

## Architecture

```
                       drilldownFields.ts          <- schema: rows, dimensions, measures
                                |
                                v
      RiskAnalysisContext.tsx  (hierarchy, drilldownEnabled, totals)
         ^            ^                  |
         |            |                  v
   AttributePanel  RiskAnalysisGrid   DrilldownSummaryCards
   (writes)        (reads + writes)   (reads)
                        ^
                        |
                   mockDrilldown.ts -> drilldown-rows.json
```

Three things are worth understanding before editing anything here.

**The field catalog is the single source of truth.** `drilldownFields.ts`
declares the row shape, the draggable dimensions and the aggregated measures.
The grid's columns and the panel's items are both _derived_ from those lists, so
adding an attribute is one entry in one file — no component changes.

**Field ids are verbatim API keys.** `ProductLevel1_NM`,
`enterprise_trade_book_covered_position_flag`, `agg_delta` and friends are used
as-is for TypeScript properties, AG Grid column ids and row-group keys. There is
deliberately no mapping layer between the API and the UI.

**Leaf rows are flat, never pre-aggregated.** Because the user picks the
hierarchy at runtime, the data cannot carry a baked-in tree. Every row is a leaf
with all dimensions denormalised onto it, and AG Grid derives whatever grouping
is asked for. This is the only representation that supports arbitrary drilldown
order.

---

## Files

### Data and schema

**`drilldownFields.ts`** — the spine of the feature, imported by almost
everything else. Contains:

- `DrilldownRow` — one leaf row, mirroring the consolidated sensitivity API.
- `dimensionFields` — the 24 draggable attributes, each with a panel label, a
  grid header, a category, an icon and a group-column width.
- `measureFields` — the 6 aggregated numeric columns and their aggregation rule.
- `attributeCategories` — the panel's four groupings.
- `defaultHierarchy` — the drilldown levels applied on first load.
- `dimensionFieldById` — lookup used to resolve ids back to field metadata.

**`drilldown-rows.json`** — the only data source: a captured-shape copy of the
API response, including its `{ status, message, data }` envelope. Generated, and
listed in `.prettierignore` so formatting never churns. Do not hand-edit.

**`mockDrilldown.ts`** — typed loader and the seam where the real API plugs in.
Unwraps `.data`, and owns `computeTotals()` (the KPI aggregation) plus
`DIVERSIFICATION_FACTOR`. Going live means replacing one import with a fetch.

### State

**`RiskAnalysisContext.tsx`** — page-scoped React context holding the ordered
`hierarchy`, the `drilldownEnabled` toggle and the published `totals`. Exposes
`DrilldownProvider` and the `useDrilldown()` hook, plus
`addField` / `removeField` / `moveField` / `replaceHierarchy` /
`clearHierarchy` / `publishTotals`.

It exists because the grid and the panel are _peers_ that both read and write
the hierarchy — you can reorder by dragging in the panel or by regrouping from
the grid's own column menu, and both paths must converge on one state. It also
mirrors the hierarchy into the `?drill=` query string so a view is shareable.

Three details are load-bearing:

- `replaceHierarchy` and `publishTotals` return the _existing_ state object when
  nothing changed. Without those identity checks the grid → context → grid round
  trip becomes an infinite render loop.
- `addField` removes a field before re-inserting it, so dropping an attribute
  that is already in the hierarchy **moves** it rather than doing nothing.
- The incoming URL is captured into a ref during the first render, not inside
  the hydrate effect. React StrictMode runs mount effects twice, and the second
  pass would otherwise read back an already-rewritten query string and lose the
  incoming `?drill=`.

### Page shell

**`RiskAnalysisPanel.tsx`** — layout orchestrator: page title, the drilldown
breadcrumb chips, the KPI row, then the two-column grid-and-panel grid. The
column template keeps the attribute panel beside the grid at every breakpoint
rather than letting it wrap underneath.

**`DrilldownSummaryCards.tsx`** — the KPI tiles, fed by `totals` from the
context. Their purpose is to demonstrate that a drag updates dashboard-wide
state and not only the grid; they recompute from the grid's _filtered_ leaf set.

### Grid

**`RiskAnalysisGrid.tsx`** — the AG Grid Enterprise integration, and the most
intricate file here.

- Builds column definitions from the field catalog.
- Applies grouping imperatively via `setRowGroupColumns` instead of rebuilding
  column definitions, which preserves widths, sorts and filters across a
  reorder.
- Hides the raw dimension columns while grouping is active, since the generated
  group columns already show those attributes.
- Renders an em dash rather than a total on group rows for non-additive
  measures (VaR / SVaR), which must not be summed.
- Maps the API's empty-string codes to `(blank)` via `keyCreator`, so grouping
  by e.g. `TENOR_CD` yields a labelled group instead of an anonymous one.
- Opts the boolean flag out of AG Grid's cell data type inference. Its checkbox
  renderer otherwise takes over the generated group column too, leaving grouped
  rows labelled with nothing but a child count.
- Publishes filtered totals to the context, and pushes grouping changes made
  from the column menu back into the hierarchy.

### Attribute panel

**`AttributePanel.tsx`** — assembles the right-hand panel: hierarchy zone,
search box, attributes grouped by category, and the read-only measures list. It
is also a drop target — dragging a chip out of the hierarchy and back onto the
catalog removes that level.

**`DrilldownHierarchyZone.tsx`** — the ordered drop zone defining the drilldown
sequence. Uses native HTML5 drag and drop rather than AG Grid's internal
`DragAndDropService`, which is not public API. Computes the insertion index from
the pointer's Y position against each row's midpoint and draws the insertion
line. Reordering is drag-only; each chip carries a remove button.

**`AttributeItem.tsx`** — a single draggable attribute row (icon + label).
Dimmed with a checkmark when the field is already in the hierarchy. Double-click
or `Enter` adds it without dragging.

### Utilities

**`drilldownFormat.ts`** — shared palette and number formatters:
`formatAmount`, `formatCompact`, `formatCount`, `amountColor`. `formatCompact`
is hand-rolled rather than using `Intl` compact notation because Node and
Chrome ship different ICU builds, which produced a server/client hydration
mismatch on the KPI tiles.

---

## Working with the mock

Regenerate after changing the taxonomy or row count:

```bash
node scripts/gen-drilldown-mock.mjs
```

The generator is seeded, so two runs are byte-identical and regenerating never
produces a spurious diff. Row count is the `ROW_TARGET` constant at the top.

It reproduces the API's _value_ conventions, not just its key names:

- US SPARC tickers follow two observed patterns — base legs use the currency's
  overnight index (`USSTS.IR_CAD_CORRA.1M`), other legs use the risk factor type
  (`USSTS.IR_CAD_CAD Xccy Basis.1M`).
- MARX tickers carry a day-count suffix, including `T100003` for
  `3MonthIMMFuture`.
- `STRIKE_AM` is `-1` as a not-applicable sentinel on non-option rows.
- `TENOR_CD` and `OPTION_TIME_CD` are empty strings, not `null`, except on
  option legs.
- `agg_close_am` repeats one value across every sensitivity row of a book.

## Swapping in the live API

1. Replace the JSON import in `mockDrilldown.ts` with a fetch of the
   consolidated sensitivity endpoint. The envelope and keys already match, so no
   field mapping is needed.
2. Source `agg_market_value`, `agg_var` and `agg_svar` from the VaR feed and
   rename them to its real columns (see caveats).

At real volume the client-side row model stops being viable — it holds every
leaf in browser memory, which is comfortable to roughly 100k rows. Beyond that,
switch to AG Grid's **Server-Side Row Model**. The panel's output already maps
onto its `rowGroupCols` request field, so that contract does not need
redesigning, but `computeTotals` would have to move to a server aggregate
endpoint because the client would no longer hold every leaf.

Note also that correct VaR at a group level cannot be derived from per-leaf VaR
scalars at all — it needs the underlying scenario vectors. Group-level VaR is
therefore a server-side calculation, independent of row count.

## Caveats

- **`agg_market_value`, `agg_var`, `agg_svar` are placeholders.** The
  consolidated sensitivity API carries no VaR, SVaR or market value. These
  follow its `agg_` naming convention as stand-ins until the VaR feed's real
  column names are known.
- **`agg_close_am` double-counts when summed.** The API repeats one close amount
  across every sensitivity row of a book, so aggregating it overstates the
  total. The KPI tile carries a tooltip saying so. Worth confirming whether it
  belongs as a summed value at all.
- **Grid headers are the raw API keys** (`ProductLevel1_NM`), matching the
  original design mock. Friendly labels (`Product Level 1`) already exist on
  every field as `label`, so switching is a one-line change in
  `RiskAnalysisGrid.tsx`.
- **Reordering is drag-only.** The up/down arrow buttons were removed by
  request. HTML5 drag and drop has no keyboard equivalent, so keyboard and
  screen-reader users can remove a level but not reorder one.
- **Mixed file naming.** The page shell and grid use the `RiskAnalysis` prefix
  while several supporting files retain `Drilldown` names, which still describe
  what they do.
