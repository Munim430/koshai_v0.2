import { useAuth } from '@/components/auth/AuthContext'
import { AdminDashboard } from '@/components/admin/AdminDashboard'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useAdminAccess() {
  const { isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAdmin) {
      router.push('/')
    }
  }, [isAdmin, router])

  return isAdmin
}
