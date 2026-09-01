'use client';

/**
 * Ordered drop zone that defines the drilldown sequence.
 *
 * Uses native HTML5 drag and drop rather than AG Grid's internal
 * `DragAndDropService`, which is not public API. On drop the parent writes to
 * the shared context, and the grid applies the new hierarchy via the row
 * grouping API.
 */

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { useRef, useState, type DragEvent } from 'react';
import {
  dimensionFieldById,
  type DimensionFieldId,
} from '@/components/risk-analysis/drilldownFields';
import {
  PANEL_BORDER,
  PANEL_HEADING,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
} from '@/components/risk-analysis/drilldownFormat';

export interface DragPayload {
  source: 'catalog' | 'hierarchy';
  fieldId: DimensionFieldId;
  index?: number;
}

interface DrilldownHierarchyZoneProps {
  hierarchy: DimensionFieldId[];
  dragPayload: DragPayload | null;
  onAddAt: (fieldId: DimensionFieldId, index: number) => void;
  onMove: (fromIndex: number, toIndex: number) => void;
  onRemove: (fieldId: DimensionFieldId) => void;
  onClear: () => void;
  onDragStartItem: (
    payload: DragPayload,
    event: DragEvent<HTMLDivElement>
  ) => void;
  onDragEnd: () => void;
}

export default function DrilldownHierarchyZone({
  hierarchy,
  dragPayload,
  onAddAt,
  onMove,
  onRemove,
  onClear,
  onDragStartItem,
  onDragEnd,
}: DrilldownHierarchyZoneProps) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);

  const computeDropIndex = (clientY: number) => {
    const container = listRef.current;
    if (!container) {
      return hierarchy.length;
    }

    const slots = Array.from(
      container.querySelectorAll<HTMLElement>('[data-drill-slot="true"]')
    );
    for (let index = 0; index < slots.length; index += 1) {
      const rect = slots[index].getBoundingClientRect();
      if (clientY < rect.top + rect.height / 2) {
        return index;
      }
    }
    return slots.length;
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    if (!dragPayload) {
      return;
    }
    event.preventDefault();
    event.dataTransfer.dropEffect =
      dragPayload.source === 'catalog' ? 'copy' : 'move';
    setDropIndex(computeDropIndex(event.clientY));
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    if (!dragPayload) {
      return;
    }
    event.preventDefault();

    const target = dropIndex ?? hierarchy.length;
    setDropIndex(null);

    if (dragPayload.source === 'catalog') {
      onAddAt(dragPayload.fieldId, target);
      return;
    }

    const from = dragPayload.index ?? 0;
    const to = target > from ? target - 1 : target;
    onMove(from, to);
  };

  const dropLine = (index: number) => (
    <Box
      sx={{
        height: 2,
        my: 0.25,
        borderRadius: 1,
        backgroundColor: dropIndex === index ? '#8dc63f' : 'transparent',
        transition: 'background-color 90ms',
      }}
    />
  );

  return (
    <Box>
      <Stack
        direction="row"
        sx={{
          alignItems: 'baseline',
          justifyContent: 'space-between',
          mb: 0.75,
        }}
      >
        <Typography
          sx={{
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: PANEL_HEADING,
          }}
        >
          DRILLDOWN ORDER
        </Typography>
        <Button
          size="small"
          onClick={onClear}
          disabled={hierarchy.length === 0}
          sx={{
            textTransform: 'none',
            fontSize: '0.72rem',
            minWidth: 0,
            px: 0.5,
          }}
        >
          Clear
        </Button>
      </Stack>

      <Box
        ref={listRef}
        onDragOver={handleDragOver}
        onDragLeave={() => setDropIndex(null)}
        onDrop={handleDrop}
        sx={{
          p: 1,
          borderRadius: 2,
          border: `1px dashed ${dragPayload ? '#8dc63f' : PANEL_BORDER}`,
          backgroundColor: dragPayload ? 'rgba(141, 198, 63, 0.06)' : '#f8fafb',
          minHeight: 84,
          transition: 'background-color 120ms, border-color 120ms',
        }}
      >
        {hierarchy.length === 0 && (
          <Typography
            sx={{
              fontSize: '0.76rem',
              color: TEXT_SECONDARY,
              textAlign: 'center',
              py: 1.75,
            }}
          >
            Drag attributes here to build the drilldown
          </Typography>
        )}

        {hierarchy.map((fieldId, index) => {
          const field = dimensionFieldById.get(fieldId);
          if (!field) {
            return null;
          }

          return (
            <Box key={fieldId}>
              {dropLine(index)}
              <Stack
                data-drill-slot="true"
                direction="row"
                spacing={0.75}
                draggable
                onDragStart={(event) =>
                  onDragStartItem(
                    { source: 'hierarchy', fieldId, index },
                    event
                  )
                }
                onDragEnd={() => {
                  setDropIndex(null);
                  onDragEnd();
                }}
                sx={{
                  alignItems: 'center',
                  ml: `${index * 8}px`,
                  px: 0.75,
                  py: 0.5,
                  borderRadius: 1.5,
                  border: '1px solid #cfe0b4',
                  backgroundColor: '#fff',
                  cursor: 'grab',
                  boxShadow: '0 1px 3px rgba(15, 42, 30, 0.08)',
                }}
              >
                <DragIndicatorRoundedIcon
                  sx={{ fontSize: 15, color: '#b6c0cb' }}
                />
                <Box
                  sx={{
                    width: 17,
                    height: 17,
                    borderRadius: '50%',
                    backgroundColor: '#004d2c',
                    color: '#fff',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {index + 1}
                </Box>
                <Typography
                  sx={{
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    color: TEXT_PRIMARY,
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {field.label}
                </Typography>
                <IconButton
                  size="small"
                  aria-label={`Remove ${field.label}`}
                  onClick={() => onRemove(fieldId)}
                  sx={{ p: 0.2 }}
                >
                  <CloseRoundedIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </Stack>
            </Box>
          );
        })}

        {hierarchy.length > 0 && dropLine(hierarchy.length)}
      </Box>
    </Box>
  );
}
