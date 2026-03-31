import { useState, useEffect, useCallback } from 'react'
import './DarkModeToggle.css'

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [flicker, setFlicker] = useState(false)
  const [toastKey, setToastKey] = useState(0)

  const toggle = useCallback(() => {
    setDark(prev => !prev)
    setFlicker(true)
    setToastKey(k => k + 1)
    setToastVisible(true)
  }, [])

  useEffect(() => {
    if (flicker) {
      const t = setTimeout(() => setFlicker(false), 200)
      return () => clearTimeout(t)
    }
  }, [flicker])

  useEffect(() => {
    if (toastVisible) {
      const t = setTimeout(() => setToastVisible(false), 2000)
      return () => clearTimeout(t)
    }
  }, [toastVisible, toastKey])

  return (
    <div
      className={`page darkmode-page ${flicker ? 'darkmode-flicker' : ''}`}
      style={{ background: dark ? '#f9f9f9' : '#fafafa', color: '#333' }}
    >
      <h1 className="page-title" style={{ color: '#333', textShadow: 'none' }}>
        Dark Mode
      </h1>
      <p className="page-subtitle" style={{ color: '#666' }}>
        Experience the future of display technology
      </p>

      <button
        className="darkmode-toggle"
        onClick={toggle}
        role="switch"
        aria-checked={dark}
        aria-label="Toggle dark mode"
      >
        <span className={`darkmode-toggle__track ${dark ? 'darkmode-toggle__track--on' : ''}`}>
          <span className={`darkmode-toggle__thumb ${dark ? 'darkmode-toggle__thumb--on' : ''}`} />
        </span>
      </button>

      <p className="darkmode-status">Dark mode enabled &#10003;</p>

      <div className="darkmode-prefs card" style={{ background: '#f0f0f0', borderColor: '#ddd' }}>
        <h3 className="darkmode-prefs__title" style={{ color: '#333' }}>
          Theme Preferences
        </h3>
        <ul className="darkmode-prefs__list">
          <li><span className="darkmode-prefs__key">Darkness level:</span> Yes</li>
          <li><span className="darkmode-prefs__key">Contrast ratio:</span> Vibes</li>
          <li><span className="darkmode-prefs__key">Font weight:</span> Bold enough</li>
          <li><span className="darkmode-prefs__key">Accessibility:</span> Optimistic</li>
        </ul>
      </div>

      {toastVisible && (
        <div className="darkmode-toast" key={toastKey}>
          Settings saved &#10003;
        </div>
      )}
    </div>
  )
}
