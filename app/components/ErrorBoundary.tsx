'use client'

import * as React from 'react'
import type { ReactNode } from 'react'
import { Box, Paper, Button, Typography, Collapse, Alert } from '@mui/material'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return <ErrorDisplay error={this.state.error} onReset={this.resetError} />
    }

    return this.props.children
  }
}

function ErrorDisplay({ error, onReset }: { error: Error; onReset: () => void }) {
  const [stackExpanded, setStackExpanded] = React.useState(false)

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#010101',
        padding: 2,
      }}
    >
      <Paper
        sx={{
          padding: 3,
          maxWidth: '600px',
          width: '100%',
          backgroundColor: '#333',
          borderLeft: '4px solid #ff6b6b',
        }}
      >
        <Alert severity="error">
          <Typography variant="h5" sx={{ color: '#d32f2f', marginBottom: 1, fontWeight: 'bold' }}>
            Something went wrong
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#fff',
              marginBottom: 2,
              fontFamily: 'monospace',
              padding: 1.5,
              backgroundColor: '#333',
              borderRadius: 1,
              wordBreak: 'break-word',
            }}
          >
            {error.message}
          </Typography>

          <Box sx={{ marginBottom: 2 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setStackExpanded(!stackExpanded)}
              sx={{
                textTransform: 'none',
                marginBottom: 1,
              }}
            >
              {stackExpanded ? '▼' : '▶'} Stack Trace
            </Button>

            <Collapse in={stackExpanded}>
              <Typography
                component="pre"
                variant="caption"
                sx={{
                  display: 'block',
                  // color: '#666',
                  // backgroundColor: '#f5f5f5',
                  padding: 1.5,
                  borderRadius: 1,
                  overflow: 'auto',
                  maxHeight: '300px',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {error.stack}
              </Typography>
            </Collapse>
          </Box>

          <Button variant="contained" onClick={onReset} sx={{ marginRight: 1 }}>
            Try again
          </Button>

          <Button
            variant="outlined"
            href="/"
            sx={{
              textDecoration: 'none',
            }}
          >
            Go home
          </Button>
        </Alert>
      </Paper>
    </Box>
  )
}
