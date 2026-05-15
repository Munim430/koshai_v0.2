'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

interface NavItem {
  name: string
  namebn: string
  path: string
  icon: (active: boolean) => ReactNode
}

const navItems: NavItem[] = [
  {
    name: 'Home',
    namebn: 'হোম',
    path: '/',
    icon: (active) => (
      <svg
        className={`w-6 h-6 ${active ? 'text-primary' : 'text-muted'}`}
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 16l-7-4m0 0V5m7 4l7-4"
        />
      </svg>
    ),
  },
  {
    name: 'Haat',
    namebn: 'হাট',
    path: '/marketplace',
    icon: (active) => (
      <svg
        className={`w-6 h-6 ${active ? 'text-primary' : 'text-muted'}`}
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    name: 'Koshai',
    namebn: 'কসাই',
    path: '/butcher',
    icon: (active) => (
      <svg
        className={`w-6 h-6 ${active ? 'text-primary' : 'text-muted'}`}
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    name: 'Share',
    namebn: 'শেয়ার',
    path: '/qurbani',
    icon: (active) => (
      <svg
        className={`w-6 h-6 ${active ? 'text-primary' : 'text-muted'}`}
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    name: 'Profile',
    namebn: 'প্রোফাইল',
    path: '/profile',
    icon: (active) => (
      <svg
        className={`w-6 h-6 ${active ? 'text-primary' : 'text-muted'}`}
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border shadow-modal z-50">
      <div className="flex justify-around items-center h-20 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all duration-200 relative group`}
            >
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-b-lg" />
              )}
              <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'scale-100'}`}>
                {item.icon(isActive)}
              </div>
              <span
                className={`text-xs font-semibold transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'text-muted'
                }`}
              >
                {item.namebn}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
