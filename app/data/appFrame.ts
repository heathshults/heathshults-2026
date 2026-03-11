import React, { lazy } from 'react'
import type { JSX } from 'react/jsx-runtime'
export type AppSection = {
  page: string
  id: string
  path: string
  component: React.LazyExoticComponent<React.ComponentType<React.FC | JSX.Element | any>>
}

export const appFrame: AppSection[] = [
  { page: 'Home', id: 'home', path: '/home', component: lazy(() => import('@comp/Home')) },
  { page: 'Me', id: 'me', path: '/me', component: lazy(() => import('@comp/Me')) },
  { page: 'Skills', id: 'skills', path: '/skills', component: lazy(() => import('@comp/Skills')) },
  { page: 'Portfolio', id: 'portfolio', path: '/portfolio', component: lazy(() => import('@comp/Portfolio')) },
  { page: 'Fetch Stream', id: 'fetchstream', path: '/fetch-stream', component: lazy(() => import('../dev/fetch-stream/page')) },
  { page: 'Contact', id: 'contact', path: '/contact', component: lazy(() => import('@comp/Contact')) },
]

export default appFrame
