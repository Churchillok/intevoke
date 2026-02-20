import Link from 'next/link'

export const metadata = {
  title: 'Changelog - Intevoke',
  description: 'Latest updates and improvements to Intevoke',
}

const changelog = [
  {
    date: 'February 2026',
    version: 'Coming Soon',
    title: 'Early Access Launch',
    description: 'We\'re building something special. Sign up for early access to be the first to try Intevoke.',
    items: [
      'Decision simulation engine',
      'AI-powered pattern analysis',
      'Personal decision journal',
      'Scenario library',
    ],
    tag: 'upcoming',
  },
]

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-navy">
      {/* Header */}
      <header className="px-6 py-6 border-b border-white/10">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white hover:text-teal transition-colors">
            intevoke
          </Link>
          <Link
            href="/#signup"
            className="text-sm text-teal hover:text-teal-300 transition-colors"
          >
            Get Early Access →
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-white mb-4">Changelog</h1>
          <p className="text-gray-400 mb-12">
            Follow our progress as we build the decision simulator you&apos;ve been waiting for.
          </p>

          <div className="space-y-12">
            {changelog.map((entry, i) => (
              <article key={i} className="relative pl-8 border-l border-white/10">
                {/* Timeline dot */}
                <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-teal" />

                {/* Date and version */}
                <div className="flex items-center gap-3 mb-4">
                  <time className="text-sm text-gray-500">{entry.date}</time>
                  {entry.tag === 'upcoming' && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-teal/20 text-teal rounded-full">
                      Upcoming
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-white mb-2">
                  {entry.title}
                </h2>

                {/* Description */}
                <p className="text-gray-400 mb-4">
                  {entry.description}
                </p>

                {/* Items */}
                {entry.items && (
                  <ul className="space-y-2">
                    {entry.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-gray-300">
                        <svg className="w-4 h-4 text-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">
              Want to be notified of updates?
            </h3>
            <p className="text-gray-400 mb-4">
              Join the early access list and we&apos;ll keep you posted.
            </p>
            <Link
              href="/#signup"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-navy font-semibold rounded-lg hover:bg-teal-300 transition-colors"
            >
              Get Early Access
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/10">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Link href="/" className="text-white font-semibold hover:text-teal transition-colors">
            intevoke
          </Link>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Intevoke
          </p>
        </div>
      </footer>
    </main>
  )
}
