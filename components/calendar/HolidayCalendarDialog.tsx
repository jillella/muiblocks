'use client';

import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
  type SxProps,
  type Theme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DateCalendar, PickersDay, type PickersDayProps } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addMonths, format, isSameMonth, startOfMonth } from 'date-fns';

type HolidayByDate = Record<string, string>;

type HolidayCalendarDialogProps = {
  value: Date | null;
  onChange: (date: Date | null) => void;
};

const getObservedHolidayDate = (date: Date) => {
  const weekday = date.getDay();
  if (weekday === 0) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  }
  if (weekday === 6) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
  }
  return date;
};

const getNthWeekdayOfMonth = (year: number, month: number, weekday: number, nth: number) => {
  const firstOfMonth = new Date(year, month, 1);
  const offset = (weekday - firstOfMonth.getDay() + 7) % 7;
  return new Date(year, month, 1 + offset + (nth - 1) * 7);
};

const getLastWeekdayOfMonth = (year: number, month: number, weekday: number) => {
  const lastOfMonth = new Date(year, month + 1, 0);
  const offset = (lastOfMonth.getDay() - weekday + 7) % 7;
  return new Date(year, month, lastOfMonth.getDate() - offset);
};

const getFederalHolidaysByDate = (year: number): HolidayByDate => {
  const holidays: Array<{ name: string; date: Date }> = [
    { name: "New Year's Day", date: getObservedHolidayDate(new Date(year, 0, 1)) },
    { name: 'Martin Luther King Jr. Day', date: getNthWeekdayOfMonth(year, 0, 1, 3) },
    { name: "Washington's Birthday", date: getNthWeekdayOfMonth(year, 1, 1, 3) },
    { name: 'Memorial Day', date: getLastWeekdayOfMonth(year, 4, 1) },
    { name: 'Juneteenth National Independence Day', date: getObservedHolidayDate(new Date(year, 5, 19)) },
    { name: 'Independence Day', date: getObservedHolidayDate(new Date(year, 6, 4)) },
    { name: 'Labor Day', date: getNthWeekdayOfMonth(year, 8, 1, 1) },
    { name: 'Columbus Day', date: getNthWeekdayOfMonth(year, 9, 1, 2) },
    { name: 'Veterans Day', date: getObservedHolidayDate(new Date(year, 10, 11)) },
    { name: 'Thanksgiving Day', date: getNthWeekdayOfMonth(year, 10, 4, 4) },
    { name: 'Christmas Day', date: getObservedHolidayDate(new Date(year, 11, 25)) },
  ];

  return holidays.reduce<HolidayByDate>((acc, holiday) => {
    acc[format(holiday.date, 'yyyy-MM-dd')] = holiday.name;
    return acc;
  }, {});
};

const dayCellSx: SxProps<Theme> = {
  width: 42,
  height: 42,
  borderRadius: '999px',
  color: '#4B4F55',
  fontSize: 18,
  fontWeight: 400,
  '&.Mui-selected': {
    backgroundColor: '#3D4148',
    color: '#fff',
  },
  '&.Mui-selected:hover': {
    backgroundColor: '#3D4148',
  },
};

export function HolidayCalendarDialog({ value, onChange }: HolidayCalendarDialogProps) {
  const [visibleMonth, setVisibleMonth] = useState<Date>(value ? startOfMonth(value) : new Date(2026, 4, 1));

  const holidayByDate = useMemo(() => {
    const thisYear = getFederalHolidaysByDate(visibleMonth.getFullYear());
    const nextYear = getFederalHolidaysByDate(visibleMonth.getFullYear() + 1);
    return { ...thisYear, ...nextYear };
  }, [visibleMonth]);

  const selectedLabel = value ? format(value, 'EEE, MMM d') : 'Select date';

  const visibleMonthHoliday = useMemo(() => {
    const monthStart = startOfMonth(visibleMonth);
    const nextMonth = addMonths(monthStart, 1);

    const holidaysInMonth = Object.entries(holidayByDate)
      .map(([isoDate, name]) => ({ date: new Date(isoDate), name }))
      .filter(({ date }) => date >= monthStart && date < nextMonth)
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    return holidaysInMonth[0]?.name ?? '';
  }, [holidayByDate, visibleMonth]);

  const HolidayDay = (props: PickersDayProps) => {
    const holidayName = holidayByDate[format(props.day, 'yyyy-MM-dd')];
    const showHolidayDot = Boolean(holidayName && !props.outsideCurrentMonth);

    return (
      <Box sx={{ position: 'relative' }}>
        <PickersDay {...props} sx={dayCellSx} />
        {showHolidayDot ? (
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              bottom: 4,
              width: 7,
              height: 7,
              borderRadius: '50%',
              transform: 'translateX(-50%)',
              bgcolor: '#E3A35C',
            }}
          />
        ) : null}
      </Box>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper
        elevation={0}
        sx={{
          mt: 2,
          width: 760,
          maxWidth: 'calc(100vw - 32px)',
          borderRadius: 0,
          overflow: 'hidden',
          bgcolor: '#fff',
        }}
      >
        <Box sx={{ px: 4, pt: 3.25, pb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
            <Box>
              <Typography
                sx={{
                  color: '#6A6E76',
                  fontSize: 13,
                  lineHeight: 1.2,
                  letterSpacing: '0.06em',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                Select Date
              </Typography>
              <Typography
                sx={{
                  color: '#9BA0A7',
                  fontSize: 52,
                  lineHeight: 1.12,
                  fontWeight: 400,
                }}
              >
                {selectedLabel}
              </Typography>
            </Box>
            <IconButton
              aria-label="Close"
              disabled
              sx={{
                mt: 0.5,
                mr: -1,
                color: '#A6AAB0',
              }}
            >
              <CloseIcon sx={{ fontSize: 36 }} />
            </IconButton>
          </Box>

          <DateCalendar
            value={value}
            onChange={onChange}
            onMonthChange={(month) => setVisibleMonth(startOfMonth(month))}
            referenceDate={visibleMonth}
            slots={{ day: HolidayDay }}
            sx={{
              width: '100%',
              mx: 0,
              minWidth: 0,
              '& .MuiPickersCalendarHeader-root': {
                px: 0,
                mb: 0.5,
              },
              '& .MuiPickersCalendarHeader-label': {
                color: '#464A51',
                fontSize: 38,
                lineHeight: 1.2,
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              },
              '& .MuiPickersArrowSwitcher-button': {
                color: '#71767D',
              },
              '& .MuiDayCalendar-weekDayLabel': {
                color: '#63676E',
                fontSize: 20,
                fontWeight: 500,
                width: 42,
                m: 0,
              },
              '& .MuiDayCalendar-header': {
                mt: 1,
                mb: 0.5,
              },
              '& .MuiDayCalendar-weekContainer': {
                mt: 0.1,
                mb: 0.1,
              },
              '& .MuiTypography-root': {
                fontFamily: 'inherit',
              },
              '& .MuiPickersSlideTransition-root': {
                minHeight: 310,
              },
              '& .MuiDayCalendar-monthContainer': {
                minHeight: 310,
              },
            }}
          />

          <Box
            sx={{
              mt: 1.2,
              px: 1.5,
              py: 1,
              bgcolor: '#F8F0E5',
              color: '#6F6557',
              fontSize: 22,
              minHeight: 54,
              borderRadius: 0.5,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {visibleMonthHoliday}
          </Box>
        </Box>

        <Box sx={{ px: 4, pb: 2.5, pt: 0, gap: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            sx={{
              color: '#535860',
              fontWeight: 500,
              fontSize: 32,
              textTransform: 'uppercase',
              minWidth: 120,
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{
              color: '#535860',
              fontWeight: 500,
              fontSize: 32,
              textTransform: 'uppercase',
              minWidth: 80,
            }}
          >
            OK
          </Button>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
}
