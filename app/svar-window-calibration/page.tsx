'use client';

import { Box, Container, ThemeProvider, createTheme } from '@mui/material';
import SvarWindowCalibrationChart from '@/components/svar-window-calibration/SvarWindowCalibrationChart';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function SvarWindowCalibrationPage() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f8f9fa',
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          <SvarWindowCalibrationChart />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
