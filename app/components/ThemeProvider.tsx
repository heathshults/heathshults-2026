'use client'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import type { ReactNode } from 'react'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export default function CustomThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
