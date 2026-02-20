import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      )
    }

    // Supabase integration
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY

    if (!supabaseUrl || !supabaseKey) {
      // For development without Supabase, just log
      console.log('Email signup (no Supabase):', email)
      return NextResponse.json({ success: true })
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/email_signups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        email,
        created_at: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      // Handle duplicate email gracefully
      if (error.includes('duplicate') || error.includes('unique')) {
        return NextResponse.json({ success: true, message: 'Already subscribed' })
      }
      throw new Error(error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}
