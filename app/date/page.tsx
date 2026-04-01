'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DateCalendar, PickersDay, type PickersDayProps } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { PickersCalendarHeader } from '@mui/x-date-pickers/PickersCalendarHeader';
import { addMonths, format, isSameMonth, startOfMonth } from 'date-fns';

type HolidayByDate = Record<string, string>;

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

export default function DatePage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2026, 4, 24));
  const [visibleMonth, setVisibleMonth] = useState<Date>(new Date(2026, 4, 1));
  const nextMonth = useMemo(() => addMonths(visibleMonth, 1), [visibleMonth]);

  const holidayByDate = useMemo(() => {
    const currentYearHolidays = getFederalHolidaysByDate(visibleMonth.getFullYear());
    const nextYearHolidays = getFederalHolidaysByDate(visibleMonth.getFullYear() + 1);
    return { ...currentYearHolidays, ...nextYearHolidays };
  }, [visibleMonth]);

  const getMonthHolidayLabel = (month: Date) => {
    for (let day = 1; day <= 31; day += 1) {
      const current = new Date(month.getFullYear(), month.getMonth(), day);
      if (!isSameMonth(current, month)) {
        break;
      }
      const holiday = holidayByDate[format(current, 'yyyy-MM-dd')];
      if (holiday) {
        return holiday;
      }
    }
    return null;
  };

  const HolidayDay = (props: PickersDayProps) => {
    const holidayName = holidayByDate[format(props.day, 'yyyy-MM-dd')];
    const showHolidayDot = Boolean(holidayName && !props.outsideCurrentMonth);

    return (
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PickersDay {...props} />
        {showHolidayDot ? (
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              bottom: -3,
              transform: 'translateX(-50%)',
              width: 7,
              height: 7,
              borderRadius: '999px',
              bgcolor: '#DB9A46',
            }}
          />
        ) : null}
      </Box>
    );
  };

  const CalendarHeader = (props: any) => {
    const month = props?.currentMonth ?? visibleMonth;
    return (
      <Box>
        <PickersCalendarHeader {...props} />
        <Box
          sx={{
            mt: 0.25,
            mb: 1,
            px: 1.5,
            py: 0.4,
            minHeight: 28,
            bgcolor: '#eee9e0',
            color: '#6f6b65',
            fontSize: 14,
          }}
        >
          {getMonthHolidayLabel(month)}
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#eeeeee',
        p: 3,
      }}
    >
      <Paper elevation={0} sx={{ width: 560, borderRadius: 1.5, p: 3, bgcolor: '#f7f7f7' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <Box>
              <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#7a7a7a', letterSpacing: '0.04em' }}>
                SELECT DATE
              </Typography>
              <Typography sx={{ fontSize: 34, fontWeight: 500, color: '#6a6a6a', lineHeight: 1.2 }}>
                {selectedDate ? format(selectedDate, 'EEE, MMM d') : 'Select date'}
              </Typography>
            </Box>
            <Typography sx={{ color: '#9e9e9e', fontSize: 34, lineHeight: 1 }}>
              &#10005;
            </Typography>
          </Box>

          <DateCalendar
            value={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              if (date) {
                setVisibleMonth(startOfMonth(date));
              }
            }}
            onMonthChange={setVisibleMonth}
            views={['day']}
            slots={{
              day: HolidayDay,
              leftArrowIcon: ChevronLeftIcon,
              rightArrowIcon: ChevronRightIcon,
              calendarHeader: CalendarHeader,
            }}
            referenceDate={visibleMonth}
            sx={{
              mt: 1.5,
              mb: 1,
              width: '100%',
              maxHeight: 'none',
              height: 'auto',
              '.MuiPickersCalendarHeader-root': {
                pl: 0,
                pr: 0,
              },
              '.MuiDayCalendar-monthContainer': {
                height: 'auto',
              },
              '.MuiDateCalendar-viewTransitionContainer': {
                minHeight: 296,
                height: 296,
                overflow: 'visible',
              },
              '.MuiDayCalendar-slideTransition': {
                minHeight: 296,
              },
              '.MuiPickersCalendarHeader-label': {
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                fontSize: 20,
                color: '#24262b',
              },
              '.MuiDayCalendar-weekDayLabel': {
                color: '#565a61',
                fontWeight: 500,
                width: '100%',
                fontSize: 14,
                m: 0,
              },
              '.MuiPickersDay-root': {
                width: 44,
                height: 44,
                fontSize: 15,
                color: '#535960',
                borderRadius: '999px',
              },
              '.MuiPickersDay-root.Mui-selected': {
                bgcolor: '#4b4f55',
                color: '#fff',
              },
              '.MuiPickersDay-root.Mui-selected:hover': {
                bgcolor: '#4b4f55',
              },
              '.MuiDayCalendar-weekContainer': {
                display: 'grid',
                gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                alignItems: 'center',
                justifyItems: 'center',
                width: '100%',
                m: 0,
              },
              '.MuiDayCalendar-header': {
                display: 'grid',
                gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                width: '100%',
                m: 0,
              },
            }}
          />

          <Box sx={{ mt: 0.25, maxHeight: 86, overflow: 'hidden' }}>
            <DateCalendar
              value={selectedDate && isSameMonth(selectedDate, nextMonth) ? selectedDate : null}
              onChange={(date) => {
                setSelectedDate(date);
                if (date) {
                  setVisibleMonth(startOfMonth(date));
                }
              }}
              referenceDate={nextMonth}
              views={['day']}
              slots={{
                day: HolidayDay,
                calendarHeader: PickersCalendarHeader,
              }}
              sx={{
                width: '100%',
                maxHeight: 'none',
                height: 'auto',
                '.MuiPickersCalendarHeader-root': {
                  pl: 0,
                  pr: 0,
                },
                '.MuiPickersArrowSwitcher-root': {
                  display: 'none',
                },
                '.MuiPickersCalendarHeader-label': {
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  fontSize: 20,
                  color: '#24262b',
                },
                '.MuiDayCalendar-weekDayLabel': {
                  color: '#565a61',
                  fontWeight: 500,
                  width: '100%',
                  fontSize: 14,
                  m: 0,
                },
                '.MuiDayCalendar-monthContainer': {
                  height: 'auto',
                },
                '.MuiPickersDay-root': {
                  width: 44,
                  height: 44,
                  fontSize: 15,
                  color: '#535960',
                  borderRadius: '999px',
                },
                '.MuiPickersDay-root.Mui-selected': {
                  bgcolor: '#4b4f55',
                  color: '#fff',
                },
                '.MuiPickersDay-root.Mui-selected:hover': {
                  bgcolor: '#4b4f55',
                },
                '.MuiDayCalendar-weekContainer': {
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                  alignItems: 'center',
                  justifyItems: 'center',
                  width: '100%',
                  m: 0,
                },
                '.MuiDayCalendar-header': {
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                  width: '100%',
                  m: 0,
                },
              }}
            />
          </Box>

          <Box sx={{ mt: 3, pb: 3, display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
            <Button sx={{ color: '#55595f', fontWeight: 600 }}>Cancel</Button>
            <Button sx={{ color: '#55595f', fontWeight: 600 }}>OK</Button>
          </Box>
        </LocalizationProvider>
      </Paper>
    </Box>
  );
}
