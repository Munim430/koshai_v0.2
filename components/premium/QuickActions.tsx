'use client'

import Link from 'next/link'
import { Cow, Scissors, Users } from 'lucide-react'

const actions = [
  {
    icon: Cow,
    label: 'পশু',
    href: '/marketplace',
    color: 'from-[#DA291C] to-[#E85A4F]',
  },
  {
    icon: Scissors,
    label: 'কষাই',
    href: '/butcher',
    color: 'from-[#E85A4F] to-[#F39C12]',
  },
  {
    icon: Users,
    label: 'ভাগে',
    href: '/qurbani',
    color: 'from-[#F39C12] to-[#C49A26]',
  },
]

export function QuickActions() {
  return (
    <div className="flex justify-around items-center gap-4 py-6">
      {actions.map((action) => {
        const Icon = action.icon
        return (
          <Link
            key={action.href}
            href={action.href}
            className="flex flex-col items-center gap-3 group"
          >
            {/* Circular Button */}
            <div
              className={`bg-gradient-to-br ${action.color} w-20 h-20 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-110 active:scale-95 group-hover:rotate-6`}
            >
              <Icon className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            {/* Label */}
            <span className="text-sm font-semibold text-gray-800">{action.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
