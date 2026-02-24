import * as React from 'react'
import { Button, Box, Typography, Stack } from '@mui/material'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineDot from '@mui/lab/TimelineDot'
import LaptopMacIcon from '@mui/icons-material/LaptopMac'
import HotelIcon from '@mui/icons-material/Hotel'
import RepeatIcon from '@mui/icons-material/Repeat'
import SchoolIcon from '@mui/icons-material/School'
import WorkIcon from '@mui/icons-material/Work'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import { pageData } from './serveractions.ts'

export const ExperienceTimeline: React.FC = () => {
  const [data, setData] = React.useState<MePageData>()
  const timelineData = React.useRef([])

  React.useEffect(() => {
    if (data) return

    async function getData() {
      await pageData('me')
        .then((data) => {
          setData(data)
          console.log('DATA:', data)
        })
        .catch((err) => {
          console.error('ERROR:', 'failed to fetch data for Me component', err)
        })
    }
    if (!data) {
      const fetchit = async () => await getData()
      fetchit()
    }
  }, [])

  return (
    <Box>
      <Timeline position="alternate">
        <TimelineItem position="alternate">
          <TimelineItem>
            <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary"></TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="error">
                <RocketLaunchIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>

            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography variant="h6" component="span"></Typography>
            </TimelineContent>
          </TimelineItem>
          {/*Top rocket ^ */}

          {data?.timeline.map((item, index) => {
            return (
              <>
                <TimelineItem key={`${item.jobtitle}-${index}`}>
                  <TimelineItem>
                    <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
                      <Stack>
                        {item.date}
                        {item.jobtitle}
                      </Stack>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="primary">{item.icon}</TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                      <Typography variant="h6" component="span">
                        {item.title}
                      </Typography>
                      <Typography>{item.description}</Typography>
                    </TimelineContent>
                  </TimelineItem>
                </TimelineItem>
              </>
            )
          })}
        </TimelineItem>
      </Timeline>
    </Box>
  )
}

export default ExperienceTimeline
