'use client';

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import Select from '@mui/material/Select';
import type { SelectProps } from '@mui/material/Select';
import type { SxProps, Theme } from '@mui/material/styles';

export const filterSelectSx: SxProps<Theme> = {
  height: 44,
  borderRadius: '999px',
  backgroundColor: '#033928',
  color: '#acb6ca',
  fontSize: '0.9rem',
  fontWeight: 500,
  letterSpacing: 0.1,
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiSelect-select': {
    py: 0.45,
    pl: 3.4,
    pr: '5.7rem !important',
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  '& .MuiSelect-icon': {
    right: 20,
    top: '50%',
    transform: 'translateY(-50%)',
    transition: 'transform 180ms ease',
    transformOrigin: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    color: '#86aaa5',
    width: 23,
    height: 23,
    p: 0.16,
    border: '2px solid #acb6ca80',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  '& .MuiSelect-iconOpen': {
    transform: 'translateY(-50%) rotate(180deg)',
  },
};

export default function FilterSelect<Value = unknown>(props: SelectProps<Value>) {
  const { sx, IconComponent = KeyboardArrowDownRoundedIcon, ...rest } = props;

  const mergedSx = Array.isArray(sx) ? [filterSelectSx, ...sx] : [filterSelectSx, sx];

  return <Select IconComponent={IconComponent} sx={mergedSx} {...rest} />;
}
