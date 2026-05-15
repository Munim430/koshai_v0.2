'use client'

import Link from 'next/link'
import { QurbaniListings } from '@/components/qurbani/QurbaniListings'

export default function QurbaniPage() {
  return (
    <main className="pt-20 pb-24">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-primary">কোরবানি শেয়ারিং</h2>
          <Link href="/qurbani/create" className="bg-primary text-white px-3 py-2 rounded-lg text-sm font-medium">
            যুক্ত করুন
          </Link>
        </div>
        <QurbaniListings />
      </div>
    </main>
  )
}
