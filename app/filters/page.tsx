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
const marketRiskOptions = ['Market Risk XVA', 'XVA'];

export default function FiltersPage() {
  const [selectedEntityScopes, setSelectedEntityScopes] = useState<string[]>([]);
  const [selectedRegulator, setSelectedRegulator] = useState<string>('');
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
                        '& .MuiMenu-list': { py: 0.75 },
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
                          minHeight: 48,
                          px: 2,
                          gap: 1,
                          '&.Mui-selected': { backgroundColor: 'transparent' },
                          '&.Mui-selected:hover': { backgroundColor: '#f1f4f6' },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 0 }}>
                          <Box
                            sx={{
                              width: 30,
                              height: 30,
                              borderRadius: 1.25,
                              backgroundColor: '#eef2f0',
                              display: 'grid',
                              placeItems: 'center',
                            }}
                          >
                            <Box
                              sx={{
                                width: 20,
                                height: 20,
                                borderRadius: 0.5,
                                backgroundColor: checked || indeterminate ? '#2f9e44' : '#0b5d45',
                                display: 'grid',
                                placeItems: 'center',
                                transition: 'background-color 140ms ease',
                              }}
                            >
                              {indeterminate ? (
                                <RemoveIcon sx={{ fontSize: 16, color: '#fff' }} />
                              ) : (
                                <CheckIcon
                                  sx={{
                                    fontSize: 16,
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
                          slotProps={{
                            primary: {
                              sx: {
                                fontSize: '0.98rem',
                                fontWeight: 700,
                                color: '#1d2329',
                              },
                            },
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
                            minHeight: 46,
                            px: 2,
                            gap: 1,
                            '&.Mui-selected': { backgroundColor: 'transparent' },
                            '&.Mui-selected:hover': { backgroundColor: '#f1f4f6' },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 0 }}>
                            <Box
                              sx={{
                                width: 30,
                                height: 30,
                                borderRadius: 1.25,
                                backgroundColor: '#eef2f0',
                                display: 'grid',
                                placeItems: 'center',
                              }}
                            >
                              <Box
                                sx={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: 0.5,
                                  backgroundColor: isSelected ? '#2f9e44' : '#0b5d45',
                                  display: 'grid',
                                  placeItems: 'center',
                                  transition: 'background-color 140ms ease',
                                }}
                              >
                                <CheckIcon
                                  sx={{
                                    fontSize: 16,
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
                            slotProps={{
                              primary: {
                                sx: {
                                  fontSize: '0.96rem',
                                  fontWeight: 500,
                                  color: '#1d2329',
                                },
                              },
                            }}
                            sx={{ pl: 0.5 }}
                          />
                        </MenuItem>,
                      );
                    });

                    if (groupIndex < entityScopeGroups.length - 1) {
                      groupItems.push(
                        <Divider
                          key={`entity-divider-${groupIndex}`}
                          variant="middle"
                          sx={{ my: 0.45, borderColor: '#d4d9de' }}
                        />,
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
                  displayEmpty
                  renderValue={(selected) => (selected as string) || 'Regulator'}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        mt: 1,
                        minWidth: 230,
                        borderRadius: 2,
                        border: '1px solid #d9dfe5',
                        backgroundColor: '#f7f9fa',
                        boxShadow: '0 8px 22px rgba(0,0,0,0.12)',
                      },
                    },
                    MenuListProps: { sx: { py: 0.5 } },
                  }}
                >
                  {regulators.map((regulator) => (
                    <MenuItem
                      key={regulator}
                      value={regulator}
                      sx={{
                        minHeight: 50,
                        px: 3,
                        fontSize: '0.98rem',
                        lineHeight: 1.2,
                        fontWeight: 500,
                        '&.Mui-selected': { backgroundColor: 'transparent' },
                        '&.Mui-selected:hover': { backgroundColor: '#f1f4f6' },
                      }}
                    >
                      {regulator}
                    </MenuItem>
                  ))}
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
