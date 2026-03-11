import { act, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import FetchStream from './FetchStream'

interface MockRecentChangeEvent {
  id: number
  title: string
  user: string
  type: string
  bot: boolean
  wiki: string
  server_url: string
  timestamp: number
}

class MockEventSource {
  static instances: MockEventSource[] = []

  readonly url: string
  onopen: ((event: Event) => void) | null = null
  onmessage: ((event: MessageEvent<string>) => void) | null = null
  onerror: ((event: Event) => void) | null = null
  closeCalls = 0

  constructor(url: string) {
    this.url = url
    MockEventSource.instances.push(this)
  }

  static reset() {
    MockEventSource.instances = []
  }

  emitOpen() {
    this.onopen?.(new Event('open'))
  }

  emitMessage(data: string) {
    this.onmessage?.({ data } as MessageEvent<string>)
  }

  emitError() {
    this.onerror?.(new Event('error'))
  }

  close() {
    this.closeCalls += 1
  }
}

const originalEventSource = globalThis.EventSource

function createRecentChangeEvent(overrides: Partial<MockRecentChangeEvent> = {}): string {
  const payload: MockRecentChangeEvent = {
    id: 1,
    title: 'Main Page',
    user: 'EditorOne',
    type: 'edit',
    bot: false,
    wiki: 'enwiki',
    server_url: 'https://en.wikipedia.org',
    timestamp: 1_742_073_600,
    ...overrides,
  }

  return JSON.stringify(payload)
}

function getLatestSource(): MockEventSource {
  const latestSource = MockEventSource.instances.at(-1)

  if (!latestSource) {
    throw new Error('No EventSource instance was created')
  }

  return latestSource
}

describe('FetchStream', () => {
  beforeEach(() => {
    MockEventSource.reset()
    globalThis.EventSource = MockEventSource as unknown as typeof EventSource
  })

  afterAll(() => {
    globalThis.EventSource = originalEventSource
  })

  it('renders stream practice UI', () => {
    render(<FetchStream />)

    expect(screen.getByRole('heading', { name: /wikimedia recent changes stream/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /start stream/i })).toBeTruthy()
    expect(screen.getByText(/status:/i)).toBeTruthy()
    expect(screen.getByLabelText(/wiki filter/i)).toBeTruthy()
  })

  it('applies wiki, event type, and actor filters', () => {
    render(<FetchStream />)

    fireEvent.click(screen.getByRole('button', { name: /start stream/i }))

    const source = getLatestSource()

    act(() => {
      source.emitOpen()
      source.emitMessage(createRecentChangeEvent({ id: 1, title: 'Human Edit', wiki: 'enwiki', type: 'edit', bot: false }))
      source.emitMessage(createRecentChangeEvent({ id: 2, title: 'Bot Edit', wiki: 'enwiki', type: 'edit', bot: true, user: 'UpdateBot' }))
      source.emitMessage(createRecentChangeEvent({ id: 3, title: 'French New', wiki: 'frwiki', type: 'new', bot: false, user: 'FrEditor' }))
    })

    expect(screen.getByText(/showing 3 of 3 events/i)).toBeTruthy()

    fireEvent.change(screen.getByLabelText(/wiki filter/i), { target: { value: 'enwiki' } })
    expect(screen.getByText(/showing 2 of 3 events/i)).toBeTruthy()

    fireEvent.change(screen.getByLabelText(/type filter/i), { target: { value: 'edit' } })
    expect(screen.getByText(/showing 2 of 3 events/i)).toBeTruthy()

    fireEvent.change(screen.getByLabelText(/actor filter/i), { target: { value: 'bot' } })
    expect(screen.getByText(/showing 1 of 3 events/i)).toBeTruthy()
    expect(screen.getByText(/bot edit/i)).toBeTruthy()
    expect(screen.queryByText(/human edit/i)).toBeNull()
  })

  it('buffers incoming events while paused and flushes them on resume', () => {
    render(<FetchStream />)

    fireEvent.click(screen.getByRole('button', { name: /start stream/i }))
    const source = getLatestSource()

    act(() => {
      source.emitOpen()
    })

    fireEvent.click(screen.getByRole('button', { name: /pause intake/i }))

    act(() => {
      source.emitMessage(createRecentChangeEvent({ id: 7, title: 'Paused Event' }))
    })

    expect(screen.getByText(/paused: yes/i)).toBeTruthy()
    expect(screen.getByText(/paused buffer: 1/i)).toBeTruthy()
    expect(screen.queryByText(/paused event/i)).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: /resume intake/i }))

    expect(screen.getByText(/paused: no/i)).toBeTruthy()
    expect(screen.getByText(/paused buffer: 0/i)).toBeTruthy()
    expect(screen.getByText(/paused event/i)).toBeTruthy()
  })

  it('shows a stream error message when the connection fails', () => {
    render(<FetchStream />)

    fireEvent.click(screen.getByRole('button', { name: /start stream/i }))
    const source = getLatestSource()

    act(() => {
      source.emitOpen()
      source.emitError()
    })

    expect(screen.getByText(/connection interrupted/i)).toBeTruthy()
    expect(screen.getByText(/status: error/i)).toBeTruthy()
  })
})
