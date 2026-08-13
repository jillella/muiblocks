'use client';

import NextLink from 'next/link';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const links = [
  { href: '/summary', label: 'summary' },
  { href: '/charts', label: 'charts' },
  { href: '/charts-enhanced', label: 'charts-enhanced' },
  { href: '/svar-window-calibration', label: 'svar-window-calibration' },
  { href: '/filters', label: 'filters' },
  { href: '/tooltip', label: 'tooltip' },
  { href: '/date', label: 'date' },
  { href: '/calendar', label: 'calendar' },
  { href: '/products-cards', label: 'products-cards' },
  { href: '/ussparc', label: 'ussparc (header demo)' },
] as const;

export default function HomePage() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        px: 3,
        py: 5,
        textAlign: 'center',
      }}
    >
      <Typography variant="h2" component="h1" fontWeight={600} letterSpacing="-0.03em">
        muiblocks
      </Typography>

      <Box
        component="nav"
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
          columnGap: 4,
          rowGap: 2,
          maxWidth: 720,
          width: '100%',
        }}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            component={NextLink}
            href={link.href}
            underline="hover"
            sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem' }, fontWeight: 500 }}
          >
            {link.label}
          </Link>
        ))}
      </Box>
    </Box>
  );
}
