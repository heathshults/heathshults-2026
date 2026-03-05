import React, { lazy } from 'react'
import type { JSX } from 'react/jsx-runtime'
export type AppSection = {
  page: string
  url: string
  component: React.LazyExoticComponent<React.ComponentType<React.FC | JSX.Element | any>>
}

export const appFrame: AppSection[] = [
  { page: 'Home', url: '#home', component: lazy(() => import('@comp/Home')) },
  { page: 'Me', url: '#experience', component: lazy(() => import('@comp/Me')) },
  { page: 'Skills', url: '#skills', component: lazy(() => import('@comp/Skills')) },
  { page: 'Portfolio', url: '#portfolio', component: lazy(() => import('@comp/Portfolio')) },
  { page: 'Contact', url: '#contact', component: lazy(() => import('@comp/Contact')) },
]

export default appFrame
