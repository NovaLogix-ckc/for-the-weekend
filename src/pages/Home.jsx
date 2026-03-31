import { Link } from 'react-router-dom'
import './Home.css'

const tools = [
  { path: '/friday', icon: '📅', name: 'Is It Friday Yet?', tagline: 'The only question that matters' },
  { path: '/excuses', icon: '💼', name: 'Excuse Generator', tagline: 'Corporate-grade alibis on demand' },
  { path: '/dark-mode', icon: '🌙', name: 'Dark Mode Toggle', tagline: 'Revolutionary display technology' },
  { path: '/apology', icon: '✉️', name: 'Apology Escalator', tagline: 'From sorry to cabin in 5 clicks' },
  { path: '/loading', icon: '⏳', name: 'Loading... Forever', tagline: 'A progress bar for nothing' },
  { path: '/code-check', icon: '💻', name: 'Is My Code Good?', tagline: 'Brutally honest code reviews' },
  { path: '/meeting', icon: '🔨', name: 'Meeting Detector', tagline: 'Could this have been an email?' },
  { path: '/compliments', icon: '✨', name: 'Compliment Machine', tagline: 'Weaponized workplace kindness' },
  { path: '/nod', icon: '👍', name: 'The Nod Button', tagline: 'Professional agreement simulator' },
  { path: '/bingo', icon: '🔲', name: 'Buzzword Bingo', tagline: 'Survive your next all-hands' },
]

export default function Home() {
  return (
    <div className="home-page page">
      <h1 className="page-title">Workplace Survival Kit</h1>
      <p className="page-subtitle">Tools for the modern office prisoner</p>

      <div className="home-grid">
        {tools.map((tool, i) => (
          <Link
            to={tool.path}
            key={tool.path}
            className="home-card card"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className="home-card__icon">{tool.icon}</span>
            <h2 className="home-card__name">{tool.name}</h2>
            <p className="home-card__tagline">{tool.tagline}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
