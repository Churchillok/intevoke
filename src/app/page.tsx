'use client'

import { useState, useEffect, useRef } from 'react'

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}

export default function Home() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const features = useInView()
  const howItWorks = useInView()
  const faq = useInView()
  const finalCta = useInView()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const faqs = [
    {
      q: "How is this different from personality tests?",
      a: "Personality tests tell you who you are. Intevoke shows you how you actually decide under pressure—and helps you practice doing it better."
    },
    {
      q: "What kind of decisions can I practice?",
      a: "Difficult conversations, career crossroads, ethical dilemmas, negotiation scenarios, and more. Real situations you'll actually face."
    },
    {
      q: "Is my data private?",
      a: "Absolutely. Your decisions and patterns are yours alone. We never share or sell personal data."
    },
    {
      q: "When will Intevoke launch?",
      a: "We're in early development. Sign up for early access to be first in line and help shape the product."
    }
  ]

  return (
    <main className="min-h-screen bg-navy overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-teal/10 rounded-full blur-[100px] animate-float" />
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] animate-float-delayed" />
        <div className="absolute -bottom-40 right-1/3 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[120px] animate-float" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <span className="text-2xl font-bold text-white tracking-tight">
            intevoke
          </span>
          <a href="#signup" className="text-sm text-teal hover:text-teal-300 transition-colors">
            Get Early Access →
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-24 md:pt-24 md:pb-32 lg:pt-32 lg:pb-40">
        <div className="relative mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span className="text-sm text-gray-300">Now accepting early access signups</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 animate-fade-in-up">
            <span className="text-white">The </span>
            <span className="bg-gradient-to-r from-teal via-teal-300 to-emerald-400 bg-clip-text text-transparent">Decision Simulator</span>
            <br />
            <span className="text-white">for Life&apos;s Hard Decisions</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up animation-delay-100">
            Like pilots who practice emergency landings in flight simulators, you can rehearse
            difficult conversations, career choices, and ethical dilemmas before they happen.
          </p>

          {/* Email Capture Form */}
          <form id="signup" onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto animate-fade-in-up animation-delay-200">
            <div className="flex-1 relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-teal to-emerald-500 rounded-xl opacity-0 group-hover:opacity-50 blur transition-opacity" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="relative w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-teal/50 focus:bg-white/10 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="group relative px-8 py-4 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal to-emerald-500 transition-transform group-hover:scale-105" />
              <span className="relative text-navy flex items-center justify-center gap-2">
                {status === 'loading' ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Get Early Access
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/20 text-teal animate-fade-in">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              You&apos;re on the list! We&apos;ll be in touch soon.
            </div>
          )}
          {status === 'error' && (
            <p className="mt-6 text-red-400 animate-fade-in">Something went wrong. Please try again.</p>
          )}

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 animate-fade-in animation-delay-300">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Privacy-first
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI-powered insights
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Launch Q2 2025
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={features.ref} className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className={`grid md:grid-cols-3 gap-6 transition-all duration-1000 ${features.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Feature 1 */}
            <div className="group relative p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-teal/30 transition-all duration-300">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br from-teal/20 to-teal/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Practice Real Decisions
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Not abstract puzzles. Actual situations you&apos;ll face—negotiations, tough conversations, career crossroads.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-teal/30 transition-all duration-300">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br from-teal/20 to-teal/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  See Your Thought Patterns
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Intevoke&apos;s AI reveals how you think under pressure—your tendencies, blind spots, and decision-making style.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-teal/30 transition-all duration-300">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br from-teal/20 to-teal/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Prepare Before It Matters
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Build confidence through practice. When the real moment comes, you&apos;ve already been there.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorks.ref} className="relative px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className={`text-center mb-16 transition-all duration-1000 ${howItWorks.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="text-teal text-sm font-medium tracking-wider uppercase">How It Works</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
              Three steps to better decisions
            </h2>
          </div>

          <div className={`relative transition-all duration-1000 delay-200 ${howItWorks.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Timeline line */}
            <div className="hidden md:block absolute top-24 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-transparent via-teal/50 to-transparent" />

            <div className="grid md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="text-center">
                <div className="relative inline-flex">
                  <div className="absolute inset-0 bg-teal/20 rounded-full blur-xl" />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-teal to-emerald-500 flex items-center justify-center text-navy text-2xl font-bold shadow-lg shadow-teal/25">
                    1
                  </div>
                </div>
                <h3 className="mt-8 text-xl font-semibold text-white">Choose a Scenario</h3>
                <p className="mt-3 text-gray-400">
                  Pick from career moves, tough conversations, or ethical dilemmas
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="relative inline-flex">
                  <div className="absolute inset-0 bg-teal/20 rounded-full blur-xl" />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-teal to-emerald-500 flex items-center justify-center text-navy text-2xl font-bold shadow-lg shadow-teal/25">
                    2
                  </div>
                </div>
                <h3 className="mt-8 text-xl font-semibold text-white">Make Your Decisions</h3>
                <p className="mt-3 text-gray-400">
                  Navigate branching paths as the situation unfolds realistically
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="relative inline-flex">
                  <div className="absolute inset-0 bg-teal/20 rounded-full blur-xl" />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-teal to-emerald-500 flex items-center justify-center text-navy text-2xl font-bold shadow-lg shadow-teal/25">
                    3
                  </div>
                </div>
                <h3 className="mt-8 text-xl font-semibold text-white">Learn Your Patterns</h3>
                <p className="mt-3 text-gray-400">
                  AI reveals your decision-making tendencies and blind spots
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Break - Quote */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <svg className="w-12 h-12 mx-auto mb-6 text-teal/30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="text-2xl md:text-3xl text-white font-light leading-relaxed">
            The best time to practice a hard conversation is{' '}
            <span className="text-teal font-medium">before</span> you need to have it.
          </blockquote>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faq.ref} className="relative px-6 py-24">
        <div className="mx-auto max-w-2xl">
          <div className={`text-center mb-12 transition-all duration-1000 ${faq.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="text-teal text-sm font-medium tracking-wider uppercase">FAQ</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
              Common questions
            </h2>
          </div>

          <div className={`space-y-4 transition-all duration-1000 delay-200 ${faq.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="group rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-medium text-white">{faq.q}</span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>
                    <svg
                      className="w-4 h-4 text-teal"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40' : 'max-h-0'}`}>
                  <div className="px-6 pb-5 text-gray-400 leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section ref={finalCta.ref} className="relative px-6 py-32">
        <div className="absolute inset-0 bg-gradient-to-t from-teal/10 via-transparent to-transparent" />
        <div className={`relative mx-auto max-w-2xl text-center transition-all duration-1000 ${finalCta.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to practice?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join the waitlist and be first to practice life&apos;s hard decisions.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <div className="flex-1 relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-teal to-emerald-500 rounded-xl opacity-0 group-hover:opacity-50 blur transition-opacity" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="relative w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-teal/50 focus:bg-white/10 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="group relative px-8 py-4 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal to-emerald-500 transition-transform group-hover:scale-105" />
              <span className="relative text-navy">
                {status === 'loading' ? 'Sending...' : 'Get Early Access'}
              </span>
            </button>
          </form>
          {status === 'success' && (
            <p className="mt-6 text-teal animate-fade-in">You&apos;re on the list!</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 py-12 border-t border-white/10">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-xl font-bold text-white">intevoke</span>
          <div className="flex items-center gap-6 text-sm">
            <a href="/changelog" className="text-gray-400 hover:text-teal transition-colors">Changelog</a>
            <a href="mailto:hello@intevoke.com" className="text-gray-400 hover:text-teal transition-colors">Contact</a>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Intevoke
          </p>
        </div>
      </footer>
    </main>
  )
}
