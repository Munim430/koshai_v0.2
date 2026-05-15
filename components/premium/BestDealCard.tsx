'use client'

import { MapPin, CheckCircle2 } from 'lucide-react'

interface BestDealCardProps {
  id: number
  title: string
  price: number
  location: string
  image: string
  verified: boolean
}

export function BestDealCard({
  title,
  price,
  location,
  image,
  verified,
}: BestDealCardProps) {
  return (
    <div className="glass-card rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex-shrink-0 w-48">
      {/* Image Container */}
      <div className="relative h-32 bg-gradient-to-br from-[#DA291C]/20 to-[#F39C12]/20 overflow-hidden rounded-t-3xl">
        <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-[#DA291C] opacity-30">
          🐄
        </div>

        {/* Verified Badge */}
        {verified && (
          <div className="absolute top-2 right-2 bg-green-500/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <CheckCircle2 className="w-3 h-3 text-white" />
            <span className="text-xs font-bold text-white">যাচাইকৃত</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-2">
          {title}
        </h3>

        {/* Price */}
        <div className="mb-3">
          <span className="text-2xl font-bold text-[#DA291C]">৳{price}</span>
          <span className="text-xs text-gray-500 ml-1">/প্রতিটি</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-gray-600 mb-3">
          <MapPin className="w-3 h-3 text-[#DA291C]" />
          <span>{location}</span>
        </div>

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-[#DA291C] to-[#E85A4F] text-white font-bold py-2 rounded-xl hover:shadow-lg transition-all duration-200 active:scale-95 text-sm">
          বিস্তারিত দেখুন
        </button>
      </div>
    </div>
  )
}
