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
      // Delay showing prompt to not interrupt user
      setTimeout(() => setShowPrompt(true), 3000)
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

  if (!showPrompt || !deferredPrompt) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-fade-in transition-opacity duration-200"
        onClick={() => setShowPrompt(false)}
      />

      {/* Bottom Sheet Modal */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface rounded-t-lg shadow-modal z-50 animate-slide-up">
        <div className="max-w-md mx-auto px-4 py-6">
          {/* Close Button */}
          <button
            onClick={() => setShowPrompt(false)}
            className="absolute top-3 right-3 p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-muted" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Content */}
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">📱</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">কষাই অ্যাপ যোগ করুন</h2>
            <p className="text-sm text-muted">আপনার হোম স্ক্রিনে কষাই অ্যাপ ইনস্টল করুন এবং অফলাইনে ব্যবহার করুন।</p>
          </div>

          {/* Features */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">✓</span>
              <span className="text-sm text-foreground">অফলাইনে অ্যাক্সেস করুন</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">✓</span>
              <span className="text-sm text-foreground">দ্রুত লোড হয়</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">✓</span>
              <span className="text-sm text-foreground">স্থান কম খায়</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={handleInstall}
              className="btn-primary w-full text-center"
            >
              এখনই ইনস্টল করুন
            </button>
            <button
              onClick={() => setShowPrompt(false)}
              className="btn-ghost w-full text-center"
            >
              পরে করব
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
