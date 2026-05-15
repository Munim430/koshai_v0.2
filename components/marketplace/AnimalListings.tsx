'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface AnimalListing {
  id: string
  title: string
  price_bdt: number
  animal_type: string
  location: string
  images: string[]
}

export function AnimalListings() {
  const [listings, setListings] = useState<AnimalListing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from('animal_listings')
        .select('id, title, price_bdt, animal_type, location, images')
        .eq('status', 'active')
        .limit(50)

      if (error) throw error
      setListings(data || [])
    } catch (err) {
      console.error('[v0] Error fetching listings:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="text-center py-8">লোড হচ্ছে...</div>
      ) : listings.length === 0 ? (
        <div className="text-center py-8 text-foreground/50">কোন তালিকা পাওয়া যায়নি</div>
      ) : (
        listings.map((listing) => (
          <div key={listing.id} className="bg-secondary p-4 rounded-lg border border-accent/10">
            <h3 className="font-bold text-lg mb-2">{listing.title}</h3>
            <p className="text-sm text-foreground/70 mb-2">{listing.animal_type} • {listing.location}</p>
            <p className="text-primary font-bold">৳{listing.price_bdt}</p>
          </div>
        ))
      )}
    </div>
  )
}
