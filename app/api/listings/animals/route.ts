import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const mockData = [
      { id: 1, title: 'দেশী গাভী', price: 85000, location: 'ঢাকা', animal_type: 'cow', status: 'active' },
      { id: 2, title: 'পাঠা ছাগল', price: 35000, location: 'চট্টগ্রাম', animal_type: 'goat', status: 'active' },
    ]
    return NextResponse.json({ data: mockData })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({ success: true, id: Math.random() }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
