import { useState, useCallback } from 'react'
import './PassiveAggressive.css'

const compliments = [
  "You always bring such a... unique energy to the team.",
  "I love how you're not afraid to ask questions other people already know the answer to.",
  "Your confidence is truly something.",
  "You're so brave for sending that email to the whole company.",
  "I admire how you never let feedback change who you are.",
  "It's amazing how you always find the most... creative solution.",
  "You have a real talent for keeping meetings interesting. And long. Mostly long.",
  "I wish I had your ability to not overthink things.",
  "You're proof that experience isn't everything.",
  "The way you prioritize work-life balance is... inspiring to some of us.",
  "I love that you always speak your mind. Really. All of it. Every time.",
  "Your desk is so... lived-in. It has personality.",
  "You always manage to surprise us. Always.",
  "I appreciate how you keep expectations manageable.",
  "The team definitely notices when you're not here.",
  "You bring a certain... energy... to our Slack channels.",
  "Your willingness to volunteer others for tasks is truly selfless.",
  "I love how you interpret deadlines as more of a suggestion.",
  "You're really making that role your own. Way own.",
  "Your emails are always so... thorough. Every. Single. Detail.",
  "I admire your commitment to asking 'Can you see my screen?' at the start of every meeting.",
  "You really know how to make a simple task into an adventure.",
  "Your out-of-office messages are the most engaging thing in my inbox.",
  "I wish more people had your tolerance for unread notifications.",
  "You're like a human version of 'Reply All.'",
  "Your font choices in presentations are... bold. In every sense.",
  "I respect how you've never once let the agenda stop you.",
  "You always find a way to make group projects... educational.",
  "Your relationship with the mute button is truly aspirational.",
  "I love how you treat every Zoom call like a podcast appearance.",
]

function pickRandom(arr, exclude) {
  let pick
  do {
    pick = arr[Math.floor(Math.random() * arr.length)]
  } while (pick === exclude && arr.length > 1)
  return pick
}

export default function PassiveAggressive() {
  const [current, setCurrent] = useState(null)
  const [flipping, setFlipping] = useState(false)
  const [rotation] = useState(() => -3 + Math.random() * 6)
  const [cardRotation, setCardRotation] = useState(rotation)
  const [lineReveal, setLineReveal] = useState(false)

  const generate = useCallback(() => {
    setFlipping(true)
    setLineReveal(false)

    setTimeout(() => {
      const next = pickRandom(compliments, current)
      setCurrent(next)
      setCardRotation(-3 + Math.random() * 6)
      setFlipping(false)
      setTimeout(() => setLineReveal(true), 100)
    }, 400)
  }, [current])

  return (
    <div className="page passive-page">
      <h1 className="page-title">The Compliment Machine</h1>
      <p className="page-subtitle">Workplace-safe. Plausibly deniable. Emotionally devastating.</p>

      <button className="btn generate-btn" onClick={generate}>
        ✦ Generate Compliment
      </button>

      <div className="compliment-area">
        {current && (
          <div
            className={`sticky-note${flipping ? ' flipping' : ''}${lineReveal ? ' revealed' : ''}`}
            style={{ '--card-rot': `${cardRotation}deg` }}
          >
            <div className="sticky-pin" />
            <div className="sticky-content">
              <p className="sticky-text">{current}</p>
            </div>
            <div className="sticky-footer">
              <span>— HR-approved™</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
