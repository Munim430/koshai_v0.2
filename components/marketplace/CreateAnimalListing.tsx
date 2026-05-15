'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, FREE_ANIMAL_LISTINGS } from '@/lib/supabase'
import { useAuth } from '@/components/auth/AuthContext'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { calculateFeeForListing } from '@/lib/utils'

const animalListingSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  animal_type: z.enum(['cow', 'goat', 'sheep']),
  breed: z.string().min(2),
  age_months: z.coerce.number().min(1),
  weight_kg: z.coerce.number().min(1),
  price_bdt: z.coerce.number().min(1000),
  location: z.string().min(3),
  description: z.string().optional(),
})

export function CreateAnimalListing() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [feeEstimate, setFeeEstimate] = useState(0)
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      animal_type: 'cow' as const,
    }
  })

  const animalType = watch('animal_type')

  const onSubmit = async (data: any) => {
    if (!user) {
      router.push('/auth')
      return
    }

    setLoading(true)
    try {
      // Get current free listing count
      const { data: counter } = await supabase
        .from('listing_counters')
        .select('total_free_listings')
        .eq('listing_type', 'animal')
        .single()

      const isFree = (counter?.total_free_listings || 0) < FREE_ANIMAL_LISTINGS
      const fee = !isFree ? calculateFeeForListing(counter?.total_free_listings || 0, FREE_ANIMAL_LISTINGS) : 0

      const { error } = await supabase
        .from('animal_listings')
        .insert([{
          user_id: user.id,
          fee_charged: !isFree,
          ...data,
        }])

      if (error) throw error

      alert(`তালিকা তৈরি হয়েছে!${isFree ? '' : ` ফি: ৳${fee}`}`)
      router.push('/marketplace')
    } catch (err: any) {
      alert('ত্রুটি: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">শিরোনাম</label>
        <input
          type="text"
          {...register('title')}
          className="w-full px-3 py-2 border border-accent/20 rounded-lg"
          placeholder="গাভী, ছাগল, ভেড়া..."
        />
        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">প্রাণীর ধরন</label>
          <select {...register('animal_type')} className="w-full px-3 py-2 border border-accent/20 rounded-lg">
            <option value="cow">গাভী</option>
            <option value="goat">ছাগল</option>
            <option value="sheep">ভেড়া</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">বয়স (মাস)</label>
          <input type="number" {...register('age_months')} className="w-full px-3 py-2 border border-accent/20 rounded-lg" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">জাত</label>
          <input type="text" {...register('breed')} className="w-full px-3 py-2 border border-accent/20 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">ওজন (কেজি)</label>
          <input type="number" {...register('weight_kg')} className="w-full px-3 py-2 border border-accent/20 rounded-lg" step="0.1" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">মূল্য (৳)</label>
        <input type="number" {...register('price_bdt')} className="w-full px-3 py-2 border border-accent/20 rounded-lg" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">অবস্থান</label>
        <input type="text" {...register('location')} className="w-full px-3 py-2 border border-accent/20 rounded-lg" placeholder="ঢাকা, চট্টগ্রাম..." />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">বিবরণ</label>
        <textarea {...register('description')} className="w-full px-3 py-2 border border-accent/20 rounded-lg" rows={3} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-opacity-90 disabled:opacity-50"
      >
        {loading ? 'তৈরি হচ্ছে...' : 'তালিকা তৈরি করুন'}
      </button>
    </form>
  )
}
