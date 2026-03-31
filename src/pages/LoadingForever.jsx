import { useState, useEffect, useRef } from 'react'
import './LoadingForever.css'

const messages = [
  { text: 'Initializing the initializer...', pct: 3 },
  { text: 'Reticulating splines...', pct: 8 },
  { text: 'Asking the intern...', pct: 15 },
  { text: 'Downloading more RAM...', pct: 22 },
  { text: 'Consulting Stack Overflow...', pct: 31 },
  { text: 'Mass-producing synergies...', pct: 38 },
  { text: 'Calibrating the vibe...', pct: 44 },
  { text: 'Deploying to production (just kidding)...', pct: 52 },
  { text: 'Blaming the previous developer...', pct: 59 },
  { text: 'Consulting the magic 8-ball...', pct: 67 },
  { text: 'Aligning the planets...', pct: 74 },
  { text: 'Almost there (lying)...', pct: 81 },
  { text: 'Blaming the network...', pct: 87 },
  { text: 'So close you can taste it...', pct: 92 },
  { text: 'Just kidding, starting over...', pct: 0 },
]

export default function LoadingForever() {
  const [msgIndex, setMsgIndex] = useState(0)
  const [filesProcessed, setFilesProcessed] = useState(0)
  const filesRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    filesRef.current = setInterval(() => {
      setFilesProcessed((n) => n + Math.floor(Math.random() * 47) + 3)
    }, 800)
    return () => clearInterval(filesRef.current)
  }, [])

  const current = messages[msgIndex]

  return (
    <div className="loading-forever-page">
      <div className="loading-glitch-overlay" />

      <div className="loading-orbit">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="loading-orbit-dot"
            style={{ '--dot-i': i }}
          />
        ))}
      </div>

      <div className="loading-center">
        <div className="loading-spinner" />

        <div className="loading-bar-container">
          <div className="loading-bar-track">
            <div
              className="loading-bar-fill"
              style={{ width: `${current.pct}%` }}
            />
          </div>
        </div>

        <div className="loading-pct">{current.pct}%</div>

        <div className="loading-status">{current.text}</div>

        <div className="loading-cursor">&#x2588;</div>

        <div className="loading-files">
          {filesProcessed.toLocaleString()} files processed
        </div>
      </div>

      <div className="loading-footer">
        Estimated time remaining: Yes
      </div>
    </div>
  )
}
