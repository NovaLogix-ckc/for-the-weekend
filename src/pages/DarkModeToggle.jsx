import { useState, useEffect, useCallback } from 'react'
import './DarkModeToggle.css'

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [flicker, setFlicker] = useState(false)
  const [toastKey, setToastKey] = useState(0)
  const [toggleCount, setToggleCount] = useState(0)

  const toggle = useCallback(() => {
    setDark(prev => !prev)
    setFlicker(true)
    setToastKey(k => k + 1)
    setToastVisible(true)
    setToggleCount(c => c + 1)
  }, [])

  useEffect(() => {
    if (flicker) {
      const t = setTimeout(() => setFlicker(false), 200)
      return () => clearTimeout(t)
    }
  }, [flicker])

  useEffect(() => {
    if (toastVisible) {
      const t = setTimeout(() => setToastVisible(false), 2200)
      return () => clearTimeout(t)
    }
  }, [toastVisible, toastKey])

  return (
    <div
      className={`page darkmode-page ${flicker ? 'darkmode-flicker' : ''}`}
      style={{ background: dark ? '#f8f8f6' : '#fafaf8' }}
    >
      <h1 className="darkmode-heading">Dark Mode</h1>
      <p className="darkmode-sub">Experience the future of display technology</p>

      <div className="darkmode-toggle-wrapper">
        <span className="darkmode-label">{dark ? 'DARK' : 'LIGHT'}</span>
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
        <span className="darkmode-label">{dark ? 'DARK' : 'LIGHT'}</span>
      </div>

      <div className="darkmode-status-box">
        <span className="darkmode-check">&#10003;</span>
        <span>Dark mode enabled</span>
      </div>

      <div className="darkmode-comparison">
        <div className="darkmode-swatch" style={{ background: '#fafaf8' }}>
          <span>#fafaf8</span>
          <span className="darkmode-swatch-label">Light Mode</span>
        </div>
        <span className="darkmode-vs">vs</span>
        <div className="darkmode-swatch" style={{ background: '#f8f8f6' }}>
          <span>#f8f8f6</span>
          <span className="darkmode-swatch-label">Dark Mode</span>
        </div>
      </div>

      {toggleCount > 0 && (
        <p className="darkmode-counter">
          Toggled {toggleCount} time{toggleCount !== 1 ? 's' : ''}.
          {toggleCount >= 5 && toggleCount < 10 && ' Still can\'t tell the difference? That\'s the point.'}
          {toggleCount >= 10 && toggleCount < 20 && ' You\'re really committed to this.'}
          {toggleCount >= 20 && ' Please stop. The toggle has feelings.'}
        </p>
      )}

      <div className="darkmode-prefs">
        <h3 className="darkmode-prefs__title">Theme Preferences</h3>
        <ul className="darkmode-prefs__list">
          <li><span className="darkmode-prefs__key">Darkness level:</span> Yes</li>
          <li><span className="darkmode-prefs__key">Contrast ratio:</span> Vibes</li>
          <li><span className="darkmode-prefs__key">Font weight:</span> Bold enough</li>
          <li><span className="darkmode-prefs__key">Accessibility:</span> Optimistic</li>
          <li><span className="darkmode-prefs__key">Colour difference:</span> Imperceptible</li>
          <li><span className="darkmode-prefs__key">User satisfaction:</span> Confused</li>
        </ul>
      </div>

      {toastVisible && (
        <div className="darkmode-toast" key={toastKey}>
          &#10003; Settings saved successfully
        </div>
      )}
    </div>
  )
}
