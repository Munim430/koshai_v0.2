import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

export const ADMIN_EMAILS = [
  'munimm247@gmail.com',
  'munimhasibul10@gmail.com',
]

export const FREE_ANIMAL_LISTINGS = 1000
export const FREE_BUTCHER_LISTINGS = 100
export const NUMBER_REVEAL_COST = 150 // BDT
export const QURBANI_SHARES = 5 // hardcoded
