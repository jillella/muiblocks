'use client';

import CheckIcon from '@mui/icons-material/Check';
import {
  Box,
  Container,
  FormControl,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import FilterSelect from '@/components/common/FilterSelect';
import { mockProducts, mockRiskFactors } from '@/lib/mock-data';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const riskTags = ['Liquidity', 'Concentration', 'Market', 'Operational', 'Credit', 'Compliance'];

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
              px: 4,
              py: 1.75,
              borderRadius: 2.5,
              border: '1px solid #e5e7eb',
              backgroundColor: '#004b35',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 700, mb: 1.25 }}>
              Page filters
            </Typography>
            <Stack spacing={2}>
              <FormControl fullWidth>
                <FilterSelect
                  id="product-select"
                  value={selectedProduct}
                  onChange={handleProductChange}
                >
                  {mockProducts.map((product) => (
                    <MenuItem key={product.name} value={product.name}>
                      {product.name}
                    </MenuItem>
                  ))}
                </FilterSelect>
              </FormControl>

              <FormControl fullWidth>
                <FilterSelect
                  id="risk-factor-select"
                  value={selectedRiskFactor}
                  onChange={handleRiskFactorChange}
                >
                  {mockRiskFactors.map((factor) => (
                    <MenuItem key={factor.name} value={factor.name}>
                      {factor.name}
                    </MenuItem>
                  ))}
                </FilterSelect>
              </FormControl>

              <FormControl fullWidth>
                <FilterSelect
                  id="risk-tag-select"
                  multiple
                  value={selectedTags}
                  onChange={handleTagChange}
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
                </FilterSelect>
              </FormControl>
            </Stack>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
