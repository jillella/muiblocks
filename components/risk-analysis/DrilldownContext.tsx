'use client';

/**
 * Single source of truth for the drilldown page.
 *
 * The right-hand attribute panel writes the hierarchy here, the grid reads it
 * and applies it through the AG Grid row-grouping API, and the grid writes back
 * whatever grouping the user reaches via native interactions (column menu,
 * group panel). Summary cards read the filtered totals the grid publishes, so
 * one drag updates every dependent component rather than just the grid.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  defaultHierarchy,
  dimensionFieldById,
  type DimensionFieldId,
} from '@/components/risk-analysis/drilldownFields';
import {
  computeTotals,
  mockDrilldownRows,
  type DrilldownTotals,
} from '@/components/risk-analysis/mockDrilldown';

const HIERARCHY_PARAM = 'drill';

interface DrilldownContextValue {
  hierarchy: DimensionFieldId[];
  drilldownEnabled: boolean;
  totals: DrilldownTotals;
  addField: (fieldId: DimensionFieldId, index?: number) => void;
  removeField: (fieldId: DimensionFieldId) => void;
  moveField: (fromIndex: number, toIndex: number) => void;
  replaceHierarchy: (fieldIds: DimensionFieldId[]) => void;
  clearHierarchy: () => void;
  setDrilldownEnabled: (enabled: boolean) => void;
  publishTotals: (totals: DrilldownTotals) => void;
}

const DrilldownContext = createContext<DrilldownContextValue | null>(null);

const isDimensionFieldId = (value: string): value is DimensionFieldId =>
  dimensionFieldById.has(value as DimensionFieldId);

function readHierarchyFromUrl(): DimensionFieldId[] | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = new URLSearchParams(window.location.search).get(HIERARCHY_PARAM);
  if (raw === null) {
    return null;
  }

  const parsed = raw
    .split(',')
    .map((part) => part.trim())
    .filter(isDimensionFieldId);

  return Array.from(new Set(parsed));
}

export function DrilldownProvider({ children }: { children: ReactNode }) {
  const [hierarchy, setHierarchy] =
    useState<DimensionFieldId[]>(defaultHierarchy);
  const [drilldownEnabled, setDrilldownEnabled] = useState(true);
  const [totals, setTotals] = useState<DrilldownTotals>(() =>
    computeTotals(mockDrilldownRows)
  );
  const [hydrated, setHydrated] = useState(false);

  // Captured during the first render, before the writer effect below can
  // overwrite the query string. Reading it inside the hydrate effect instead
  // would lose the incoming value, because StrictMode runs mount effects twice
  // and the second pass would read back the already-rewritten URL.
  const initialFromUrl = useRef<DimensionFieldId[] | null | undefined>(
    undefined
  );
  if (initialFromUrl.current === undefined) {
    initialFromUrl.current = readHierarchyFromUrl();
  }

  // Hydrate after mount rather than in the state initialiser so the server and
  // the first client render agree. Avoids `useSearchParams`, which would force
  // the page into a Suspense boundary.
  useEffect(() => {
    const fromUrl = initialFromUrl.current;
    if (fromUrl && fromUrl.length > 0) {
      setHierarchy(fromUrl);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    if (hierarchy.length > 0) {
      params.set(HIERARCHY_PARAM, hierarchy.join(','));
    } else {
      params.delete(HIERARCHY_PARAM);
    }

    const query = params.toString();
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}${query ? `?${query}` : ''}`
    );
  }, [hierarchy, hydrated]);

  /** Re-adding a field already in the hierarchy moves it to the drop position. */
  const addField = useCallback((fieldId: DimensionFieldId, index?: number) => {
    setHierarchy((current) => {
      const without = current.filter((id) => id !== fieldId);
      const target =
        index === undefined
          ? without.length
          : Math.max(0, Math.min(index, without.length));
      const next = [...without];
      next.splice(target, 0, fieldId);
      return next;
    });
  }, []);

  const removeField = useCallback((fieldId: DimensionFieldId) => {
    setHierarchy((current) => current.filter((id) => id !== fieldId));
  }, []);

  const moveField = useCallback((fromIndex: number, toIndex: number) => {
    setHierarchy((current) => {
      if (
        fromIndex === toIndex ||
        fromIndex < 0 ||
        fromIndex >= current.length ||
        toIndex < 0 ||
        toIndex >= current.length
      ) {
        return current;
      }
      const next = [...current];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  }, []);

  const replaceHierarchy = useCallback((fieldIds: DimensionFieldId[]) => {
    setHierarchy((current) => {
      const next = Array.from(new Set(fieldIds));
      const unchanged =
        next.length === current.length &&
        next.every((id, i) => id === current[i]);
      return unchanged ? current : next;
    });
  }, []);

  const clearHierarchy = useCallback(() => {
    setHierarchy([]);
  }, []);

  const publishTotals = useCallback((next: DrilldownTotals) => {
    setTotals((current) =>
      current.rowCount === next.rowCount &&
      current.marketValue === next.marketValue &&
      current.riskFactorCount === next.riskFactorCount
        ? current
        : next
    );
  }, []);

  const value = useMemo<DrilldownContextValue>(
    () => ({
      hierarchy,
      drilldownEnabled,
      totals,
      addField,
      removeField,
      moveField,
      replaceHierarchy,
      clearHierarchy,
      setDrilldownEnabled,
      publishTotals,
    }),
    [
      hierarchy,
      drilldownEnabled,
      totals,
      addField,
      removeField,
      moveField,
      replaceHierarchy,
      clearHierarchy,
      publishTotals,
    ]
  );

  return (
    <DrilldownContext.Provider value={value}>
      {children}
    </DrilldownContext.Provider>
  );
}

export function useDrilldown(): DrilldownContextValue {
  const context = useContext(DrilldownContext);
  if (context === null) {
    throw new Error('useDrilldown must be used inside a DrilldownProvider');
  }
  return context;
}
