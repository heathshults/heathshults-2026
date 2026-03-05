'use client'

import * as React from 'react'
import { useAppConfig } from '@comp/AppConfigContext'
import { pageData } from '@comp/serveractions'

export interface UseAppDataResult<T> {
  data: T | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useAppData<T = unknown>(filename: string): UseAppDataResult<T> {
  const { app } = useAppConfig()
  const [data, setData] = React.useState<T | null>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<string | null>(null)

  const loadData = React.useCallback(
    async (signal?: AbortSignal) => {
      setIsLoading(true)
      setError(null)

      const result = await pageData<T>(filename, app.baseUrl, signal)
      if (signal?.aborted) return

      if (result === null) {
        setData(null)
        setError(`Failed to load ${filename}.json`)
      } else {
        setData(result)
      }

      setIsLoading(false)
    },
    [app.baseUrl, filename]
  )

  React.useEffect(() => {
    const controller = new AbortController()
    void loadData(controller.signal)

    return () => {
      controller.abort()
    }
  }, [loadData])

  const refetch = React.useCallback(async () => {
    await loadData()
  }, [loadData])

  return {
    data,
    isLoading,
    error,
    refetch,
  }
}
