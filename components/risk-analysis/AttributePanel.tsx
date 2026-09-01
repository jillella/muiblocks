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

import FunctionsRoundedIcon from '@mui/icons-material/FunctionsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {
  Box,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useMemo, useState, type DragEvent } from 'react';
import AttributeItem from '@/components/risk-analysis/AttributeItem';
import DrilldownHierarchyZone, {
  type DragPayload,
} from '@/components/risk-analysis/DrilldownHierarchyZone';
import { useDrilldown } from '@/components/risk-analysis/DrilldownContext';
import {
  attributeCategories,
  dimensionFields,
  measureFields,
  type DimensionFieldId,
} from '@/components/risk-analysis/drilldownFields';
import {
  PANEL_BORDER,
  PANEL_HEADING,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
} from '@/components/risk-analysis/drilldownFormat';

export default function AttributePanel() {
  const { hierarchy, addField, removeField, moveField, clearHierarchy } =
    useDrilldown();
  const [search, setSearch] = useState('');
  const [dragPayload, setDragPayload] = useState<DragPayload | null>(null);

  const inHierarchy = useMemo(() => new Set(hierarchy), [hierarchy]);

  const visibleByCategory = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return attributeCategories.map((category) => ({
      category,
      fields: dimensionFields.filter(
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
            <Box key={category.id} sx={{ mb: 1.75 }}>
              <Typography
                sx={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: PANEL_HEADING,
                  textTransform: 'uppercase',
                  mb: 0.75,
                }}
              >
                {category.label}
              </Typography>
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
            </Box>
          )
        )}

        {visibleMeasures.length > 0 && (
          <Box>
            <Typography
              sx={{
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: PANEL_HEADING,
                mb: 0.75,
              }}
            >
              MEASURES
            </Typography>
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
                    {field.aggregation === 'none' && (
                      <Typography
                        sx={{
                          fontSize: '0.66rem',
                          color: '#b0392b',
                          fontWeight: 600,
                        }}
                      >
                        LEAF
                      </Typography>
                    )}
                  </Stack>
                </Tooltip>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
}
