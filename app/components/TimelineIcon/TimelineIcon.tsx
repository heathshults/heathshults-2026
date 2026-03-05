import * as React from 'react'
import WorkIcon from '@mui/icons-material/Work'

export interface TimelineIconProps {
  icon: HTMLElement | React.ReactNode
}

function TimelineIcon({ icon }: TimelineIconProps) {
  return <>{icon === 'WorkIcon' ? <WorkIcon /> : null}</>
}

export default TimelineIcon
