'use client';

import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import {
  Box,
  Container,
  FormControl,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { mockProducts, mockRiskFactors } from '@/lib/mock-data';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const riskTags = ['Liquidity', 'Concentration', 'Market', 'Operational', 'Credit', 'Compliance'];

const pillSelectSx = {
  height: 48,
  borderRadius: '999px',
  backgroundColor: '#014f47',
  color: '#b9cec9',
  fontSize: '0.95rem',
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
    py: 0.55,
    pl: 3.1,
    pr: '4.9rem !important',
    display: 'flex',
    alignItems: 'center',
    minWidth: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  '& .MuiSelect-icon': {
    right: 16,
    top: '50%',
    transform: 'translateY(-50%)',
    transition: 'transform 180ms ease',
    transformOrigin: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    color: '#86aaa5',
    width: 26,
    height: 26,
    p: 0.22,
    border: '2px solid #628e88',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  '& .MuiSelect-iconOpen': {
    transform: 'translateY(-50%) rotate(180deg)',
  },
};

export default function FiltersPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>(['Liquidity', 'Market']);
  const [selectedProduct, setSelectedProduct] = useState<string>(mockProducts[0]?.name ?? '');
  const [selectedRiskFactor, setSelectedRiskFactor] = useState<string>(mockRiskFactors[0]?.name ?? '');

  const handleTagChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedTags(typeof value === 'string' ? value.split(',') : value);
  };

  const handleProductChange = (event: SelectChangeEvent<string>) => {
    setSelectedProduct(event.target.value);
  };

  const handleRiskFactorChange = (event: SelectChangeEvent<string>) => {
    setSelectedRiskFactor(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f8fafc',
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              px: 3,
              py: 1.75,
              borderRadius: 2.5,
              border: '1px solid #e5e7eb',
              backgroundColor: '#ffffff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <Typography variant="subtitle2" sx={{ color: '#486c94', fontWeight: 700, mb: 1.25 }}>
              Page filters
            </Typography>
            <Stack spacing={2}>
              <FormControl fullWidth>
                <Select
                  id="product-select"
                  IconComponent={KeyboardArrowDownRoundedIcon}
                  value={selectedProduct}
                  onChange={handleProductChange}
                  sx={pillSelectSx}
                >
                  {mockProducts.map((product) => (
                    <MenuItem key={product.name} value={product.name}>
                      {product.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <Select
                  id="risk-factor-select"
                  IconComponent={KeyboardArrowDownRoundedIcon}
                  value={selectedRiskFactor}
                  onChange={handleRiskFactorChange}
                  sx={pillSelectSx}
                >
                  {mockRiskFactors.map((factor) => (
                    <MenuItem key={factor.name} value={factor.name}>
                      {factor.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <Select
                  id="risk-tag-select"
                  IconComponent={KeyboardArrowDownRoundedIcon}
                  multiple
                  value={selectedTags}
                  onChange={handleTagChange}
                  sx={pillSelectSx}
                  renderValue={(selected) => {
                    if (!selected.length) return 'Tags';
                    if (selected.length === 1) return selected[0];
                    return `${selected[0]} +${selected.length - 1}`;
                  }}
                >
                  {riskTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <MenuItem key={tag} value={tag}>
                        <ListItemText primary={tag} />
                        <ListItemIcon sx={{ minWidth: 0, justifyContent: 'flex-end' }}>
                          <CheckIcon
                            fontSize="small"
                            sx={{ opacity: isSelected ? 1 : 0, transition: 'opacity 120ms ease' }}
                          />
                        </ListItemIcon>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Stack>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
