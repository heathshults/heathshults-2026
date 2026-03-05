import * as React from 'react'
import { Paper, Box } from '@mui/material'
import Welcome from './Welcome.tsx'

export default function Home() {
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          width: '100vw',
          minHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
          overflow: 'hidden',
          marginTop: 0, // To offset the fixed header
        }}
      >
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100%',
            objectFit: 'cover',
            margin: 0,
            zIndex: 0,
          }}
        >
          <source src="/vid/landing.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Content overlay */}
        <Box
          component="section"
          className="app-section"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100%',
            position: 'relative',
            zIndex: 1,
            maxWidth: '90%',
            margin: '0 auto',
            paddingTop: '2rem',
            paddingBottom: '2rem',
          }}
        >
          <Welcome />
          <p style={{ color: '#ccc', fontSize: '1.75rem', textAlign: 'center' }}>Thanks for stopping by. Come on in and take a look around.</p>
        </Box>
      </Box>
    </>
  )
}
