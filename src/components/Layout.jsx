import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import './Layout.css'

const navItems = [
  { path: '/friday', label: 'Friday?' },
  { path: '/excuses', label: 'Excuses' },
  { path: '/dark-mode', label: 'Dark Mode' },
  { path: '/apology', label: 'Apology' },
  { path: '/loading', label: 'Loading...' },
  { path: '/code-check', label: 'Code Good?' },
  { path: '/meeting', label: 'Meeting' },
  { path: '/compliments', label: 'Compliments' },
  { path: '/nod', label: 'Nod' },
  { path: '/bingo', label: 'Bingo' },
]

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="layout">
      <nav className="nav">
        <div className="nav-inner">
          <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
            <span className="nav-logo-bracket">[</span>
            WSK
            <span className="nav-logo-bracket">]</span>
          </Link>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>

          <div className={`nav-links ${menuOpen ? 'show' : ''}`}>
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`nav-link ${location.pathname === path ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
