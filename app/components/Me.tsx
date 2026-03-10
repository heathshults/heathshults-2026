'use client'

import * as React from 'react'
import { Paper, Box } from '@mui/material'
import type MePageData from '../types/types.ts'
import { ExperienceTimeline } from './ExperienceTimeline.tsx'
import { useAppData } from '../hooks/useAppData.ts'

export const Me: React.FC = () => {
  const { data, error } = useAppData<MePageData>('me')

  React.useEffect(() => {
    if (!error) return
    console.error('ERROR:', 'failed to fetch data for Me component', error)
  }, [error])

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          width: '100vw',
          height: '100%',
          overflow: 'visible',
          marginTop: 0, // To offset the fixed header
          background: 'url(/img/me/me-bg.jpg)',
          backgroundPosition: 'left top',
          backgroundSize: '100% ',
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
          {/* <source src="/vid/programming-vid.mp4" type="video/mp4" /> */}
          Your browser does not support HTML5 video.
        </video>
        {/* Content overlay */}
        <Box
          component="main"
          className="app-section"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            minHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
            position: 'relative',
            zIndex: 1,
            maxWidth: '90%',
            margin: '0 auto',
            paddingTop: '2rem',
            paddingBottom: '2rem',
            width: '100%',
          }}
        >
          <h2 style={{ color: '#fff', fontSize: '3rem', textAlign: 'center', fontFamily: 'var(--font-permanent-marker)' }}>My Experience{data?.pagename}</h2>
          <Paper sx={{ width: '100%' }}>
            <Box>{data?.content}</Box>
            <Box
              sx={{
                // width: '100%',
                background: 'url(/img/me/travel-map.jpg)',
                backgroundPosition: 'left top',
                backgroundSize: '100%',
                marginBottom: '2rem',
              }}
            >
              <ExperienceTimeline />
            </Box>
          </Paper>
        </Box>
      </Box>
      <Box>
        <Box>{/* bottom content if any*/}</Box>
      </Box>
    </>
  )
}

export default Me

/* 

              <TimelineItem>
                <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
                  Sept. 5, 2005
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot color="primary">
                    <LaptopMacIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <Typography variant="h6" component="span">
                    Bowling Proprietors&apos; Association of America
                  </Typography>
                  <Typography>Web Manager. Managing projects and developing software solutions. Eventually making it all the way to Director in 2007.</Typography>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
                  March 15, 2017
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot color="primary" variant="outlined">
                    <HotelIcon />
                  </TimelineDot>
                  <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <Typography variant="h6" component="span">
                    Blue Star Sports
                  </Typography>
                  <Typography>Design to app conversions, UX Engineering, User Interaction Design. Youth football player tracking database.</Typography>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                  <TimelineDot color="secondary">
                    <RepeatIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <Typography variant="h6" component="span">
                    Fannie Mae
                  </Typography>
                  <Typography>Because this is the life you love!</Typography>
                </TimelineContent>
              </TimelineItem>
            </Timeline>



*/
