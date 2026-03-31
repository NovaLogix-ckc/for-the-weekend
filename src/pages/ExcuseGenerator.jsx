import { useState, useEffect, useRef, useCallback } from 'react'
import './ExcuseGenerator.css'

const openers = [
  'My standup ran long',
  'I was trapped in a Zoom waiting room',
  'My calendar showed this as optional',
  'I had a hard stop at my previous meeting about having hard stops',
  'My VPN decided to have an existential crisis',
  'I was on mute for 20 minutes and nobody told me',
  'My laptop chose violence today',
  'I was deep in a Slack thread that became sentient',
  'The elevator pitched me a startup idea',
  "My badge wouldn't scan and security questioned my life choices",
  'I was ambushed by a drive-by standup',
  'My previous meeting went into overtime like a FIFA match',
  "My coffee hadn't loaded yet",
  'I was stuck behind someone microwaving fish in the kitchen',
  'Someone scheduled over my lunch and I chose chaos',
]

const reasons = [
  'due to an unforeseen paradigm misalignment',
  'because of a critical bandwidth shortage in my calendar',
  'as a result of aggressive cross-functional synergy requirements',
  'owing to an unplanned deep-dive into Q3 projections',
  'due to a mandatory culture moment',
  "because someone said 'quick question' and lied",
  'as a consequence of aggressive action item proliferation',
  'due to a cascading dependency failure in my morning routine',
  'because the previous meeting had no agenda and therefore no end',
  'owing to an impromptu all-hands about the next all-hands',
  'due to someone replying-all to a 200-person thread',
  'because of a critical misalignment between my intentions and reality',
  'as a result of scope creep in my breakfast plans',
  'due to a blocker that was actually three blockers in a trench coat',
  'because my standup became a sitdown',
]

const consequences = [
  'which I deeply regret but will definitely do again tomorrow',
  "and I've already blocked time to process this trauma",
  'but I brought good vibes as compensation',
  "and honestly I'm just glad to be here",
  'though I did use the time to align my chakras with our OKRs',
  'for which I accept zero responsibility',
  'and I would like to formally blame Outlook',
  'but rest assured my commitment to this meeting is now at 110%',
  'which technically makes this a win for work-life balance',
  "and my therapist says that's growth",
]

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function formatTime() {
  const now = new Date()
  const h = now.getHours()
  const m = String(now.getMinutes()).padStart(2, '0')
  const ampm = h >= 12 ? 'PM' : 'AM'
  return `${h % 12 || 12}:${m} ${ampm}`
}

export default function ExcuseGenerator() {
  const [fullExcuse, setFullExcuse] = useState('')
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(false)
  const [timestamp, setTimestamp] = useState(formatTime())
  const intervalRef = useRef(null)

  const generate = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    const excuse = `${pick(openers)}, ${pick(reasons)}, ${pick(consequences)}.`
    setFullExcuse(excuse)
    setDisplayed('')
    setTyping(true)
    setTimestamp(formatTime())
  }, [])

  useEffect(() => {
    if (!typing || !fullExcuse) return

    let index = 0
    intervalRef.current = setInterval(() => {
      index++
      setDisplayed(fullExcuse.slice(0, index))
      if (index >= fullExcuse.length) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        setTyping(false)
      }
    }, 30)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [fullExcuse, typing])

  return (
    <div className="page excuse-page">
      <h1 className="page-title">Why I'm Late To This Meeting</h1>
      <p className="page-subtitle">Corporate-grade alibis generated fresh on demand</p>

      <button className="btn excuse-btn" onClick={generate}>
        {fullExcuse ? 'Generate Another' : 'Generate Excuse'}
      </button>

      {fullExcuse && (
        <div className="excuse-slack card">
          <div className="excuse-slack__header">
            <div className="excuse-slack__avatar">
              <span>{'>_'}</span>
            </div>
            <div className="excuse-slack__meta">
              <span className="excuse-slack__name">you</span>
              <span className="excuse-slack__time">{timestamp}</span>
            </div>
          </div>
          <div className="excuse-slack__body">
            {displayed}
            {typing && <span className="excuse-cursor">|</span>}
          </div>
        </div>
      )}
    </div>
  )
}
