'use client';

import { useState } from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';

type ProductCard = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const products: ProductCard[] = [
  {
    id: 'sdws-exterior',
    title: 'Strong-Drive® SDWS™ TIMBER Screw (Exterior Grade)',
    description:
      'The SDWS structural wood screw provides an easy-to-install, high-strength alternative to through-bolting and traditional lag screws and is ideal for contractor and DIY projects.',
    image: 'https://placehold.co/560x280/f2f2f2/2f2f2f?text=SDWS+Exterior',
  },
  {
    id: 'sdws-framing',
    title: 'Strong-Drive® SDWS™ FRAMING Screw',
    description:
      'A code-listed, multi-purpose structural fastener designed for framing applications, remodeling work, and interior or exterior projects.',
    image: 'https://placehold.co/560x280/f2f2f2/2f2f2f?text=SDWS+Framing',
  },
  {
    id: 'self-drilling-metal',
    title: 'Strong-Drive® Self-Drilling X Metal Screw',
    description:
      'Commonly used for fastening steel decking to structural steel, side-lap stitching, and cold-formed steel framing.',
    image: 'https://placehold.co/560x280/f2f2f2/2f2f2f?text=Self-Drilling+Metal',
  },
  {
    id: 'sdwh-timber-hex',
    title: 'Strong-Drive® SDWH™ TIMBER-HEX SS Screw',
    description:
      'Designed for heavy-duty timber connections where corrosion resistance and clean installation are key requirements.',
    image: 'https://placehold.co/560x280/f2f2f2/2f2f2f?text=SDWH+TIMBER-HEX',
  },
  {
    id: 'sdws-interior',
    title: 'Strong-Drive® SDWS™ TIMBER Screw (Interior Grade)',
    description:
      'Interior-grade structural screw for high-load wood-to-wood fastening with reduced installation time.',
    image: 'https://placehold.co/560x280/f2f2f2/2f2f2f?text=SDWS+Interior',
  },
  {
    id: 'sdwc-truss',
    title: 'Strong-Drive® SDWC® TRUSS Screw',
    description:
      'A truss screw solution for secure structural attachment in wood framing systems with reliable pull-through performance.',
    image: 'https://placehold.co/560x280/f2f2f2/2f2f2f?text=SDWC+TRUSS',
  },
];

export default function ProductsCardsDatePage() {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#ededed',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {products.map((product) => {
            const isHovered = hoveredCardId === product.id;

            return (
              <Paper
                key={product.id}
                elevation={0}
                onMouseEnter={() => setHoveredCardId(product.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                sx={{
                  bgcolor: '#f4f4f4',
                  borderRadius: 2.2,
                  p: 2.5,
                  minHeight: 420,
                  transition: 'all 220ms ease',
                  boxShadow: isHovered ? '0 6px 16px rgba(0, 0, 0, 0.09)' : 'none',
                }}
              >
                <Box
                  component="img"
                  src={product.image}
                  alt={product.title}
                  sx={{
                    width: '100%',
                    height: 210,
                    objectFit: 'contain',
                    borderRadius: 1.5,
                    mb: 2.5,
                    bgcolor: '#f4f4f4',
                  }}
                />

                <Typography
                  sx={{
                    color: '#2e2f33',
                    fontSize: { xs: 20, sm: 22 },
                    lineHeight: 1.2,
                    fontWeight: 500,
                  }}
                >
                  {product.title}
                </Typography>

                <Box
                  sx={{
                    maxHeight: isHovered ? 180 : 0,
                    opacity: isHovered ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 260ms ease, opacity 220ms ease, margin 220ms ease',
                    mt: isHovered ? 1.5 : 0,
                  }}
                >
                  <Typography
                    sx={{
                      color: '#3f4044',
                      fontSize: { xs: 15, sm: 17 },
                      lineHeight: 1.5,
                    }}
                  >
                    {product.description}
                  </Typography>
                </Box>
              </Paper>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
