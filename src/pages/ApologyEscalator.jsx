import { useState } from 'react'
import './ApologyEscalator.css'

const apologies = [
  (input) =>
    `Hi team, I wanted to quickly address ${input}. This was an oversight on my part and I've already taken steps to ensure it doesn't happen again. Best regards.`,
  (input) =>
    `To whom it may concern, I am writing to express my sincerest, most heartfelt apologies regarding ${input}. I have not slept since the incident. I have created a 47-slide deck analyzing what went wrong. Please find attached my shame.`,
  (input) =>
    `Dear everyone I have ever worked with, The events surrounding ${input} have forced me to re-examine not just my career, but my very existence. I have stared into the void and the void sent me a calendar invite. I am now questioning whether any of my contributions to this company have been real, or if I have simply been a bug in the matrix this whole time.`,
  (input) =>
    `URGENT - ALL STAFF. RE: ${input}. I have tendered my resignation effective immediately. I have CC'd the board, HR, my mother, and the ghost of Steve Jobs. My desk plant has been watered and my Slack status set to 'haunting this org from the astral plane.' I wish you all well, except Gerald from accounting. He knows what he did.`,
  (input) =>
    `This is an automated message. The person you are trying to reach regarding ${input} is no longer available. They were last seen heading north with a sleeping bag and a copy of Walden. They have no WiFi. The squirrels are their colleagues now. They report that the squirrels have better work-life balance and have never once asked them to 'jump on a quick call.' Do not attempt to find them. They are at peace. Their out-of-office is set to 'forever.'`,
]

const subjects = [
  'Quick follow-up',
  'My sincerest apologies',
  'Re: Re: Re: My existence',
  'URGENT - RESIGNATION EFFECTIVE IMMEDIATELY',
  '[AUTO-REPLY] Gone forever',
]

const froms = [
  'you@company.com',
  'you@company.com (crying)',
  'you@company.com (questioning reality)',
  'former-employee@void.com',
  'no-reply@the-wilderness.org',
]

export default function ApologyEscalator() {
  const [input, setInput] = useState('')
  const [level, setLevel] = useState(0)

  const crime = input.trim() || 'the incident'

  const escalate = () => {
    if (level < 5) setLevel((l) => l + 1)
  }

  const reset = () => {
    setLevel(0)
  }

  return (
    <div className={`page apology-page apology-level-${level}`}>
      <h1 className="page-title">The Apology Email Escalator</h1>
      <p className="page-subtitle">Type your crime. We'll handle the groveling.</p>

      <div className="apology-input-row">
        <input
          type="text"
          placeholder="I accidentally replied-all..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={level > 0}
        />
      </div>

      {level > 0 && (
        <div className="apology-level-indicator">
          <span className="apology-level-text">ESCALATION LEVEL: {level}/5</span>
          <div className="apology-bar-track">
            <div
              className="apology-bar-fill"
              style={{ width: `${(level / 5) * 100}%` }}
            />
          </div>
        </div>
      )}

      {level > 0 && (
        <div className={`apology-email card apology-shake-${level}`}>
          <div className="email-header">
            <div className="email-field">
              <span className="email-label">From:</span>
              <span>{froms[level - 1]}</span>
            </div>
            <div className="email-field">
              <span className="email-label">To:</span>
              <span>{level < 4 ? 'team@company.com' : 'everyone-who-has-ever-lived@earth.com'}</span>
            </div>
            <div className="email-field">
              <span className="email-label">Subject:</span>
              <span>{subjects[level - 1]}</span>
            </div>
          </div>
          <div className="email-divider" />
          <div className={`email-body apology-italic-${level}`}>
            {apologies[level - 1](crime)}
          </div>
        </div>
      )}

      <div className="apology-actions">
        {level < 5 ? (
          <button className="btn apology-escalate-btn" onClick={escalate}>
            {level === 0 ? '[ ESCALATE ]' : '[ ESCALATE FURTHER ]'}
          </button>
        ) : (
          <button className="btn apology-reset-btn" onClick={reset}>
            [ START OVER ]
          </button>
        )}
      </div>
    </div>
  )
}
