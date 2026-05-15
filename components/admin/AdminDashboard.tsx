'use client'

import { useEffect } from 'react'
import { useAuth } from '@/components/auth/AuthContext'
import { useRouter } from 'next/navigation'

export function AdminDashboard() {
  const { isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAdmin) {
      router.push('/')
    }
  }, [isAdmin, router])

  if (!isAdmin) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="bg-secondary p-4 rounded-lg border border-accent/10">
        <h3 className="font-bold text-lg mb-4">অ্যাডমিন ড্যাশবোর্ড</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-background p-3 rounded-lg border border-accent/20">
            <p className="text-xs text-foreground/70">মোট গবাদি পশু তালিকা</p>
            <p className="text-2xl font-bold text-primary">--</p>
          </div>
          <div className="bg-background p-3 rounded-lg border border-accent/20">
            <p className="text-xs text-foreground/70">মোট কসাই সেবা</p>
            <p className="text-2xl font-bold text-primary">--</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold mb-2">পেন্ডিং অনুমোদনগুলি</h4>
          <p className="text-sm text-foreground/70">এখানে পেন্ডিং আইটেমগুলি দেখানো হবে</p>
        </div>
      </div>
    </div>
  )
}
