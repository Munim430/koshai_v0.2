'use client'

import { useState, useEffect } from 'react'
import { supabase, QURBANI_SHARES } from '@/lib/supabase'

interface QurbaniListing {
  id: string
  title: string
  price_per_share_bdt: number
  available_shares: number
  total_shares: number
  location: string
  delivery_date: string
  status: string
}

export function QurbaniListings() {
  const [listings, setListings] = useState<QurbaniListing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from('qurbani_listings')
        .select('*')
        .eq('status', 'open')
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) throw error
      setListings(data || [])
    } catch (err) {
      console.error('[v0] Error fetching qurbani listings:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="text-center py-8">লোড হচ্ছে...</div>
      ) : listings.length === 0 ? (
        <div className="text-center py-8 text-foreground/50">কোন কোরবানি পাওয়া যায়নি</div>
      ) : (
        listings.map((listing) => (
          <div key={listing.id} className="bg-secondary p-4 rounded-lg border border-accent/10">
            <h3 className="font-bold text-lg mb-2">{listing.title}</h3>
            <p className="text-sm text-foreground/70 mb-2">{listing.location}</p>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">শেয়ার: {listing.available_shares}/{listing.total_shares}</span>
              <div className="w-32 h-2 bg-accent/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${((listing.total_shares - listing.available_shares) / listing.total_shares) * 100}%` }}
                />
              </div>
            </div>
            <p className="text-primary font-bold mb-2">৳{listing.price_per_share_bdt}/শেয়ার</p>
            {listing.available_shares > 0 && (
              <button className="w-full bg-primary text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90">
                শেয়ার কিনুন
              </button>
            )}
            {listing.available_shares === 0 && (
              <div className="w-full bg-accent/20 text-accent px-3 py-2 rounded-lg text-sm font-medium text-center">
                সম্পূর্ণ বুক করা হয়েছে
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}
