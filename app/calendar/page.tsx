'use client';

import { useMemo, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { format } from 'date-fns';
import { HolidayCalendarDialog } from '@/components/calendar/HolidayCalendarDialog';

const inputPillSx = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  bgcolor: '#015745',
  border: '1px solid rgba(255, 255, 255, 0.35)',
  color: '#f3f5f4',
  borderRadius: '999px',
  minHeight: 56,
  px: 2.5,
};

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2026, 4, 11));

  const selectedDateLabel = useMemo(
    () => (selectedDate ? format(selectedDate, 'dd-MMM-yyyy') : 'Select date'),
    [selectedDate]
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#01604B',
        px: 4,
        py: 3,
      }}
    >
      <Box sx={{ display: 'flex', maxWidth: 820 }}>
        <Box sx={{ ...inputPillSx, width: 312 }}>
          <Box>
            <Typography sx={{ fontSize: 12, lineHeight: 1.1, opacity: 0.9, fontWeight: 700 }}>COB</Typography>
            <Typography sx={{ fontSize: 28, lineHeight: 1.2, fontWeight: 500 }}>{selectedDateLabel}</Typography>
          </Box>
          <IconButton sx={{ color: '#f3f5f4' }}>
            <CalendarMonthIcon />
          </IconButton>
        </Box>
      </Box>

      <HolidayCalendarDialog value={selectedDate} onChange={(date) => setSelectedDate(date)} />
    </Box>
  );
}
