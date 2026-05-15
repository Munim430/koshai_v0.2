'use client'

import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        console.log('[v0] PWA installed')
      }
      setDeferredPrompt(null)
      setShowPrompt(false)
    }
  }

  if (!showPrompt) return null

  return (
    <div className="fixed top-20 left-4 right-4 bg-primary text-white p-4 rounded-lg shadow-lg z-40 max-w-sm">
      <p className="text-sm font-medium mb-3">KOSHAI কে আপনার হোম স্ক্রিনে যোগ করুন!</p>
      <div className="flex gap-2">
        <button
          onClick={handleInstall}
          className="flex-1 bg-white text-primary px-3 py-2 rounded-lg text-sm font-bold hover:bg-opacity-90"
        >
          যুক্ত করুন
        </button>
        <button
          onClick={() => setShowPrompt(false)}
          className="flex-1 bg-primary/50 text-white px-3 py-2 rounded-lg text-sm font-bold hover:bg-opacity-75"
        >
          এখনে না
        </button>
      </div>
    </div>
  )
}
