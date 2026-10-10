import { useState, useCallback, useEffect } from "react"
import { useLocation } from "wouter"
import Preloader from "@/components/ui/preloader"

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [pathname] = useLocation()
  const [showPreloader, setShowPreloader] = useState(true)
  const [shouldShowContent, setShouldShowContent] = useState(false)

  useEffect(() => {
    // Only show preloader on home page ("/")
    if (pathname !== "/") {
      setShowPreloader(false)
      setShouldShowContent(true)
      return
    }

    // Check if preloader has been shown in this session for home page
    const hasShownPreloader = sessionStorage.getItem('preloader-shown')
    
    if (hasShownPreloader) {
      // Skip preloader, show content immediately
      setShowPreloader(false)
      setShouldShowContent(true)
    }
    // If no session flag, keep showPreloader true (default)
  }, [pathname])

  const handleComplete = useCallback(() => {
    // Mark preloader as shown for this session
    sessionStorage.setItem('preloader-shown', 'true')
    setShowPreloader(false)
    setShouldShowContent(true)
  }, [])

  return (
    <>
      {showPreloader && <Preloader onComplete={handleComplete} />}
      {shouldShowContent && children}
    </>
  )
}
