import * as React from 'react'
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Heebo, Nunito, Caveat, Permanent_Marker } from 'next/font/google'
import './globals.css'
import './css/plugins.css'
import './css/style.css?ver=2.0'
import Header from '@app/components/Header'
import Footer from '@app/components/Footer'
import Script from 'next/script'
import { Container, Box } from '@mui/material'
import { HeaderProvider } from '@comp/HeaderContext'
import CustomThemeProvider from '@comp/ThemeProvider'

const heebo = Heebo({
  variable: '--font-heebo',
  subsets: ['latin'],
})

const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
})

const permanent_marker = Permanent_Marker({
  weight: '400',
  variable: '--font-permanent-marker',
  subsets: ['latin'],
})

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
})

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Heath Shults - Software Architect &amp Engineer',
  description: 'Portfolio and blog of Heath Shults, a software architect and engineer specializing in full-stack development, cloud computing, and scalable web applications.',
  openGraph: {
    title: 'My Site',
    description: 'Welcome to My Site',
    url: 'https://heathshults.com',
    siteName: 'Heath Shults Portfolio',
    images: [{ url: 'https://heathshults.com/og.png' }],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className={`${caveat.variable} ${permanent_marker.variable} ${geistSans.variable} ${geistMono.variable} ${heebo.variable} ${nunito.variable} antialiased home-static`}>
        <CustomThemeProvider>
          <HeaderProvider>
            <Header />
            <Container disableGutters={true} sx={{ maxWidth: '100vw !important', padding: 0, margin: 0 }}>
              <Box
                component="main"
                className="neoh_fn_main"
                data-footer-sticky=""
                sx={{
                  maxWidth: '100%',
                  margin: '0 auto',
                  position: 'relative',
                  paddingTop: { xs: '56px', sm: '64px' }, // 64px for desktop, 56px for mobile
                }}
              >
                {children}
                <Footer />
              </Box>
            </Container>
          </HeaderProvider>
        </CustomThemeProvider>
        <Script src="/js/jquery.js" strategy="afterInteractive" />
        <Script src="/js/plugins.js" strategy="afterInteractive" />
        <Script src="/js/init.js?ver=2.0" strategy="afterInteractive" />
      </body>
    </html>
  )
}
