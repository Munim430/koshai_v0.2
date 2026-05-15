import useSWR from 'swr'
import { supabase } from '@/lib/supabase'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

export function useAnimalListings() {
  const { data, error, isLoading } = useSWR('/api/listings/animals', fetcher)
  return {
    listings: data?.data || [],
    loading: isLoading,
    error,
  }
}

export function useButcherListings() {
  const { data, error, isLoading } = useSWR('/api/listings/butchers', fetcher)
  return {
    listings: data?.data || [],
    loading: isLoading,
    error,
  }
}

export function useQurbaniListings() {
  const { data, error, isLoading } = useSWR('/api/qurbani', fetcher)
  return {
    listings: data?.data || [],
    loading: isLoading,
    error,
  }
}
