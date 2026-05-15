'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  ShoppingBag,
  Knife,
  Share2,
  User,
} from 'lucide-react'
import type { ReactNode } from 'react'

interface NavItem {
  namebn: string
  path: string
  icon: (active: boolean) => ReactNode
}

const navItems: NavItem[] = [
  {
    namebn: 'হোম',
    path: '/',
    icon: (active) => (
      <Home
        className={`w-6 h-6 ${
          active ? 'text-[#DA291C]' : 'text-gray-600'
        }`}
        fill={active ? 'currentColor' : 'none'}
      />
    ),
  },
  {
    namebn: 'পশু',
    path: '/marketplace',
    icon: (active) => (
      <ShoppingBag
        className={`w-6 h-6 ${
          active ? 'text-[#DA291C]' : 'text-gray-600'
        }`}
        fill={active ? 'currentColor' : 'none'}
      />
    ),
  },
  {
    namebn: 'কষাই',
    path: '/butcher',
    icon: (active) => (
      <Knife
        className={`w-6 h-6 ${
          active ? 'text-[#DA291C]' : 'text-gray-600'
        }`}
        fill={active ? 'currentColor' : 'none'}
      />
    ),
  },
  {
    namebn: 'ভাগে',
    path: '/qurbani',
    icon: (active) => (
      <Share2
        className={`w-6 h-6 ${
          active ? 'text-[#DA291C]' : 'text-gray-600'
        }`}
        fill={active ? 'currentColor' : 'none'}
      />
    ),
  },
  {
    namebn: 'প্রোফাইল',
    path: '/profile',
    icon: (active) => (
      <User
        className={`w-6 h-6 ${
          active ? 'text-[#DA291C]' : 'text-gray-600'
        }`}
        fill={active ? 'currentColor' : 'none'}
      />
    ),
  },
]

export function PremiumBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 glass rounded-full px-3 py-3 shadow-2xl max-w-xs mx-auto">
      <div className="flex justify-around items-center gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-300 hover:bg-white/30 active:scale-90"
            >
              <div
                className={`transition-transform duration-300 ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}
              >
                {item.icon(isActive)}
              </div>
              <span
                className={`text-xs font-bold transition-colors duration-300 ${
                  isActive ? 'text-[#DA291C]' : 'text-gray-600'
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
