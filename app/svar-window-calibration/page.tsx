'use client';

import { Box, Container, ThemeProvider, createTheme } from '@mui/material';
import SvarWindowCalibrationChart from '@/components/svar-window-calibration/SvarWindowCalibrationChart';
import TopContributorsChart from '@/components/svar-window-calibration/TopContributorsChart';
import TopDriversChart from '@/components/svar-window-calibration/TopDriversChart';

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
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
              gap: 3,
              mt: 3,
            }}
          >
            <TopDriversChart />
            <TopContributorsChart />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
