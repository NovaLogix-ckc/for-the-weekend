import { useState, useRef, useCallback } from 'react'
import './MeetingDetector.css'

const HIGH_WORDS = ['update', 'status', 'sync', 'check-in', 'touch base', 'align', 'recap', 'fyi', 'regroup', 'standup']
const MED_WORDS = ['brainstorm', 'ideate', 'workshop', 'review', 'discuss', 'chat']
const LOW_WORDS = ['decide', 'approve', 'vote', 'deadline', 'launch', 'ship']

function getVerdict(score) {
  if (score <= 30) return { label: 'ACQUITTED', text: 'This meeting may have had a purpose. Rare, but legally possible.' }
  if (score <= 50) return { label: 'MISDEMEANOR', text: "Borderline. Could've been a Slack thread." }
  if (score <= 70) return { label: 'GUILTY', text: 'This meeting was an email wearing a disguise.' }
  if (score <= 85) return { label: 'FELONY', text: 'This meeting committed crimes against productivity.' }
  return { label: 'CAPITAL OFFENSE', text: 'Everyone in this meeting should receive a formal apology and compensation for emotional damages.' }
}

function analyzeScore(input) {
  const lower = input.toLowerCase()
  let score = 40

  HIGH_WORDS.forEach(w => { if (lower.includes(w)) score += 15 + Math.random() * 5 })
  MED_WORDS.forEach(w => { if (lower.includes(w)) score += 8 + Math.random() * 4 })
  LOW_WORDS.forEach(w => { if (lower.includes(w)) score += 3 + Math.random() * 2 })

  if (lower.includes('could have been') || lower.includes('email')) score += 30
  if (lower.includes('hour') || lower.includes('hours')) score += 15
  if (lower.includes('mandatory')) score += 20

  return Math.max(15, Math.min(99, Math.round(score)))
}

export default function MeetingDetector() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [animating, setAnimating] = useState(false)
  const [barWidth, setBarWidth] = useState(0)
  const [showVerdict, setShowVerdict] = useState(false)
  const [shake, setShake] = useState(false)
  const caseNumRef = useRef(null)

  const renderVerdict = useCallback(() => {
    if (!input.trim()) return
    const score = analyzeScore(input)
    const verdict = getVerdict(score)
    caseNumRef.current = Math.floor(1000 + Math.random() * 9000)

    setResult({ score, verdict, description: input.trim() })
    setBarWidth(0)
    setShowVerdict(false)
    setAnimating(true)
    setShake(true)

    setTimeout(() => setShake(false), 500)
    setTimeout(() => setBarWidth(score), 100)
    setTimeout(() => setShowVerdict(true), 1600)
    setTimeout(() => setAnimating(false), 2200)
  }, [input])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      renderVerdict()
    }
  }

  return (
    <div className={`page meeting-page${shake ? ' screen-shake' : ''}`}>
      <h1 className="page-title">Meeting vs. Email Tribunal</h1>
      <p className="page-subtitle">Describe your meeting. Justice will be served.</p>

      <div className="card meeting-input-card">
        <textarea
          className="meeting-textarea"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="We met for 45 minutes to discuss the color of a button..."
          rows={4}
        />
        <button className="btn verdict-btn" onClick={renderVerdict} disabled={!input.trim()}>
          ⚖ Render Verdict
        </button>
      </div>

      {result && (
        <div className="card legal-document">
          <div className="legal-header">
            <span className="legal-line">CASE NO. {caseNumRef.current}</span>
            <span className="legal-line legal-court">THE PRODUCTIVITY TRIBUNAL</span>
            <span className="legal-line legal-division">— Office of Wasted Hours —</span>
          </div>

          <div className="legal-matter">
            <span className="legal-label">IN THE MATTER OF:</span>
            <span className="legal-description">"{result.description}"</span>
          </div>

          <div className="legal-section">
            <span className="legal-label">PROBABILITY OF EMAIL-WORTHINESS:</span>
            <div className="score-bar-track">
              <div
                className="score-bar-fill"
                style={{ width: `${barWidth}%` }}
              />
              <span className="score-bar-label">{barWidth > 0 ? `${result.score}%` : ''}</span>
            </div>
          </div>

          {showVerdict && (
            <div className="verdict-section">
              <div className="verdict-stamp">{result.verdict.label}</div>
              <p className="verdict-text">{result.verdict.text}</p>
            </div>
          )}

          <div className={`gavel${animating ? ' gavel-slam' : ''}`}>
            <span className="gavel-icon">🔨</span>
            <span className="gavel-text">ORDER IN THE COURT</span>
          </div>
        </div>
      )}
    </div>
  )
}
