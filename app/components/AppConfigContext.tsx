'use client'

import React, { createContext, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'

export interface ClientAppConfig {
  app: {
    baseUrl: string
  }
  api: {
    baseUrl: string
    path: string
  }
}

const defaultClientConfig: ClientAppConfig = {
  app: {
    baseUrl: '',
  },
  api: {
    baseUrl: '',
    path: '/api',
  },
}

const AppConfigContext = createContext<ClientAppConfig>(defaultClientConfig)

export function AppConfigProvider({ children, config }: { children: ReactNode; config: ClientAppConfig }) {
  const value = useMemo(() => config, [config.app.baseUrl, config.api.baseUrl, config.api.path])

  return <AppConfigContext.Provider value={value}>{children}</AppConfigContext.Provider>
}

export function useAppConfig() {
  return useContext(AppConfigContext)
}
