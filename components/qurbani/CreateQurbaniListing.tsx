'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, QURBANI_SHARES } from '@/lib/supabase'
import { useAuth } from '@/components/auth/AuthContext'
import { useForm } from 'react-hook-form'

export function CreateQurbaniListing() {
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
      // Create Qurbani listing with hardcoded 5 shares
      const { error } = await supabase
        .from('qurbani_listings')
        .insert([{
          user_id: user.id,
          total_shares: QURBANI_SHARES,
          available_shares: QURBANI_SHARES,
          share_type: 'shared',
          status: 'open',
          ...data,
        }])

      if (error) throw error

      alert('কোরবানি তালিকা তৈরি হয়েছে!')
      router.push('/qurbani')
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
          {...register('title', { required: true })}
          className="w-full px-3 py-2 border border-accent/20 rounded-lg"
          placeholder="গরু, ছাগল, ভেড়া..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">প্রতি শেয়ারের মূল্য (৳)</label>
          <input type="number" {...register('price_per_share_bdt', { required: true })} className="w-full px-3 py-2 border border-accent/20 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">ডেলিভারি তারিখ</label>
          <input type="date" {...register('delivery_date')} className="w-full px-3 py-2 border border-accent/20 rounded-lg" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">অবস্থান</label>
        <input type="text" {...register('location', { required: true })} className="w-full px-3 py-2 border border-accent/20 rounded-lg" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">বিবরণ</label>
        <textarea {...register('description')} className="w-full px-3 py-2 border border-accent/20 rounded-lg" rows={3} />
      </div>

      <div className="bg-secondary p-3 rounded-lg border border-accent/10">
        <p className="text-sm font-medium">শেয়ারের সংখ্যা: {QURBANI_SHARES} জন</p>
        <p className="text-xs text-foreground/70">প্রতিটি কোরবানি সর্বদা {QURBANI_SHARES} জন ব্যক্তির মধ্যে ভাগ করা হয়</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-opacity-90 disabled:opacity-50"
      >
        {loading ? 'তৈরি হচ্ছে...' : 'কোরবানি তালিকা তৈরি করুন'}
      </button>
    </form>
  )
}
