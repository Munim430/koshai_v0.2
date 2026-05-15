import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Mock data for now - will be connected to Supabase
    const mockData = [
      { id: 1, title: 'গরু শেয়ারিং', price_per_share: 35000, total_shares: 5, available_shares: 2, location: 'ঢাকা' },
      { id: 2, title: 'ছাগল শেয়ারিং', price_per_share: 8000, total_shares: 5, available_shares: 3, location: 'চট্টগ্রাম' },
    ]
    return NextResponse.json({ data: mockData })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Mock response
    return NextResponse.json({ success: true, id: Math.random() }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }
}
