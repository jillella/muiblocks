'use client';

import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Box,
  Container,
  Divider,
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

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const entityScopeGroups = [
  {
    parent: 'AD (Americas Division)',
    children: ['United States', 'Cayman Islands', 'South America'],
  },
  {
    parent: 'CUSO',
    children: ['U.S (All)', 'Cap Markets', 'Branch'],
  },
  {
    parent: 'BHC',
    children: ['BHC Markets'],
  },
];
const regulators = ['JFSA', 'FRB', 'NFA', 'PRA'];
const marketRiskOptions = ['Market Risk XVA'];

export default function FiltersPage() {
  const [selectedEntityScopes, setSelectedEntityScopes] = useState<string[]>([]);
  const [selectedRegulator, setSelectedRegulator] = useState<string>(regulators[0]);
  const [selectedMarketRisk, setSelectedMarketRisk] = useState<string>(marketRiskOptions[0]);

  const toggleEntityScopeChild = (child: string) => {
    setSelectedEntityScopes((prev) =>
      prev.includes(child) ? prev.filter((value) => value !== child) : [...prev, child],
    );
  };

  const toggleEntityScopeParent = (children: string[]) => {
    setSelectedEntityScopes((prev) => {
      const allChildrenSelected = children.every((child) => prev.includes(child));
      if (allChildrenSelected) {
        return prev.filter((value) => !children.includes(value));
      }
      const next = new Set(prev);
      children.forEach((child) => next.add(child));
      return Array.from(next);
    });
  };

  const getParentSelectionState = (children: string[]) => {
    const selectedChildrenCount = children.filter((child) => selectedEntityScopes.includes(child)).length;
    const checked = selectedChildrenCount === children.length && children.length > 0;
    const indeterminate = selectedChildrenCount > 0 && selectedChildrenCount < children.length;
    return { checked, indeterminate };
  };

  const handleRegulatorChange = (event: SelectChangeEvent<string>) => {
    setSelectedRegulator(event.target.value);
  };

  const handleMarketRiskChange = (event: SelectChangeEvent<string>) => {
    setSelectedMarketRisk(event.target.value);
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
            <Stack
              direction="row"
              spacing={2}
              sx={{
                flexWrap: 'nowrap',
                overflowX: 'auto',
                pb: 0.5,
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
              }}
            >
              <FormControl sx={{ flex: '1 1 0', minWidth: 260 }}>
                <FilterSelect
                  id="entity-scope-select"
                  multiple
                  value={selectedEntityScopes}
                  displayEmpty
                  renderValue={(selected) => {
                    const selectedScopes = selected as string[];
                    if (!selectedScopes.length) return 'Entity Scope';
                    return `Entity Scope (${selectedScopes.length})`;
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        mt: 1,
                        minWidth: 420,
                        borderRadius: 2,
                        border: '1px solid #d9dfe5',
                        backgroundColor: '#f7f9fa',
                        boxShadow: '0 8px 22px rgba(0,0,0,0.12)',
                        '& .MuiMenu-list': { py: 1.25 },
                      },
                    },
                  }}
                >
                  {entityScopeGroups.flatMap((group, groupIndex) => {
                    const { checked, indeterminate } = getParentSelectionState(group.children);
                    const groupItems = [
                      <MenuItem
                        key={group.parent}
                        value={group.parent}
                        onClick={(event) => {
                          event.preventDefault();
                          toggleEntityScopeParent(group.children);
                        }}
                        sx={{
                          minHeight: 58,
                          px: 2.5,
                          gap: 1.25,
                          '&.Mui-selected': { backgroundColor: 'transparent' },
                          '&.Mui-selected:hover': { backgroundColor: '#f1f4f6' },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 0 }}>
                          <Box
                            sx={{
                              width: 38,
                              height: 38,
                              borderRadius: 1.75,
                              backgroundColor: '#eef2f0',
                              display: 'grid',
                              placeItems: 'center',
                            }}
                          >
                            <Box
                              sx={{
                                width: 24,
                                height: 24,
                                borderRadius: 0.75,
                                backgroundColor: '#0b5d45',
                                display: 'grid',
                                placeItems: 'center',
                              }}
                            >
                              {indeterminate ? (
                                <RemoveIcon sx={{ fontSize: 18, color: '#fff' }} />
                              ) : (
                                <CheckIcon
                                  sx={{
                                    fontSize: 18,
                                    color: '#fff',
                                    opacity: checked ? 1 : 0,
                                    transition: 'opacity 120ms ease',
                                  }}
                                />
                              )}
                            </Box>
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          primary={group.parent}
                          primaryTypographyProps={{
                            fontSize: '1.04rem',
                            fontWeight: 700,
                            color: '#1d2329',
                          }}
                        />
                      </MenuItem>,
                    ];

                    group.children.forEach((child) => {
                      const isSelected = selectedEntityScopes.includes(child);
                      groupItems.push(
                        <MenuItem
                          key={child}
                          value={child}
                          onClick={(event) => {
                            event.preventDefault();
                            toggleEntityScopeChild(child);
                          }}
                          sx={{
                            minHeight: 58,
                            px: 2.5,
                            gap: 1.25,
                            '&.Mui-selected': { backgroundColor: 'transparent' },
                            '&.Mui-selected:hover': { backgroundColor: '#f1f4f6' },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 0 }}>
                            <Box
                              sx={{
                                width: 38,
                                height: 38,
                                borderRadius: 1.75,
                                backgroundColor: '#eef2f0',
                                display: 'grid',
                                placeItems: 'center',
                              }}
                            >
                              <Box
                                sx={{
                                  width: 24,
                                  height: 24,
                                  borderRadius: 0.75,
                                  backgroundColor: '#0b5d45',
                                  display: 'grid',
                                  placeItems: 'center',
                                }}
                              >
                                <CheckIcon
                                  sx={{
                                    fontSize: 18,
                                    color: '#fff',
                                    opacity: isSelected ? 1 : 0,
                                    transition: 'opacity 120ms ease',
                                  }}
                                />
                              </Box>
                            </Box>
                          </ListItemIcon>
                          <ListItemText
                            primary={child}
                            primaryTypographyProps={{
                              fontSize: '1.04rem',
                              fontWeight: 500,
                              color: '#1d2329',
                            }}
                            sx={{ pl: 0.5 }}
                          />
                        </MenuItem>,
                      );
                    });

                    if (groupIndex < entityScopeGroups.length - 1) {
                      groupItems.push(
                        <Divider key={`entity-divider-${groupIndex}`} sx={{ my: 0.75, borderColor: '#d4d9de' }} />,
                      );
                    }

                    return groupItems;
                  })}
                </FilterSelect>
              </FormControl>

              <FormControl sx={{ flex: '1 1 0', minWidth: 220 }}>
                <FilterSelect
                  id="regulator-select"
                  value={selectedRegulator}
                  onChange={handleRegulatorChange}
                  renderValue={() => 'Regulator'}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        mt: 1,
                        minWidth: 220,
                        borderRadius: 2,
                        border: '1px solid #d9dfe5',
                        backgroundColor: '#f7f9fa',
                        boxShadow: '0 8px 22px rgba(0,0,0,0.12)',
                      },
                    },
                    MenuListProps: { sx: { py: 0.75 } },
                  }}
                >
                  {regulators.flatMap((regulator, index) => {
                    const menuItems = [
                      <MenuItem
                        key={regulator}
                        value={regulator}
                        sx={{
                          minHeight: 56,
                          px: 2.5,
                          fontSize: '1.02rem',
                          fontWeight: 500,
                          '&.Mui-selected': { backgroundColor: 'transparent' },
                          '&.Mui-selected:hover': { backgroundColor: '#f1f4f6' },
                        }}
                      >
                        {regulator}
                      </MenuItem>,
                    ];

                    if (index < regulators.length - 1) {
                      menuItems.push(<Divider key={`regulator-divider-${regulator}`} sx={{ borderColor: '#e1e5e9' }} />);
                    }

                    return menuItems;
                  })}
                </FilterSelect>
              </FormControl>

              <FormControl sx={{ flex: '1 1 0', minWidth: 240 }}>
                <FilterSelect
                  id="market-risk-select"
                  value={selectedMarketRisk}
                  onChange={handleMarketRiskChange}
                >
                  {marketRiskOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </FilterSelect>
              </FormControl>
            </Stack>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
