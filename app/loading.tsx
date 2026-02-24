'use client'
import * as React from 'react'
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} size={60} thickness={4} sx={{ color: '#fff' }} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" sx={{ color: '#fff', fontWeight: 'bold' }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  )
}

interface ComponentLoaderProps {
  targetRef?: React.RefObject<HTMLElement>
  showPercentage?: boolean
}

export function ComponentLoader({ targetRef, showPercentage = true }: ComponentLoaderProps): JSX.Element {
  const [progress, setProgress] = React.useState(0)
  const [size, setSize] = React.useState({ width: 0, height: 0 })
  const [minTimeElapsed, setMinTimeElapsed] = React.useState(false)
  const loaderRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    // Ensure loader displays for at least 2 seconds
    const minDisplayTimer = setTimeout(() => {
      setMinTimeElapsed(true)
    }, 2000)

    return () => clearTimeout(minDisplayTimer)
  }, [])

  React.useEffect(() => {
    // Smooth progress animation
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const increment = prevProgress < 70 ? 15 : 5
        const newProgress = prevProgress + increment
        // Cap at 90% until minimum time has elapsed
        if (!minTimeElapsed && newProgress >= 90) {
          return 90
        }
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 300)

    return () => clearInterval(timer)
  }, [minTimeElapsed])

  React.useEffect(() => {
    const elementToObserve = targetRef?.current || loaderRef.current
    if (!elementToObserve) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setSize({ width, height })
        
        // Update progress based on size changes
        if (width > 0 && height > 0) {
          setProgress((prev) => Math.max(prev, 80))
        }
      }
    })

    resizeObserver.observe(elementToObserve)

    return () => {
      resizeObserver.disconnect()
    }
  }, [targetRef])

  return (
    <Box
      ref={loaderRef}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',
        zIndex: 9999,
        gap: 2,
      }}
    >
      {showPercentage ? (
        <CircularProgressWithLabel value={progress} />
      ) : (
        <CircularProgress size={60} thickness={4} sx={{ color: '#fff' }} />
      )}
      <Typography variant="body2" sx={{ color: '#fff', mt: 1 }}>
        Loading content...
        {size.width > 0 && (
          <span style={{ fontSize: '0.75rem', display: 'block', marginTop: '4px', opacity: 0.7 }}>
            {Math.round(size.width)} × {Math.round(size.height)}px
          </span>
        )}
      </Typography>
    </Box>
  )
}

export default function CircleLoader(): JSX.Element {
  return <ComponentLoader showPercentage={true} />
}
