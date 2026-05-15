'use client'

interface DealCardProps {
  image?: string
  price: number
  location: string
  title: string
  badge?: string
}

export function DealCard({ image, price, location, title, badge }: DealCardProps) {
  return (
    <div className="card w-64 flex-shrink-0 overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-40 bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-5xl">🐄</div>
        )}
        {badge && (
          <div className="absolute top-3 right-3 badge">{badge}</div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-bold text-foreground mb-2 line-clamp-2">{title}</h4>
        
        <div className="flex items-center justify-between mb-3">
          <div className="text-2xl font-bold text-primary">৳{price.toLocaleString()}</div>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted mb-3">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {location}
        </div>

        <button className="btn-primary w-full text-sm">
          বিস্তারিত দেখুন
        </button>
      </div>
    </div>
  )
}
