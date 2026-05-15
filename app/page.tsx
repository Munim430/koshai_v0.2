'use client'

import Link from 'next/link'
import { CountdownWidget } from '@/components/ui/CountdownWidget'
import { DealCard } from '@/components/ui/DealCard'

export default function Home() {
  const bestDeals = [
    { id: 1, title: 'স্বাস্থ্যকর রংধনু গরু', price: 85000, location: 'ঢাকা', badge: 'বিশেষ ছাড়' },
    { id: 2, title: 'দেশী ভেড়া', price: 28000, location: 'চট্টগ্রাম', badge: 'জনপ্রিয়' },
    { id: 3, title: 'পাঠা ছাগল', price: 35000, location: 'সিলেট', badge: 'নতুন' },
  ]

  return (
    <main className="pt-20 pb-24">
      {/* Gradient Hero Banner */}
      <div className="gradient-warm text-white px-4 py-8 mb-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-2">কষাই</h1>
          <p className="text-red-100 text-sm">বাংলাদেশের বিশ্বস্ত পশু বাজারপ্লেস</p>
        </div>
      </div>

      <div className="px-4 max-w-md mx-auto space-y-6">
        {/* Countdown Widget */}
        <CountdownWidget />

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/marketplace" className="btn-primary text-center">
            🐄 পশু খুঁজুন
          </Link>
          <Link href="/butcher" className="btn-secondary text-center">
            🔪 কসাই যোগাযোগ করুন
          </Link>
          <Link href="/qurbani" className="btn-secondary col-span-2 text-center">
            📍 কোরবানি শেয়ার করুন
          </Link>
        </div>

        {/* Best Deals Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">সেরা ডিল</h2>
            <Link href="/marketplace" className="text-primary text-sm font-semibold hover:underline">
              সব দেখুন →
            </Link>
          </div>
          
          <div className="overflow-x-auto pb-2 -mx-4 px-4">
            <div className="flex gap-3">
              {bestDeals.map((deal) => (
                <DealCard
                  key={deal.id}
                  title={deal.title}
                  price={deal.price}
                  location={deal.location}
                  badge={deal.badge}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-foreground">কেন কষাই?</h3>
          
          <div className="card p-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">✓</div>
              <div>
                <h4 className="font-bold text-foreground">যাচাইকৃত বিক্রেতা</h4>
                <p className="text-xs text-muted">সব বিক্রেতা যাচাইকৃত এবং বিশ্বস্ত</p>
              </div>
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🚚</div>
              <div>
                <h4 className="font-bold text-foreground">দ্রুত ডেলিভারি</h4>
                <p className="text-xs text-muted">২৪ ঘন্টার মধ্যে ঢাকায় ডেলিভারি</p>
              </div>
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💬</div>
              <div>
                <h4 className="font-bold text-foreground">সরাসরি যোগাযোগ</h4>
                <p className="text-xs text-muted">বিক্রেতাদের সাথে সরাসরি চ্যাট করুন</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charity Banner */}
        <div className="bg-gradient-to-r from-gold/20 to-primary/20 border border-gold/30 rounded-lg p-4 text-center">
          <p className="text-sm font-semibold text-foreground">
            প্রতিটি বিক্রয় থেকে অংশ দাতব্য কাজে ব্যয় করা হয়
          </p>
        </div>
      </div>
    </main>
  )
}
