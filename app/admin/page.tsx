'use client'

import { AdminDashboard } from '@/components/admin/AdminDashboard'
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

  if (loading || !isAdmin) {
    return (
      <main className="pt-20 pb-24 px-4">
        <div className="text-center py-8">আপনার অ্যাক্সেস নেই</div>
      </main>
    )
  }

  return (
    <main className="pt-20 pb-24">
      <div className="p-4">
        <h1 className="text-3xl font-bold text-primary mb-6">অ্যাডমিন ড্যাশবোর্ড</h1>
        <AdminDashboard />
      </div>
    </main>
  )
}
