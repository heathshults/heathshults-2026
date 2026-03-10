import * as React from 'react'
import { Button, Box, Typography, Stack } from '@mui/material'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineDot from '@mui/lab/TimelineDot'
import SchoolIcon from '@mui/icons-material/School'

import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import pageData from '../data/me.json'
import type { MePageData } from '../types/types.ts'
import TimelineIcon from './TimelineIcon/TimelineIcon'

export const ExperienceTimeline: React.FC = () => {
  const [data, setData] = React.useState<MePageData>(pageData)

  React.useEffect(() => {
    if (!data) {
      setData(pagedata)
    }

    // async function getData() {
    //   try {
    //     const importedData = React.lazy(() => import('../data/me.json'))
    //     // The JSON is wrapped in an array, extract the first element
    //     setData(importedData.default[0])
    //     console.log('DATA:', importedData.default[0])
    //   } catch (err) {
    //     console.error('ERROR:', 'failed to fetch data for ExperienceTimeline', err)
    //   }
    // }
    // if (!data) {
    //   getData()
    // }
  }, [data])

  return (
    <Box sx={{ width: '100%', overflow: 'visible', display: 'flex', justifyContent: 'center' }}>
      <Timeline position="alternate" sx={{ width: '100%', maxWidth: '900px', padding: 0 }}>
        <TimelineItem position="alternate">
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="error" sx={{ width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RocketLaunchIcon sx={{ fontSize: 40 }} />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>

          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span"></Typography>
          </TimelineContent>
        </TimelineItem>
        {/*Top rocket ^ */}

        {pageData[0].timeline.map((item, index) => (
          <TimelineItem key={`${item.jobtitle}-${index}`}>
            <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
              <Stack>
                <span style={{ maxWidth: '150px', backgroundColor: 'rgba(0, 0, 0, 0.8)', padding: '1rem', borderRadius: '8px' }}>
                  <div>{item.date}</div>
                  <div>{item.location}</div>
                </span>
              </Stack>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary" sx={{ width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TimelineIcon icon={item.icon} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', padding: '1rem', borderRadius: '8px' }}>
                <Typography variant="h6" component="span">
                  <div style={{ fontWeight: 400, backgroundColor: 'rgba(0, 0, 0, 0.8)', color: '#ffcc7a', padding: '6px 4px' }}>{item.title}</div>
                  <div>
                    <span style={{ fontWeight: 400, fontSize: '1rem' }}> {item.jobtitle}</span>
                  </div>
                  <div style={{ paddingTop: '1rem' }}>
                    <span style={{ fontWeight: 400, fontSize: '0.875rem', marginTop: '1rem', color: '#ffcc7a' }}>Project(s): </span>
                    <div style={{ fontWeight: 400, fontSize: '0.75rem' }}>{item.projects}</div>
                  </div>
                </Typography>
                <Typography sx={{ mt: 2, fontSize: '0.875rem' }}>#{item.description}</Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  )
}

export default ExperienceTimeline
