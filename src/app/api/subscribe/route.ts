import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

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
      if (error.includes('duplicate') || error.includes('unique')) {
        return NextResponse.json({ success: true, message: 'Already subscribed' })
      }
      throw new Error(error)
    }

    // Send notification email to yourself
    if (resend && process.env.NOTIFICATION_EMAIL) {
      await resend.emails.send({
        from: 'Intevoke <notifications@intevoke.com>',
        to: process.env.NOTIFICATION_EMAIL,
        subject: '🎉 New Intevoke Signup!',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1E2761;">New Early Access Signup</h2>
            <p style="font-size: 18px; color: #333;">
              <strong>${email}</strong> just signed up for early access!
            </p>
            <p style="color: #666; font-size: 14px;">
              ${new Date().toLocaleString()}
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="color: #999; font-size: 12px;">
              Sent from Intevoke signup notifications
            </p>
          </div>
        `,
      }).catch(console.error)
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
