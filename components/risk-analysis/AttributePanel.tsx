'use client';

/**
 * Right-hand configuration panel: the drilldown order zone plus the catalog of
 * draggable attributes, grouped by domain category.
 *
 * AG Grid's stock columns tool panel can only group columns by column-group
 * definition and only offers its fixed Row Groups / Values / Filters drop
 * zones, so this panel is a plain MUI component that drives the grid through
 * the shared context instead.
 */

import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import FunctionsRoundedIcon from '@mui/icons-material/FunctionsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {
  Box,
  ButtonBase,
  Collapse,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useMemo, useState, type DragEvent, type ReactNode } from 'react';
import AttributeItem from '@/components/risk-analysis/AttributeItem';
import DrilldownHierarchyZone, {
  type DragPayload,
} from '@/components/risk-analysis/DrilldownHierarchyZone';
import { useDrilldown } from '@/components/risk-analysis/RiskAnalysisContext';
import {
  attributeCategories,
  measureFields,
  panelDimensionFields,
  type DimensionFieldId,
} from '@/components/risk-analysis/drilldownFields';
import {
  PANEL_BORDER,
  PANEL_HEADING,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
} from '@/components/risk-analysis/drilldownFormat';

const SECTION_COUNT_BADGE = '#7a9488';

const headingSx = {
  fontSize: '0.68rem',
  fontWeight: 700,
  letterSpacing: '0.08em',
  color: PANEL_HEADING,
  textTransform: 'uppercase',
} as const;

type PanelSectionProps = {
  label: string;
  /** Teal badge shown beside the chevron while collapsed. */
  count: number;
  expanded: boolean;
  /** Omitted while a search is active, when sections are force-expanded. */
  onToggle?: () => void;
  children: ReactNode;
};

function PanelSection({
  label,
  count,
  expanded,
  onToggle,
  children,
}: PanelSectionProps) {
  const heading = <Typography sx={headingSx}>{label}</Typography>;

  const countBadge = !expanded ? (
    <Box
      aria-hidden
      sx={{
        minWidth: 18,
        height: 18,
        px: count >= 10 ? 0.375 : 0,
        borderRadius: '999px',
        backgroundColor: SECTION_COUNT_BADGE,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.62rem',
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      {count}
    </Box>
  ) : null;

  const sectionControls = (
    <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
      {countBadge}
      <Box
        sx={{
          width: 22,
          height: 22,
          borderRadius: '50%',
          border: '1px solid #334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <ExpandMoreRoundedIcon
          sx={{
            fontSize: 15,
            color: '#334155',
            transition: 'transform 150ms ease',
            transform: expanded ? 'rotate(180deg)' : 'none',
          }}
        />
      </Box>
    </Stack>
  );

  return (
    <Box>
      {onToggle ? (
        <ButtonBase
          onClick={onToggle}
          aria-expanded={expanded}
          sx={{
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 0,
            py: 0.75,
            borderRadius: 1,
            '&:hover': { backgroundColor: 'transparent' },
          }}
        >
          {heading}
          {sectionControls}
        </ButtonBase>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 0.75,
          }}
        >
          {heading}
          {sectionControls}
        </Box>
      )}

      <Collapse in={expanded} unmountOnExit>
        <Box sx={{ pt: 0.25, pb: 1.25 }}>{children}</Box>
      </Collapse>
    </Box>
  );
}

export default function AttributePanel() {
  const { hierarchy, addField, removeField, moveField, clearHierarchy } =
    useDrilldown();
  const [search, setSearch] = useState('');
  const [dragPayload, setDragPayload] = useState<DragPayload | null>(null);
  const [collapsedSections, setCollapsedSections] = useState<
    Record<string, boolean>
  >({});

  const inHierarchy = useMemo(() => new Set(hierarchy), [hierarchy]);

  // A search would be useless if it could not reveal matches inside a
  // collapsed section, so searching pins every section open and hides the
  // toggles rather than silently ignoring clicks.
  const searchActive = search.trim() !== '';

  const toggleSection = (id: string) =>
    setCollapsedSections((prev) => ({ ...prev, [id]: !prev[id] }));

  const visibleByCategory = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return attributeCategories.map((category) => ({
      category,
      fields: panelDimensionFields.filter(
        (field) =>
          field.category === category.id &&
          (needle === '' ||
            field.label.toLowerCase().includes(needle) ||
            field.columnHeader.toLowerCase().includes(needle))
      ),
    }));
  }, [search]);

  const visibleMeasures = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return measureFields.filter(
      (field) => needle === '' || field.label.toLowerCase().includes(needle)
    );
  }, [search]);

  const beginDrag = (
    payload: DragPayload,
    event: DragEvent<HTMLDivElement>
  ) => {
    setDragPayload(payload);
    // Firefox refuses to start a drag unless some data is attached.
    event.dataTransfer.setData('text/plain', payload.fieldId);
    event.dataTransfer.effectAllowed =
      payload.source === 'catalog' ? 'copy' : 'move';
  };

  // Dropping a hierarchy chip back onto the catalog removes it from the drilldown.
  const handleCatalogDragOver = (event: DragEvent<HTMLDivElement>) => {
    if (dragPayload?.source !== 'hierarchy') {
      return;
    }
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleCatalogDrop = (event: DragEvent<HTMLDivElement>) => {
    if (dragPayload?.source !== 'hierarchy') {
      return;
    }
    event.preventDefault();
    removeField(dragPayload.fieldId);
    setDragPayload(null);
  };

  return (
    <Box
      sx={{
        border: `1px solid ${PANEL_BORDER}`,
        borderRadius: 2.5,
        backgroundColor: '#fff',
        p: { xs: 1.25, lg: 1.75 },
        minWidth: 0,
        position: 'sticky',
        top: 16,
        maxHeight: 'calc(100vh - 48px)',
        overflowY: 'auto',
      }}
    >
      <Typography
        sx={{ fontSize: '0.98rem', fontWeight: 600, color: TEXT_PRIMARY }}
      >
        Available Attributes
      </Typography>
      <Typography
        sx={{ fontSize: '0.74rem', color: TEXT_SECONDARY, mt: 0.25, mb: 1.5 }}
      >
        Drag and drop to build your view
      </Typography>

      <DrilldownHierarchyZone
        hierarchy={hierarchy}
        dragPayload={dragPayload}
        onAddAt={(fieldId, index) => {
          addField(fieldId, index);
          setDragPayload(null);
        }}
        onMove={(from, to) => {
          moveField(from, to);
          setDragPayload(null);
        }}
        onRemove={removeField}
        onClear={clearHierarchy}
        onDragStartItem={beginDrag}
        onDragEnd={() => setDragPayload(null)}
      />

      <Divider sx={{ my: 1.75, borderColor: '#eef1f5' }} />

      <TextField
        size="small"
        fullWidth
        placeholder="Search attributes"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon sx={{ fontSize: 17, color: '#9aa6b2' }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          mb: 1.5,
          '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: '0.8rem' },
        }}
      />

      <Box onDragOver={handleCatalogDragOver} onDrop={handleCatalogDrop}>
        {visibleByCategory.map(({ category, fields }) =>
          fields.length === 0 ? null : (
            <PanelSection
              key={category.id}
              label={category.label}
              count={fields.length}
              expanded={searchActive || !collapsedSections[category.id]}
              onToggle={
                searchActive ? undefined : () => toggleSection(category.id)
              }
            >
              <Stack spacing={0.625}>
                {fields.map((field) => (
                  <AttributeItem
                    key={field.id}
                    field={field}
                    inUse={inHierarchy.has(field.id)}
                    onDragStart={(event) =>
                      beginDrag({ source: 'catalog', fieldId: field.id }, event)
                    }
                    onDragEnd={() => setDragPayload(null)}
                    onActivate={() => addField(field.id)}
                  />
                ))}
              </Stack>
            </PanelSection>
          )
        )}

        {visibleMeasures.length > 0 && (
          <PanelSection
            label="Measures"
            count={visibleMeasures.length}
            expanded={searchActive || !collapsedSections.measures}
            onToggle={searchActive ? undefined : () => toggleSection('measures')}
          >
            <Stack spacing={0.625}>
              {visibleMeasures.map((field) => (
                <Tooltip
                  key={field.id}
                  title={
                    field.aggregation === 'sum'
                      ? 'Aggregated as a sum at every drilldown level'
                      : 'Not additive — shown on leaf rows only'
                  }
                  placement="left"
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      alignItems: 'center',
                      px: 1,
                      py: 0.75,
                      borderRadius: 1.5,
                      border: `1px solid ${PANEL_BORDER}`,
                      backgroundColor: '#fbfcfd',
                    }}
                  >
                    <FunctionsRoundedIcon
                      sx={{ fontSize: 16, color: TEXT_SECONDARY }}
                    />
                    <Typography
                      sx={{ fontSize: '0.8rem', color: TEXT_PRIMARY, flex: 1 }}
                    >
                      {field.label}
                    </Typography>
                  </Stack>
                </Tooltip>
              ))}
            </Stack>
          </PanelSection>
        )}
      </Box>
    </Box>
  );
}
