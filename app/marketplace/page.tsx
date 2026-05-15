'use client'

import Link from 'next/link'
import { AnimalListings } from '@/components/marketplace/AnimalListings'

export default function MarketplacePage() {
  return (
    <main className="pt-20 pb-24">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-primary">গবাদি পশু বাজার</h2>
          <Link href="/marketplace/create" className="bg-primary text-white px-3 py-2 rounded-lg text-sm font-medium">
            যোগ করুন
          </Link>
        </div>
        <AnimalListings />
      </div>
    </main>
  )
}
