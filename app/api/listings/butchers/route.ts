import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const mockData = [
      { id: 1, name: 'আলিম কসাই', phone: '01712345678', location: 'ঢাকা', experience: 5, status: 'active' },
      { id: 2, name: 'করিম মাস্টার', phone: '01898765432', location: 'চট্টগ্রাম', experience: 10, status: 'active' },
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
