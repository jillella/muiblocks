import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import { UssparcHeader } from '@/components/layout/UssparcHeader'

export default function UssparcPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f4f4' }}>
      <UssparcHeader />
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          px: { xs: 2, sm: 3, md: 4 },
          pb: 8,
          mt: { xs: -2, md: -4.5 },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            borderRadius: 2,
            p: { xs: 2.5, sm: 3.5, md: 4 },
            maxWidth: 1200,
            mx: 'auto',
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#4c6a92',
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
            }}
          >
            Welcome
          </Typography>
          <Box sx={{ my: 2, height: 1, bgcolor: 'grey.300' }} />
          <Typography
            variant="body2"
            sx={{
              color: 'grey.700',
              lineHeight: 1.65,
              fontSize: { xs: '0.875rem', sm: '0.9375rem' },
              textWrap: 'pretty',
            }}
          >
            USSPARC is a quantitative analytics platform supporting internal
            reporting, front office, and risk management calculations.
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}
