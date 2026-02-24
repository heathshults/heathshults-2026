'use client'
import React, { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
interface HeaderContextType {
  showHeader: boolean
  setShowHeader: (value: boolean) => void
}

const headerContextVariables: HeaderContextType = {
  showHeader: true,
  setShowHeader: () => {},
}

const HeaderContext = createContext<HeaderContextType | undefined>(headerContextVariables)

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [showHeader, setShowHeader] = useState<boolean>(true)
  const contextValues = React.useMemo<HeaderContextType>(
    () => ({
      showHeader,
      setShowHeader,
    }),
    [showHeader]
  )
  return <HeaderContext.Provider value={contextValues}>{children}</HeaderContext.Provider>
}

export function useHeader() {
  const context = useContext(HeaderContext)
  if (!context) {
    throw new Error('useHeader must be used within HeaderProvider')
  }
  return context
}
