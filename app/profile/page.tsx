'use client'

import { useAuth } from '@/components/auth/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AdminDashboard } from '@/components/admin/AdminDashboard'

export default function ProfilePage() {
  const { user, isAdmin, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/auth')
    } catch (err) {
      alert('সাইন আউট ব্যর্থ')
    }
  }

  if (!user) {
    return (
      <main className="pt-20 pb-24 px-4">
        <div className="text-center py-8">
          <p className="mb-4">আপনার প্রোফাইল দেখতে সাইন ইন করুন</p>
          <Link href="/auth" className="bg-primary text-white px-4 py-2 rounded-lg inline-block">
            সাইন ইন করুন
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-20 pb-24">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-primary mb-6">আমার প্রোফাইল</h2>

        {/* User Profile Card */}
        <div className="bg-secondary p-4 rounded-lg border border-accent/10 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <div>
              <p className="font-bold text-lg">{user.email}</p>
              {isAdmin && (
                <p className="text-sm text-primary font-bold">অ্যাডমিন</p>
              )}
            </div>
          </div>
        </div>

        {/* Admin Dashboard (if admin) */}
        {isAdmin && (
          <div className="mb-6">
            <AdminDashboard />
          </div>
        )}

        {/* User Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-secondary p-4 rounded-lg border border-accent/10">
            <p className="text-xs text-foreground/70 mb-1">আমার তালিকা</p>
            <p className="text-2xl font-bold text-primary">--</p>
          </div>
          <div className="bg-secondary p-4 rounded-lg border border-accent/10">
            <p className="text-xs text-foreground/70 mb-1">মোট বিক্রয়</p>
            <p className="text-2xl font-bold text-primary">--</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Link
            href="/marketplace/create"
            className="w-full bg-primary text-white px-4 py-3 rounded-lg text-center font-medium hover:bg-opacity-90 block"
          >
            গবাদি পশু বিক্রি করুন
          </Link>
          <Link
            href="/butcher/create"
            className="w-full bg-primary text-white px-4 py-3 rounded-lg text-center font-medium hover:bg-opacity-90 block"
          >
            কসাই সেবা যোগ করুন
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full bg-accent text-white px-4 py-3 rounded-lg font-medium hover:bg-opacity-90"
          >
            সাইন আউট করুন
          </button>
        </div>
      </div>
    </main>
  )
}
