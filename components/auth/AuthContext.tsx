'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  user: any | null
  loading: boolean
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Mock auth for now - will be connected to Supabase
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    console.log('[v0] Sign in:', email)
    // Mock sign in
  }

  const signUp = async (email: string, password: string) => {
    console.log('[v0] Sign up:', email)
    // Mock sign up
  }

  const signOut = async () => {
    console.log('[v0] Sign out')
    setUser(null)
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    return { user: null, loading: false, isAdmin: false, signIn: async () => {}, signUp: async () => {}, signOut: async () => {} }
  }
  return context
}
