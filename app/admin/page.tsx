'use client'

import { useAuth } from '@/components/auth/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
  const { isAdmin, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/')
    }
  }, [isAdmin, loading, router])

  if (loading) {
    return (
      <main className="pt-20 pb-24 px-4">
        <div className="text-center py-8">লোড হচ্ছে...</div>
      </main>
    )
  }

  if (!isAdmin) {
    return (
      <main className="pt-20 pb-24 px-4">
        <div className="text-center py-8 text-red-500">আপনার অ্যাক্সেস নেই</div>
      </main>
    )
  }

  return (
    <main className="pt-20 pb-24">
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">অ্যাডমিন ড্যাশবোর্ড</h1>
        
        <div className="card p-4 mb-4">
          <h2 className="font-bold text-lg mb-4">পেন্ডিং অনুমোদন</h2>
          <div className="text-center text-muted text-sm">কোনো পেন্ডিং আইটেম নেই</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="card p-4 text-center">
            <div className="text-3xl font-bold text-primary">--</div>
            <div className="text-xs text-muted mt-1">মোট তালিকা</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-3xl font-bold text-primary">--</div>
            <div className="text-xs text-muted mt-1">মোট ফি</div>
          </div>
        </div>
      </div>
    </main>
  )
}
