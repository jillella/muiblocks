'use client';

import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  Box,
  Container,
  Divider,
  IconButton,
  ThemeProvider,
  Tooltip,
  Typography,
  createTheme,
} from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function MarketRiskTooltipBody() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: 'min(940px, calc(100vw - 48px))',
        borderRadius: '28px',
        border: '1px solid #d6e0ee',
        backgroundColor: '#fbfdff',
        boxShadow: '0 3px 10px rgba(36, 61, 94, 0.12)',
        px: { xs: 3, sm: 5 },
        pt: { xs: 4.5, sm: 5.25 },
        pb: { xs: 3.5, sm: 4 },
        '&::before': {
          content: '""',
          position: 'absolute',
          left: '50%',
          top: -22,
          transform: 'translateX(-50%)',
          width: 64,
          height: 26,
          backgroundColor: '#fbfdff',
          border: '1px solid #d6e0ee',
          borderBottom: 'none',
          clipPath: 'polygon(12% 100%, 32% 0, 68% 0, 88% 100%)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75 }}>
        <PolicyOutlinedIcon sx={{ color: '#6f4f89', fontSize: 40 }} />
        <Typography
          sx={{
            color: '#304a70',
            fontWeight: 700,
            fontSize: { xs: '2rem', sm: '2.25rem' },
            lineHeight: 1.15,
            letterSpacing: '0.01em',
          }}
        >
          Market Risk Exposure
        </Typography>
      </Box>

      <Divider sx={{ my: 2.1, borderColor: '#a8b7ca' }} />

      <Typography
        sx={{
          color: '#1f2937',
          fontWeight: 600,
          fontSize: { xs: '2rem', sm: '2.1rem' },
          lineHeight: 1.38,
          maxWidth: '95%',
        }}
      >
        Is reflected in the trading/banking portfolio&apos;s mark-to-market valuation, with clean
        P&amp;L capturing day-over-day changes driven solely by market movements.
      </Typography>
    </Box>
  );
}

export default function TooltipPage() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f8fafc',
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <MarketRiskTooltipBody />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Tooltip
              placement="bottom"
              title={<MarketRiskTooltipBody />}
              slotProps={{
                tooltip: {
                  sx: {
                    bgcolor: 'transparent',
                    p: 0,
                    maxWidth: 'none',
                    boxShadow: 'none',
                  },
                },
              }}
            >
              <IconButton
                sx={{
                  color: '#6b7280',
                  border: '1px solid #d6dee8',
                  backgroundColor: '#fff',
                }}
              >
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
