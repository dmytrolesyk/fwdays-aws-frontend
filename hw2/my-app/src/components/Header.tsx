import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Home, Info, Menu, Rocket, Sparkles, X } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    {
      to: '/',
      label: 'Home',
      icon: <Home size={18} />,
    },
    {
      to: '/about',
      label: 'Lore',
      icon: <Info size={18} />,
    },
    {
      to: '/pop',
      label: 'Pop Culture',
      icon: <Rocket size={18} />,
    },
  ]

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/80 text-slate-50 backdrop-blur border-b border-slate-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="rounded-xl border border-slate-800 bg-slate-900/70 p-2 text-slate-100 shadow-sm transition hover:border-slate-700 hover:bg-slate-800/80"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500/40 via-cyan-400/30 to-emerald-400/30 text-2xl">
                🫠
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                  Blobfish & Beaver
                </p>
                <p className="text-sm font-semibold">Edge Observatory</p>
              </div>
            </Link>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-200 transition hover:border-slate-700 hover:text-white"
                activeProps={{
                  className:
                    'flex items-center gap-2 rounded-full border border-cyan-400/70 bg-cyan-500/20 px-3 py-2 text-sm text-white shadow',
                }}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            <span className="hidden items-center gap-2 rounded-full border border-orange-500/60 bg-orange-500/10 px-3 py-2 text-xs uppercase tracking-[0.14em] text-orange-100 md:inline-flex">
              <Sparkles size={16} />
              Deployed soon
            </span>
          </div>
        </div>
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-slate-950 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <h2 className="text-xl font-bold">Navigation</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="mb-2 flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/70 p-3 transition-colors hover:bg-slate-800"
              activeProps={{
                className:
                  'mb-2 flex items-center gap-3 rounded-lg border border-cyan-400 bg-cyan-500/20 p-3 transition-colors',
              }}
            >
              {link.icon}
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {isOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      ) : null}
    </>
  )
}
