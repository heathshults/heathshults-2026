import { useEffect, useState } from 'react'

/**
 * Hook to dynamically set section height based on scrollHeight vs viewport
 * If scrollHeight < 100vh, set height to 100vh
 * Otherwise, set height to scrollHeight
 */
export function useContentHeight(ref: React.RefObject<HTMLElement | null>) {
  const [height, setHeight] = useState<string>('100vh')

  useEffect(() => {
    if (!ref.current) return

    const updateHeight = () => {
      const element = ref.current
      if (!element) return

      const scrollHeight = element.scrollHeight
      const viewportHeight = window.innerHeight

      // If content is smaller than viewport, use 100vh; otherwise use scrollHeight
      const newHeight = scrollHeight < viewportHeight ? '100vh' : `${scrollHeight}px`
      setHeight(newHeight)
    }

    // Update on mount and after a small delay to let content render
    updateHeight()
    const timeoutId = setTimeout(updateHeight, 100)

    // Use ResizeObserver to track when content changes size
    const resizeObserver = new ResizeObserver(updateHeight)
    resizeObserver.observe(ref.current)

    // Also listen to window resize
    window.addEventListener('resize', updateHeight)

    return () => {
      clearTimeout(timeoutId)
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateHeight)
    }
  }, [ref])

  return height
}
