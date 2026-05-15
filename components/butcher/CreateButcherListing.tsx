'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, FREE_BUTCHER_LISTINGS, NUMBER_REVEAL_COST } from '@/lib/supabase'
import { useAuth } from '@/components/auth/AuthContext'
import { useForm } from 'react-hook-form'

export function CreateButcherListing() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data: any) => {
    if (!user) {
      router.push('/auth')
      return
    }

    setLoading(true)
    try {
      const { data: counter } = await supabase
        .from('listing_counters')
        .select('total_free_listings')
        .eq('listing_type', 'butcher')
        .single()

      const isFree = (counter?.total_free_listings || 0) < FREE_BUTCHER_LISTINGS

      const { error } = await supabase
        .from('butcher_listings')
        .insert([{
          user_id: user.id,
          fee_charged: !isFree,
          number_reveal_available: true,
          number_reveal_cost_bdt: NUMBER_REVEAL_COST,
          ...data,
        }])

      if (error) throw error

      alert(`কসাই সেবা যুক্ত হয়েছে!${isFree ? '' : ' ফি প্রয়োজন'}`)
      router.push('/butcher')
    } catch (err: any) {
      alert('ত্রুটি: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">ব্যবসার নাম</label>
        <input
          type="text"
          {...register('business_name', { required: true })}
          className="w-full px-3 py-2 border border-accent/20 rounded-lg"
          placeholder="আপনার কসাই ব্যবসার নাম"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">ফোন নম্বর</label>
          <input type="tel" {...register('phone', { required: true })} className="w-full px-3 py-2 border border-accent/20 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">অভিজ্ঞতা (বছর)</label>
          <input type="number" {...register('experience_years', { required: true })} className="w-full px-3 py-2 border border-accent/20 rounded-lg" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">অবস্থান</label>
        <input type="text" {...register('location', { required: true })} className="w-full px-3 py-2 border border-accent/20 rounded-lg" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">প্রতি পশুর দাম (৳)</label>
        <input type="number" {...register('price_per_animal_bdt', { required: true })} className="w-full px-3 py-2 border border-accent/20 rounded-lg" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-opacity-90 disabled:opacity-50"
      >
        {loading ? 'যুক্ত হচ্ছে...' : 'সেবা যুক্ত করুন'}
      </button>
    </form>
  )
}
