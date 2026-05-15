'use client'

import { useEffect } from 'react'

export function ErrorBoundary({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('[v0] Global error:', error)
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('[v0] Unhandled promise rejection:', event.reason)
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  return <>{children}</>
}
