'use client'
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import { appFrame } from '@data/appFrame'
import { useHeader } from '@comp/HeaderContext'

interface NavProps {
  sectionRefs?: { [key: string]: React.RefObject<HTMLElement | null> }
}

export default function Nav({ sectionRefs }: NavProps) {
  const headerContext = useHeader()
  if (!headerContext) {
    throw new Error('useHeader must be used within a HeaderProvider')
  }
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const toggleDrawer = React.useCallback(
    (open: boolean) => () => {
      setDrawerOpen(open)
    },
    []
  )

  // Smooth scroll handler using refs
  const handleSmoothScroll = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, url: string) => {
      if (url.startsWith('#')) {
        e.preventDefault()
        headerContext.setShowHeader(false)
        const targetId = url.replace('#', '')
        const ref = sectionRefs?.[targetId]
        if (ref && ref.current) {
          ref.current.scrollIntoView({ behavior: 'smooth' })
        }
        setDrawerOpen(false)
        setTimeout(() => {
          headerContext.setShowHeader(true)
        }, 2000) // Adjust timeout as needed
      }
    },
    [headerContext, sectionRefs]
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ backgroundColor: '#1a1a1a' }}>
        <Toolbar>
          <Typography component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#fed136' }}>
            <Link
              href="#"
              className="site-logo-link navbar-brand site-logo"
              style={{ fontFamily: 'caveat', textDecoration: 'none', color: '#fed136', fontSize: '2.5rem', alignItems: 'center' }}
            >
              <span className="hs-site-logo-symbol font-caveat" style={{ fontSize: '3.5rem', fontWeight: '300', marginTop: '-18px', fontFamily: 'caveat' }}>
                @
              </span>
              <span className="site-logo-link" style={{ fontSize: '2.5rem', fontWeight: '400', lineHeight: '2.5', fontFamily: 'caveat' }}>
                HeathShults
              </span>
            </Link>
          </Typography>
          {/* Menu button on the right */}
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} size="large" sx={{ marginRight: '2rem' }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: '50vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgb(0 0 0 / 75%)',
            color: '#fff',
          },
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            position: 'relative',
          }}
        >
          {/* Close button at the top-right */}
          <IconButton
            aria-label="close drawer"
            onClick={toggleDrawer(false)}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: '#fff',
              zIndex: 1,
            }}
            size="large"
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
          <List sx={{ width: '100%' }}>
            {appFrame.map((link) => (
              <ListItem key={link.page} disablePadding sx={{ justifyContent: 'center', color: '#fff' }}>
                <ListItemButton
                  component={Link}
                  href={link.url}
                  sx={{ justifyContent: 'center', color: '#fff' }}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => handleSmoothScroll(e, link.url)}
                >
                  <ListItemText
                    primary={link.page}
                    primaryTypographyProps={{
                      align: 'center',
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      color: '#fff',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  )
}
