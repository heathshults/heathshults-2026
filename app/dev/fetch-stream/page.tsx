'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Paper, Box, Card, CardActions, CardContent, Button, Typography, Stack, Grid } from '@mui/material'

const WIKIMEDIA_RECENT_CHANGES_URL = 'https://stream.wikimedia.org/v2/stream/recentchange'
const MAX_EVENTS = 25
const MAX_PAUSED_BUFFER = 100

type StreamStatus = 'idle' | 'connecting' | 'open' | 'error' | 'closed'
type ActorFilter = 'all' | 'human' | 'bot'

interface RecentChangePayload {
  id?: number
  title?: string
  user?: string
  type?: string
  bot?: boolean
  wiki?: string
  server_url?: string
  timestamp?: number
}

interface StreamEventSummary {
  id: string
  title: string
  user: string
  type: string
  bot: boolean
  wiki: string
  timestamp: number
  articleUrl: string | null
}

export interface FetchStreamProps {
  children?: React.ReactNode
}

function buildArticleUrl(payload: RecentChangePayload): string | null {
  if (!payload.server_url || !payload.title) {
    return null
  }

  const normalizedTitle = payload.title.replace(/\s+/g, '_')
  return `${payload.server_url}/wiki/${encodeURIComponent(normalizedTitle)}`
}

function parseRecentChange(data: string): StreamEventSummary | null {
  try {
    const payload = JSON.parse(data) as RecentChangePayload

    if (!payload.title || !payload.user || !payload.type || !payload.timestamp) {
      return null
    }

    return {
      id: String(payload.id ?? `${payload.timestamp}-${payload.title}-${payload.user}`),
      title: payload.title,
      user: payload.user,
      type: payload.type,
      bot: Boolean(payload.bot),
      wiki: payload.wiki ?? 'unknown',
      timestamp: payload.timestamp * 1000,
      articleUrl: buildArticleUrl(payload),
    }
  } catch {
    return null
  }
}

function FetchStream({ children }: FetchStreamProps) {
  const sourceRef = useRef<EventSource | null>(null)
  const isPausedRef = useRef(false)
  const pausedBufferRef = useRef<StreamEventSummary[]>([])

  const [status, setStatus] = useState<StreamStatus>('idle')
  const [events, setEvents] = useState<StreamEventSummary[]>([])
  const [isPaused, setIsPaused] = useState(false)
  const [pausedBufferCount, setPausedBufferCount] = useState(0)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [selectedWiki, setSelectedWiki] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedActor, setSelectedActor] = useState<ActorFilter>('all')

  useEffect(() => {
    isPausedRef.current = isPaused
  }, [isPaused])

  const wikiOptions = useMemo(() => {
    return Array.from(new Set(events.map((eventItem) => eventItem.wiki))).sort()
  }, [events])

  const typeOptions = useMemo(() => {
    return Array.from(new Set(events.map((eventItem) => eventItem.type))).sort()
  }, [events])

  const filteredEvents = useMemo(() => {
    return events.filter((eventItem) => {
      const wikiMatches = selectedWiki === 'all' || eventItem.wiki === selectedWiki
      const typeMatches = selectedType === 'all' || eventItem.type === selectedType
      const actorMatches = selectedActor === 'all' || (selectedActor === 'bot' && eventItem.bot) || (selectedActor === 'human' && !eventItem.bot)

      return wikiMatches && typeMatches && actorMatches
    })
  }, [events, selectedActor, selectedType, selectedWiki])

  const stopStream = useCallback(() => {
    if (sourceRef.current) {
      sourceRef.current.close()
      sourceRef.current = null
    }

    isPausedRef.current = false
    pausedBufferRef.current = []
    setPausedBufferCount(0)
    setIsPaused(false)

    setStatus((previousStatus) => (previousStatus === 'idle' ? 'idle' : 'closed'))
  }, [])

  const clearEvents = useCallback(() => {
    pausedBufferRef.current = []
    setPausedBufferCount(0)
    setEvents([])
  }, [])

  const pauseStream = useCallback(() => {
    isPausedRef.current = true
    setIsPaused(true)
  }, [])

  const resumeStream = useCallback(() => {
    isPausedRef.current = false
    setIsPaused(false)

    if (pausedBufferRef.current.length === 0) {
      return
    }

    const bufferedEvents = pausedBufferRef.current
    pausedBufferRef.current = []
    setPausedBufferCount(0)
    setEvents((currentEvents) => [...bufferedEvents, ...currentEvents].slice(0, MAX_EVENTS))
  }, [])

  const startStream = useCallback(() => {
    stopStream()
    setStatus('connecting')
    setErrorMessage(null)

    const source = new EventSource(WIKIMEDIA_RECENT_CHANGES_URL)
    sourceRef.current = source

    source.onopen = () => {
      setStatus('open')
      setErrorMessage(null)
    }

    source.onmessage = (event) => {
      const nextEvent = parseRecentChange(event.data)

      if (!nextEvent) {
        return
      }

      if (isPausedRef.current) {
        pausedBufferRef.current = [nextEvent, ...pausedBufferRef.current].slice(0, MAX_PAUSED_BUFFER)
        setPausedBufferCount(pausedBufferRef.current.length)
        return
      }

      setEvents((currentEvents) => [nextEvent, ...currentEvents].slice(0, MAX_EVENTS))
    }

    source.onerror = () => {
      // Browsers retry SSE automatically; show that behavior in the UI for learning.
      setStatus('error')
      setErrorMessage('Connection interrupted. EventSource will retry automatically.')
    }
  }, [stopStream])

  useEffect(() => {
    return () => {
      if (sourceRef.current) {
        sourceRef.current.close()
      }
    }
  }, [])

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          width: '100vw',
          minHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
          overflow: 'hidden',
          marginTop: 0, // To offset the fixed header
          backgroundColor: '#0a0a0a', // Black background as fallback for video
        }}
      >
        <section>
          <h2>Wikimedia Recent Changes Stream</h2>
          <p>
            Endpoint:{' '}
            <a href={WIKIMEDIA_RECENT_CHANGES_URL} target="_blank" rel="noreferrer">
              {WIKIMEDIA_RECENT_CHANGES_URL}
            </a>
          </p>

          <div>
            <button type="button" onClick={startStream} disabled={status === 'connecting' || status === 'open'}>
              Start Stream
            </button>{' '}
            <button type="button" onClick={stopStream} disabled={status === 'idle' || status === 'closed'}>
              Stop Stream
            </button>{' '}
            <button type="button" onClick={clearEvents} disabled={events.length === 0}>
              Clear Events
            </button>{' '}
            <button type="button" onClick={pauseStream} disabled={isPaused || (status !== 'open' && status !== 'error')}>
              Pause Intake
            </button>{' '}
            <button type="button" onClick={resumeStream} disabled={!isPaused || (status !== 'open' && status !== 'error')}>
              Resume Intake
            </button>
          </div>

          <p>Status: {status.toUpperCase()}</p>
          <p>Paused: {isPaused ? 'YES' : 'NO'}</p>
          <p>Buffered events: {events.length}</p>
          <p>Paused buffer: {pausedBufferCount}</p>
          <div>
            <label htmlFor="wiki-filter">Wiki filter:</label>{' '}
            <select id="wiki-filter" value={selectedWiki} onChange={(event) => setSelectedWiki(event.target.value)}>
              <option value="all">All wikis</option>
              {wikiOptions.map((wikiValue) => (
                <option key={wikiValue} value={wikiValue}>
                  {wikiValue}
                </option>
              ))}
            </select>{' '}
            <label htmlFor="type-filter">Type filter:</label>{' '}
            <select id="type-filter" value={selectedType} onChange={(event) => setSelectedType(event.target.value)}>
              <option value="all">All event types</option>
              {typeOptions.map((typeValue) => (
                <option key={typeValue} value={typeValue}>
                  {typeValue}
                </option>
              ))}
            </select>{' '}
            <label htmlFor="actor-filter">Actor filter:</label>{' '}
            <select id="actor-filter" value={selectedActor} onChange={(event) => setSelectedActor(event.target.value as ActorFilter)}>
              <option value="all">All actors</option>
              <option value="human">Humans only</option>
              <option value="bot">Bots only</option>
            </select>
          </div>
          <p>
            Showing {filteredEvents.length} of {events.length} events
          </p>
          {errorMessage ? <p>{errorMessage}</p> : null}

          <ol>
            {filteredEvents.map((eventItem) => (
              <li key={eventItem.id}>
                <strong>{eventItem.type}</strong> on <strong>{eventItem.wiki}</strong>: {eventItem.title} by {eventItem.user} ({eventItem.bot ? 'bot' : 'human'}) at{' '}
                {new Date(eventItem.timestamp).toLocaleTimeString()}
                {eventItem.articleUrl ? (
                  <>
                    {' '}
                    <a href={eventItem.articleUrl} target="_blank" rel="noreferrer">
                      view article
                    </a>
                  </>
                ) : null}
              </li>
            ))}
          </ol>

          {children}
        </section>
      </Box>
    </>
  )
}

export default FetchStream
