import { Link } from '@tanstack/react-router'

import { createFileRoute } from '@tanstack/react-router'
import logo from '../fw_logo_header.svg'
import { Home, Info } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#e8afdf] text-white text-[calc(10px+2vmin)]">
        <img
          src={logo}
          className="h-[20vmin] pointer-events-none"
          alt="logo"
        />
          <Link
            to="/"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
          >
            <Home size={20} />
            <span className="font-medium">Home</span>
          </Link>
          <Link
            to="/about"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
          >
            <Info size={20} />
            <span className="font-medium">About</span>
          </Link>
      </header>
    </div>
  )
}
