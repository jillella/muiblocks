'use client'

import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import BuildOutlined from '@mui/icons-material/BuildOutlined'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsNoneOutlined from '@mui/icons-material/NotificationsNoneOutlined'
import PublicOutlined from '@mui/icons-material/PublicOutlined'
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined'

const HEADER_BG = '#004d2c'
const ACCENT = '#8dc63f'

function LogoMark({ sx }: { sx?: object }) {
  return (
    <Box
      component="svg"
      sx={{ flexShrink: 0, ...sx }}
      viewBox="0 0 28 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M4 28 L10 4 L14 5 L8 29 Z" fill={ACCENT} fillOpacity={0.95} />
      <path d="M10 28 L16 2 L20 3 L14 29 Z" fill={ACCENT} />
      <path d="M16 28 L22 0 L26 1 L20 29 Z" fill={ACCENT} fillOpacity={0.9} />
    </Box>
  )
}

function NavMenu({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  return (
    <>
      <Button
        color="inherit"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={
          <KeyboardArrowDown
            sx={{
              fontSize: 18,
              transition: 'transform 0.2s',
              transform: open ? 'rotate(-180deg)' : 'none',
            }}
          />
        }
        sx={{
          fontSize: { xs: 10, xl: 11 },
          fontWeight: 600,
          letterSpacing: '0.06em',
          color: 'common.white',
          minWidth: 'auto',
          px: { xs: 1, xl: 1.25 },
          py: 0.75,
          '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
          ...(open && { bgcolor: 'rgba(255,255,255,0.1)' }),
        }}
      >
        {label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        slotProps={{
          paper: {
            sx: {
              mt: 0.5,
              minWidth: 224,
              boxShadow: 3,
              '& .MuiMenuItem-root': { fontSize: 14, py: 1.25, color: 'grey.800' },
            },
          },
        }}
        MenuListProps={{ onClick: () => setAnchorEl(null) }}
      >
        {children}
      </Menu>
    </>
  )
}

function NestedMenuItem({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const leaveTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = () => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current)
      leaveTimer.current = null
    }
  }

  const scheduleClose = () => {
    clearTimer()
    leaveTimer.current = setTimeout(() => setAnchorEl(null), 180)
  }

  React.useEffect(() => () => clearTimer(), [])

  return (
    <MenuItem
      onMouseEnter={(e) => {
        clearTimer()
        setAnchorEl(e.currentTarget)
      }}
      onMouseLeave={scheduleClose}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 1,
        position: 'relative',
        bgcolor: open ? 'grey.100' : 'transparent',
      }}
    >
      {label}
      <KeyboardArrowRight sx={{ fontSize: 20, color: 'grey.500', ml: 'auto' }} />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              ml: 0.5,
              minWidth: 200,
              boxShadow: 3,
              pointerEvents: 'auto',
              '& .MuiMenuItem-root': { fontSize: 14, py: 1.25, color: 'grey.800' },
            },
            onMouseEnter: clearTimer,
            onMouseLeave: scheduleClose,
          },
        }}
        MenuListProps={{ onClick: () => setAnchorEl(null) }}
      >
        {children}
      </Menu>
    </MenuItem>
  )
}

function UtilityIconButton({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <IconButton
      aria-label={label}
      size="small"
      sx={{
        color: 'rgba(255,255,255,0.95)',
        p: { xs: 0.75, sm: 1 },
        '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
        '&:focus-visible': { outline: `2px solid ${ACCENT}`, outlineOffset: 2 },
      }}
    >
      {children}
    </IconButton>
  )
}

function MobileSection({
  title,
  defaultOpen,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(!!defaultOpen)
  return (
    <Box sx={{ borderBottom: '1px solid', borderColor: 'grey.300' }}>
      <ListItemButton onClick={() => setOpen(!open)} sx={{ py: 1.5, pl: 1 }}>
        <ListItemText
          primary={title}
          primaryTypographyProps={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.06em',
            color: HEADER_BG,
          }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open}>{children}</Collapse>
    </Box>
  )
}

function MobileNested({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  return (
    <Box sx={{ borderBottom: '1px solid', borderColor: 'grey.300' }}>
      <ListItemButton onClick={() => setOpen(!open)} sx={{ py: 1.25, pl: 1 }}>
        <ListItemText
          primary={label}
          primaryTypographyProps={{ fontSize: 14, fontWeight: 500, color: 'grey.900' }}
        />
        {open ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
      </ListItemButton>
      <Collapse in={open}>
        <List component="div" disablePadding sx={{ pl: 2, pb: 1 }}>
          {children}
        </List>
      </Collapse>
    </Box>
  )
}

function MobileLink({ children }: { children: React.ReactNode }) {
  return (
    <ListItemButton
      component="a"
      href="#"
      onClick={(e) => e.preventDefault()}
      sx={{ borderRadius: 1, py: 1, px: 1.5 }}
    >
      <ListItemText
        primary={children}
        primaryTypographyProps={{ fontSize: 14, color: 'grey.700' }}
      />
    </ListItemButton>
  )
}

export function UssparcHeader() {
  const theme = useTheme()
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'))
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <AppBar
      position="relative"
      elevation={1}
      sx={{
        zIndex: theme.zIndex.appBar,
        bgcolor: HEADER_BG,
        color: 'common.white',
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          minHeight: { xs: 52, sm: 56 },
          maxWidth: 1920,
          mx: 'auto',
          width: '100%',
          px: { xs: 1.5, sm: 2.5, md: 4 },
          gap: 1.5,
          justifyContent: 'space-between',
        }}
      >
        <Box
          component="a"
          href="#"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1, sm: 1.25 },
            minWidth: 0,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <LogoMark sx={{ width: { xs: 28, sm: 32 }, height: { xs: 32, sm: 36 } }} />
          <Box
            component="span"
            sx={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: { xs: '1.125rem', sm: '1.25rem' },
              fontWeight: 400,
              letterSpacing: '0.04em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            US SPARC
          </Box>
          <Box
            component="span"
            sx={{
              flexShrink: 0,
              bgcolor: ACCENT,
              color: 'common.white',
              px: { xs: 0.5, sm: 0.75 },
              py: 0.25,
              borderRadius: 0.5,
              fontSize: { xs: '8px', sm: '10px' },
              fontWeight: 700,
              letterSpacing: '0.08em',
            }}
          >
            REL
          </Box>
        </Box>

        {isLgUp && (
          <Box
            component="nav"
            aria-label="Primary"
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: { lg: 0.5, xl: 1 },
            }}
          >
            <NavMenu label="DASHBOARD">
              <MenuItem>VaR</MenuItem>
              <MenuItem>Market Data</MenuItem>
              <MenuItem>SVaR Window Calibration</MenuItem>
            </NavMenu>

            <NavMenu label="VaR">
              <MenuItem>Calculator</MenuItem>
              <NestedMenuItem label="Risk Factor">
                <MenuItem>Mappings</MenuItem>
                <MenuItem>Correlated</MenuItem>
              </NestedMenuItem>
              <MenuItem>Model Configuration</MenuItem>
              <MenuItem>Benchmarking</MenuItem>
            </NavMenu>

            <NavMenu label="STRESS">
              <MenuItem>Scenario Viewer</MenuItem>
              <MenuItem>Shock Rates</MenuItem>
            </NavMenu>

            <NavMenu label="SUPPORT">
              <MenuItem>Runs</MenuItem>
              <MenuItem>DQ Reports</MenuItem>
              <MenuItem>Job Trigger</MenuItem>
              <NestedMenuItem label="Recon">
                <MenuItem>U.S. SPARC vs MARX PnL</MenuItem>
              </NestedMenuItem>
            </NavMenu>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.25, sm: 0.5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <UtilityIconButton label="Language">
              <PublicOutlined sx={{ fontSize: { xs: 22, sm: 24 } }} />
            </UtilityIconButton>
            <UtilityIconButton label="Tools">
              <BuildOutlined sx={{ fontSize: { xs: 22, sm: 24 } }} />
            </UtilityIconButton>
            <UtilityIconButton label="Notifications">
              <NotificationsNoneOutlined sx={{ fontSize: { xs: 22, sm: 24 } }} />
            </UtilityIconButton>
            <UtilityIconButton label="Profile">
              <AccountCircleOutlined sx={{ fontSize: { xs: 22, sm: 24 } }} />
            </UtilityIconButton>
          </Box>

          {!isLgUp && (
            <IconButton
              color="inherit"
              aria-label="Open menu"
              edge="end"
              onClick={() => setMobileOpen(true)}
              sx={{ ml: 0.5 }}
            >
              <MenuIcon sx={{ fontSize: 28 }} />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      <Divider sx={{ borderColor: ACCENT, opacity: 1, borderBottomWidth: 1 }} />

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 'min(100vw - 16px, 352px)',
            bgcolor: 'grey.50',
          },
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 2,
            bgcolor: HEADER_BG,
            color: 'common.white',
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '1.125rem',
            letterSpacing: '0.04em',
          }}
        >
          US SPARC
        </Box>
        <List
          component="nav"
          disablePadding
          sx={{ maxHeight: 'calc(100vh - 80px)', overflow: 'auto', px: 1, py: 1.5 }}
        >
          <MobileSection title="DASHBOARD" defaultOpen>
            <MobileLink>VaR</MobileLink>
            <MobileLink>Market Data</MobileLink>
            <MobileLink>SVaR Window Calibration</MobileLink>
          </MobileSection>
          <MobileSection title="VaR">
            <MobileLink>Calculator</MobileLink>
            <MobileNested label="Risk Factor">
              <MobileLink>Mappings</MobileLink>
              <MobileLink>Correlated</MobileLink>
            </MobileNested>
            <MobileLink>Model Configuration</MobileLink>
            <MobileLink>Benchmarking</MobileLink>
          </MobileSection>
          <MobileSection title="STRESS">
            <MobileLink>Scenario Viewer</MobileLink>
            <MobileLink>Shock Rates</MobileLink>
          </MobileSection>
          <MobileSection title="SUPPORT">
            <MobileLink>Runs</MobileLink>
            <MobileLink>DQ Reports</MobileLink>
            <MobileLink>Job Trigger</MobileLink>
            <MobileNested label="Recon">
              <MobileLink>U.S. SPARC vs MARX PnL</MobileLink>
            </MobileNested>
          </MobileSection>
        </List>
      </Drawer>
    </AppBar>
  )
}
