'use client';

import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

const GradientDivider = styled(Divider)({
  border: 'none',
  height: '1.7px',
  background:
    'linear-gradient(90deg, transparent 0%, #486c94 50%, transparent 100%)',
  margin: '8px 0',
  opacity: 1,
  '&.MuiDivider-vertical': {
    width: '1.7px',
    height: 'auto',
    margin: '0 8px',
    background:
      'linear-gradient(180deg, transparent 0%, #486c94 50%, transparent 100%)',
  },
});

export default GradientDivider;
