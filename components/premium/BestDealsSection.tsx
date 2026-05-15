'use client'

import { BestDealCard } from './BestDealCard'

const deals = [
  {
    id: 1,
    title: 'স্বাস্থ্যকর দেশী গরু',
    price: 85000,
    location: 'ঢাকা',
    image: '/animals/cow1.jpg',
    verified: true,
  },
  {
    id: 2,
    title: 'নিখুঁত ছাগল',
    price: 28000,
    location: 'চট্টগ্রাম',
    image: '/animals/goat1.jpg',
    verified: true,
  },
  {
    id: 3,
    title: 'ফিটনেস ভেড়া',
    price: 15000,
    location: 'সিলেট',
    image: '/animals/sheep1.jpg',
    verified: true,
  },
  {
    id: 4,
    title: 'প্রিমিয়াম পাঠা',
    price: 35000,
    location: 'রাজশাহী',
    image: '/animals/goat2.jpg',
    verified: true,
  },
]

export function BestDealsSection() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-xl font-bold text-gray-800">সেরা ডিল</h2>
        <a href="/marketplace" className="text-[#DA291C] font-semibold text-sm hover:underline">
          সব দেখুন →
        </a>
      </div>

      {/* Horizontal Scroll */}
      <div className="overflow-x-auto pb-2 px-4 scrollbar-hide">
        <div className="flex gap-4">
          {deals.map((deal) => (
            <BestDealCard key={deal.id} {...deal} />
          ))}
        </div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
