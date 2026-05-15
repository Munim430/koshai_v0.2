'use client'

import { Bell } from 'lucide-react'
import { KoshaiLogo } from './KoshaiLogo'

export function PremiumHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass mx-auto max-w-md">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <KoshaiLogo />
          <div>
            <div className="text-lg font-bold text-[#DA291C]">কষাই</div>
            <div className="text-xs text-gray-600">প্রিমিয়াম</div>
          </div>
        </div>

        {/* Notification Bell */}
        <button className="relative p-2 hover:bg-white/20 rounded-full transition-all duration-200 active:scale-90">
          <Bell className="w-5 h-5 text-[#DA291C]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#DA291C] rounded-full animate-pulse" />
        </button>
      </div>
    </header>
  )
}
