import Link from 'next/link';

const links = [
  { href: '/summary', label: 'summary' },
  { href: '/charts', label: 'charts' },
  { href: '/charts-enhanced', label: 'charts-enhanced' },
  { href: '/filters', label: 'filters' },
  { href: '/tooltip', label: 'tooltip' },
] as const;

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full flex-col items-center justify-center gap-8 px-6 py-10 text-center">
      <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">muiblocks</h1>

      <details className="w-full max-w-3xl px-2">
        <summary className="cursor-pointer text-base font-medium text-slate-600 hover:text-slate-800">
          Show page links
        </summary>
        <nav className="mt-4 overflow-y-auto">
          <ul className="grid max-h-[52vh] grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  className="text-lg font-medium text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4 sm:text-xl"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </details>
    </main>
  );
}
