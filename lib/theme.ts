'use client';

import { createTheme } from '@mui/material/styles';

export const ROBOTO_FONT_FAMILY =
  'var(--font-roboto), Roboto, Helvetica, Arial, sans-serif';

const theme = createTheme({
  typography: {
    fontFamily: ROBOTO_FONT_FAMILY,
  },
});

export default theme;
