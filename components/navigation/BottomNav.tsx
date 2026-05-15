'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChatWidget } from '@/components/chat/ChatWidget'

interface NavItem {
  name: string
  path: string
  icon: string
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/', icon: '🏠' },
  { name: 'Market', path: '/marketplace', icon: '🐄' },
  { name: 'Butcher', path: '/butcher', icon: '🔪' },
  { name: 'Qurbani', path: '/qurbani', icon: '📍' },
  { name: 'Profile', path: '/profile', icon: '👤' },
]

export function BottomNav() {
  const pathname = usePathname()
  const [showChat, setShowChat] = useState(false)

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-secondary flex justify-around items-center h-20 z-50">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all ${
              pathname === item.path
                ? 'text-primary border-t-2 border-primary'
                : 'text-foreground hover:bg-secondary'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Chat Toggle Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed top-20 right-4 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center z-40 hover:bg-opacity-90 shadow-lg"
        title="চ্যাট খুলুন"
      >
        💬
      </button>

      {/* Chat Widget */}
      {showChat && <ChatWidget />}
    </>
  )
}
