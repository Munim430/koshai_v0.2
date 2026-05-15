'use client'

import Link from 'next/link'
import { ButcherListings } from '@/components/butcher/ButcherListings'

export default function ButcherPage() {
  return (
    <main className="pt-20 pb-24">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-primary">কসাই সেবা</h2>
          <Link href="/butcher/create" className="bg-primary text-white px-3 py-2 rounded-lg text-sm font-medium">
            যুক্ত করুন
          </Link>
        </div>
        <ButcherListings />
      </div>
    </main>
  )
}
