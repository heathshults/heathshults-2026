'use client'
import * as React from 'react'
import Nav from './Nav.tsx'
import { Box } from '@mui/material'
import { appFrame } from '../data/appFrame.ts'
import { useHeader } from './HeaderContext.tsx'
import CircleLoader, { ComponentLoader } from '../loading.tsx'

export default function Header() {
  const [loadedPages, setLoadedPages] = React.useState<Set<string>>(new Set())
  const headerContext = useHeader()
  let topValue: string | number = 0
  if (headerContext && !headerContext.showHeader) {
    topValue = '-100px'
  }

  const sectionRefs = React.useMemo(() => {
    const refs: { [key: string]: React.RefObject<HTMLElement | null> } = {}
    appFrame.forEach(({ url }) => {
      const id = url.replace('#', '')
      refs[id] = React.createRef<HTMLElement>()
    })
    return refs
  }, [appFrame])

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

  return (
    <>
      <div className="neoh_fn_modal product_modal">
        <div className="modal_in">
          <div className="modal_closer">
            <a href="#">
              <img src="/svg/cancel.svg" alt="" width={80} height={80} className="fn__svg" />
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
                      <img src="/svg/opensea.svg" width={80} height={80} alt="" className="fn__svg" suppressHydrationWarning />
                    </span>
                    <span className="text">View on OpenSea</span>
                  </a>
                  <a href="https://discord.com/" target="_blank" className="neoh_fn_button discord" suppressHydrationWarning>
                    <span className="icon" suppressHydrationWarning>
                      <img src="/svg/discord.svg" alt="" width={80} height={80} className="fn__svg" suppressHydrationWarning />
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
      {appFrame.map(({ page, url, component: SectionComponent }) => {
        const id = url.replace('#', '')
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
    </>
  )
}
