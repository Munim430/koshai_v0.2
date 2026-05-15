'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const [showChat, setShowChat] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-surface border-b border-border shadow-card">
        <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-primary">কষাই</div>
            <span className="text-xs font-semibold text-muted uppercase">Premium</span>
          </Link>

          {/* Chat Icon */}
          <button
            onClick={() => setShowChat(!showChat)}
            className="relative p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
            aria-label="Chat"
          >
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            {/* Notification dot */}
            <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse-ring" />
          </button>
        </div>
      </header>

      {/* Chat Modal Overlay */}
      {showChat && (
        <div
          className="fixed inset-0 z-30 bg-black/50 transition-opacity duration-200"
          onClick={() => setShowChat(false)}
        />
      )}
    </>
  )
}
