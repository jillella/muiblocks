import type { SxProps, Theme } from '@mui/material/styles';

/** Shared palette / chrome for dashboard cards (no global MUI theme required). */
export const cardTokens = {
  border: '#e0e0e0',
  shadow: '0 2px 8px rgba(0,0,0,0.08)',
  title: '#486c94',
  bodyStrong: '#121b2c',
  mutedIcon: '#9ca3af',
  gridLine: '#d8e2eb',
  metricShadow: '2px 3px 5px -2px rgba(30, 56, 88, 0.28)',
  metricCorner: '#2b9a93',
  positive: '#1c8783',
  white: '#ffffff',
  iconOnAvatar: '#fff',
  avatar: {
    entity: { fill: '#AA936C', ring: '#E2DCD1' },
    products: { fill: '#387f97', ring: '#c5d8dc' },
    risk: { fill: '#674b77', ring: '#d2cad6' },
  },
} as const;

const root: SxProps<Theme> = {
  borderRadius: 3,
  boxShadow: cardTokens.shadow,
  border: `1px solid ${cardTokens.border}`,
  height: '100%',
  minWidth: 480,
};

const content: SxProps<Theme> = {
  p: 2,
  '&.MuiCardContent-root:last-child': {
    pb: 2,
  },
};

const headerRow: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'flex-start',
  mb: 2,
};

const avatarBase: SxProps<Theme> = {
  width: 48,
  height: 48,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  borderWidth: 5,
  borderStyle: 'solid',
};

const avatar = (fill: string, ring: string): SxProps<Theme> => ({
  ...avatarBase,
  backgroundColor: fill,
  borderColor: ring,
});

const iconInAvatar: SxProps<Theme> = {
  color: cardTokens.iconOnAvatar,
  fontSize: 24,
};

const headerTextColumn: SxProps<Theme> = {
  flex: 1,
  pt: 0.5,
};

const titleBar: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  px: 2,
};

const titleToolbarActions: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.2,
};

const cardTitle: SxProps<Theme> = {
  fontWeight: 600,
  color: cardTokens.title,
  letterSpacing: 1.5,
  textTransform: 'uppercase',
  fontSize: '1.5rem',
  lineHeight: 1.15,
  mb: 0.2,
};

const toolbarIcon: SxProps<Theme> = {
  color: cardTokens.mutedIcon,
};

const metricGrid: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 1.8,
  position: 'relative',
};

const metricCell: SxProps<Theme> = {
  position: 'relative',
  flex: 1,
  px: 1.7,
  pb: 0.2,
  backgroundColor: cardTokens.white,
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: `1px solid ${cardTokens.gridLine}`,
  borderBottom: `1px solid ${cardTokens.gridLine}`,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 12,
  boxShadow: cardTokens.metricShadow,
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: 0,
    height: 0,
    borderTop: `22px solid ${cardTokens.metricCorner}`,
    borderLeft: '22px solid transparent',
    opacity: 0.9,
  },
};

const metricLabel: SxProps<Theme> = {
  color: cardTokens.title,
  fontSize: '0.875rem',
  fontWeight: 500,
  display: 'block',
  mb: 0.5,
};

const metricValueRow: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'baseline',
  gap: 1,
};

const metricValue: SxProps<Theme> = {
  fontWeight: 500,
  color: cardTokens.bodyStrong,
  fontSize: '2.375rem',
};

const metricChange: SxProps<Theme> = {
  color: cardTokens.positive,
  fontSize: '0.9375rem',
  fontWeight: 500,
};

const twoColumnRow: SxProps<Theme> = {
  display: 'flex',
};

const column: SxProps<Theme> = {
  flex: 1,
};

const columnLeft: SxProps<Theme> = {
  ...column,
  pr: 2,
};

const columnRight: SxProps<Theme> = {
  ...column,
  pl: 2,
};

const dataRow: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 2,
};

const dataRowTop: SxProps<Theme> = {
  ...dataRow,
  pb: 1.5,
};

const dataRowBottom: SxProps<Theme> = {
  ...dataRow,
  pt: 1.5,
};

const dataLabel: SxProps<Theme> = {
  color: cardTokens.title,
  fontSize: '0.875rem',
  fontWeight: 500,
  whiteSpace: 'nowrap',
};

const dataValue: SxProps<Theme> = {
  fontWeight: 700,
  color: cardTokens.bodyStrong,
  fontSize: '0.9375rem',
  whiteSpace: 'nowrap',
};

const verticalDividerGutter: SxProps<Theme> = {
  mx: 0.5,
};

const gradientDividerUnderTitle: SxProps<Theme> = {
  mt: 0.45,
};

export const dashboardCard = {
  root,
  content,
  headerRow,
  headerTextColumn,
  titleBar,
  titleToolbarActions,
  cardTitle,
  toolbarIcon,
  iconInAvatar,
  metricGrid,
  metricCell,
  metricLabel,
  metricValueRow,
  metricValue,
  metricChange,
  twoColumnRow,
  columnLeft,
  columnRight,
  dataRowTop,
  dataRowBottom,
  dataLabel,
  dataValue,
  verticalDividerGutter,
  gradientDividerUnderTitle,
  avatarEntity: avatar(
    cardTokens.avatar.entity.fill,
    cardTokens.avatar.entity.ring,
  ),
  avatarProducts: avatar(
    cardTokens.avatar.products.fill,
    cardTokens.avatar.products.ring,
  ),
  avatarRisk: avatar(
    cardTokens.avatar.risk.fill,
    cardTokens.avatar.risk.ring,
  ),
} as const;
