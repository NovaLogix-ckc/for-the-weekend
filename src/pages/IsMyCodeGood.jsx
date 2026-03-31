import { useState, useCallback } from 'react'
import './IsMyCodeGood.css'

const positive = [
  'Yes. A true genius wrote this.',
  'Ship it. Ship it now. Before someone reviews it.',
  'The compiler weeps tears of joy when it sees your code.',
  'This code could run for president.',
  'Senior engineer energy detected.',
  "I showed this to my therapist. She said it's the healthiest thing she's seen all week.",
  'This code has more elegance than a royal wedding.',
  '10/10. Would merge without reading.',
  'Your code is so clean it makes Marie Kondo nervous.',
  'The linter tried to find issues and just sent a thank you note.',
  "I'd mass-produce this into a tattoo.",
  'NASA called. They want to know your secret.',
  'This code sparks joy. I am keeping it.',
  'Poetry. Pure poetry. If poetry compiled.',
  "Your code doesn't have bugs. Bugs have your code.",
]

const negative = [
  'Have you considered a career in landscaping?',
  "This code has a certain... charm. Like a house fire.",
  "I've seen better code in a CAPTCHA.",
  'The error messages have formed a union.',
  'Your code runs? In THIS economy?',
  'This looks like it was written during turbulence.',
  "Even Stack Overflow returned 'no results found.'",
  'The rubber duck quit.',
  "I would describe this code as 'aggressively wrong.'",
  'Your git blame just filed a restraining order.',
  'This code has the structural integrity of a wet napkin.',
  'It works, but at what cost? At WHAT cost?',
  "I'm not angry, I'm just disappointed.",
  'Did you write this with your elbows?',
  'The tests passed, but they were just being polite.',
]

export default function IsMyCodeGood() {
  const [state, setState] = useState('idle') // idle | processing | verdict
  const [verdict, setVerdict] = useState(null)
  const [isPositive, setIsPositive] = useState(false)

  const judge = useCallback(() => {
    setState('processing')
    setVerdict(null)

    setTimeout(() => {
      const good = Math.random() < 0.5
      const pool = good ? positive : negative
      const pick = pool[Math.floor(Math.random() * pool.length)]
      setIsPositive(good)
      setVerdict(pick)
      setState('verdict')
    }, 1500)
  }, [])

  const reset = () => {
    setState('idle')
    setVerdict(null)
  }

  return (
    <div className={`page code-judge-page ${state === 'verdict' ? (isPositive ? 'flash-green' : 'flash-red') : ''}`}>
      <h1 className="page-title">Is My Code Good?</h1>
      <p className="page-subtitle">No need to paste it. We already know.</p>

      <div className="code-judge-arena">
        {state === 'idle' && (
          <button className="btn code-judge-btn" onClick={judge}>
            JUDGE MY CODE
          </button>
        )}

        {state === 'processing' && (
          <button className="btn code-judge-btn code-judge-processing" disabled>
            <span className="analyzing-text">ANALYZING</span>
            <span className="analyzing-dots">
              <span>.</span><span>.</span><span>.</span>
            </span>
          </button>
        )}

        {state === 'verdict' && (
          <>
            <div className={`card code-verdict-card ${isPositive ? 'verdict-positive' : 'verdict-negative'}`}>
              <div className="code-verdict-text">{verdict}</div>
            </div>
            <button className="btn code-judge-again" onClick={reset}>
              [ JUDGE AGAIN ]
            </button>
          </>
        )}
      </div>
    </div>
  )
}
