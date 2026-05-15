'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface ButcherService {
  id: string
  business_name: string
  phone: string
  location: string
  experience_years: number
  rating: number
  price_per_animal_bdt: number
  number_reveal_available: boolean
  number_reveal_cost_bdt: number
}

export function ButcherListings() {
  const [listings, setListings] = useState<ButcherService[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from('butcher_listings')
        .select('*')
        .eq('status', 'active')
        .limit(50)

      if (error) throw error
      setListings(data || [])
    } catch (err) {
      console.error('[v0] Error fetching butcher listings:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="text-center py-8">লোড হচ্ছে...</div>
      ) : listings.length === 0 ? (
        <div className="text-center py-8 text-foreground/50">কোন সেবা পাওয়া যায়নি</div>
      ) : (
        listings.map((service) => (
          <div key={service.id} className="bg-secondary p-4 rounded-lg border border-accent/10">
            <h3 className="font-bold text-lg mb-2">{service.business_name}</h3>
            <p className="text-sm text-foreground/70 mb-2">{service.location}</p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">অভিজ্ঞতা: {service.experience_years} বছর</span>
              <span className="text-sm">⭐ {service.rating.toFixed(1)}</span>
            </div>
            <p className="text-primary font-bold mb-2">৳{service.price_per_animal_bdt}/পশু</p>
            {service.number_reveal_available && (
              <button className="w-full bg-primary text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90">
                নম্বর প্রকাশ করুন (৳{service.number_reveal_cost_bdt})
              </button>
            )}
          </div>
        ))
      )}
    </div>
  )
}
