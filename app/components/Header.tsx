'use client'
import * as React from 'react'
import Nav from './Nav.tsx'
import Image from 'next/image'
import { Box, Stack } from '@mui/material'
import { appFrame } from '../data/appFrame.ts'
import { useHeader } from './HeaderContext.tsx'
import CircleLoader from '../loading.tsx'

function normalizePath(pathname: string) {
  if (!pathname) {
    return '/'
  }

  return pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

export default function Header() {
  const [loadedPages, setLoadedPages] = React.useState<Set<string>>(new Set())
  const headerContext = useHeader()
  let topValue: string | number = 0
  if (headerContext && !headerContext.showHeader) {
    topValue = '-100px'
  }

  const sectionRefs = React.useMemo(() => {
    const refs: { [key: string]: React.RefObject<HTMLElement | null> } = {}
    appFrame.forEach(({ id }) => {
      refs[id] = React.createRef<HTMLElement>()
    })
    return refs
  }, [])

  const sectionPathMap = React.useMemo(() => {
    const map = new Map<string, string>()

    appFrame.forEach(({ id, path }) => {
      map.set(id, normalizePath(path))
    })

    // Keep root URL valid and treat it as Home.
    map.set('home', '/home')

    return map
  }, [])

  const pathToSectionId = React.useMemo(() => {
    const map = new Map<string, string>()

    appFrame.forEach(({ id, path }) => {
      map.set(normalizePath(path), id)
    })

    // Support the root URL by mapping it to Home.
    map.set('/', 'home')

    return map
  }, [])

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            setLoadedPages((prev) => new Set(prev).add(sectionId))
          }
        })
      },
      { threshold: 0.1 }
    )

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => observer.disconnect()
  }, [sectionRefs])

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const scrollToPathTarget = () => {
      const hashId = window.location.hash.replace('#', '')
      const targetId = hashId || pathToSectionId.get(normalizePath(window.location.pathname)) || 'home'

      if (!targetId) {
        return
      }

      const targetRef = sectionRefs[targetId]
      if (targetRef?.current) {
        targetRef.current.scrollIntoView({ behavior: 'smooth' })
      }

      const targetPath = sectionPathMap.get(targetId)
      if (targetPath && normalizePath(window.location.pathname) !== targetPath) {
        window.history.replaceState(window.history.state, '', targetPath)
      }
    }

    scrollToPathTarget()
    window.addEventListener('popstate', scrollToPathTarget)
    window.addEventListener('hashchange', scrollToPathTarget)

    return () => {
      window.removeEventListener('popstate', scrollToPathTarget)
      window.removeEventListener('hashchange', scrollToPathTarget)
    }
  }, [pathToSectionId, sectionPathMap, sectionRefs])

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!activeEntry) {
          return
        }

        const nextPath = sectionPathMap.get(activeEntry.target.id)
        if (!nextPath) {
          return
        }

        if (normalizePath(window.location.pathname) !== nextPath) {
          window.history.replaceState(window.history.state, '', nextPath)
        }
      },
      {
        root: null,
        // Use a center slice so hash changes when a section is the active viewport focus.
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0,
      }
    )

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => observer.disconnect()
  }, [sectionPathMap, sectionRefs])

  return (
    <>
      <div className="neoh_fn_modal product_modal">
        <div className="modal_in">
          <div className="modal_closer">
            <a href="#">
              <Image src="/svg/cancel.svg" alt="" width={80} height={80} className="fn__svg" />
              {/* <img src="/svg/cancel.svg" alt="" width={80} height={80} className="fn__svg" /> */}
            </a>
          </div>
          <div className="modal_content">
            <div className="neoh_fn_product_modal">
              <div className="img_item">{/* <!-- product image --> */}</div>
              <div className="content_item">
                <div className="neoh_fn_title" data-align="left">
                  <h3 className="fn_title">{/* product title */}</h3>
                  <div className="line">
                    <span></span>
                  </div>
                </div>
                <div className="desc">
                  <p>{/* product description */}</p>
                </div>
                <div className="buttons">
                  <a href="https://opensea.io/" target="_blank" className="neoh_fn_button opensea" suppressHydrationWarning>
                    <span className="icon" suppressHydrationWarning>
                      <Image src="/svg/opensea.svg" width={80} height={80} alt="" className="fn__svg" suppressHydrationWarning />
                    </span>
                    <span className="text">View on OpenSea</span>
                  </a>
                  <a href="https://discord.com/" target="_blank" className="neoh_fn_button discord" suppressHydrationWarning>
                    <span className="icon" suppressHydrationWarning>
                      <Image src="/svg/discord.svg" alt="" width={80} height={80} className="fn__svg" suppressHydrationWarning />
                    </span>
                    <span className="text">View on Discord</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Box sx={{ position: 'fixed', top: topValue, left: 0, width: '100vw', height: '100px', zIndex: 1300, transition: 'all 0.25s ease-in-out' }}>
        <Nav sectionRefs={sectionRefs} />
      </Box>
      <Stack>
        {appFrame.map(({ page, id, component: SectionComponent }) => {
          const isLoaded = loadedPages.has(id)
          return (
            <Box key={page} component="section" id={id} ref={sectionRefs[id]} sx={{ minHeight: '100vh', width: '100vw' }}>
              {isLoaded && (
                <React.Suspense fallback={<CircleLoader />}>
                  <SectionComponent />
                </React.Suspense>
              )}
            </Box>
          )
        })}
      </Stack>
    </>
  )
}
