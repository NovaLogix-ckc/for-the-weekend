import { useState, useCallback } from 'react'
import './NodButton.css'

const fonts = [
  'Comic Sans MS, cursive',
  'Impact, sans-serif',
  'Times New Roman, serif',
  'Courier New, monospace',
  'Georgia, serif',
  'Trebuchet MS, sans-serif',
  'Palatino, serif',
  'Lucida Console, monospace',
  'Arial Black, sans-serif',
  'Brush Script MT, cursive',
  'Copperplate, fantasy',
  'Papyrus, fantasy',
  'Garamond, serif',
  'Verdana, sans-serif',
  'Book Antiqua, serif',
]

const entrances = ['slide-left', 'slide-right', 'scale-up', 'drop-down']

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

export default function NodButton() {
  const [nods, setNods] = useState([])
  const [count, setCount] = useState(0)
  const [pressed, setPressed] = useState(false)
  const [ripples, setRipples] = useState([])

  const handleNod = useCallback(() => {
    setPressed(true)
    setTimeout(() => setPressed(false), 200)

    const rippleId = Date.now()
    setRipples(prev => [...prev, rippleId])
    setTimeout(() => setRipples(prev => prev.filter(r => r !== rippleId)), 700)

    const newNod = {
      id: Date.now() + Math.random(),
      font: fonts[Math.floor(Math.random() * fonts.length)],
      size: `${randomBetween(1.5, 5).toFixed(1)}rem`,
      rotation: `${randomBetween(-10, 10).toFixed(1)}deg`,
      entrance: entrances[Math.floor(Math.random() * entrances.length)],
    }

    setNods(prev => [...prev.slice(-(7)), newNod])
    setCount(c => c + 1)
  }, [])

  return (
    <div className="page nod-page">
      <h1 className="page-title">The Nod Button</h1>
      <p className="page-subtitle">For when you have nothing to add but want to seem engaged.</p>

      <div className="nod-button-container">
        <button
          className={`nod-button${pressed ? ' pressed' : ''}`}
          onClick={handleNod}
        >
          NOD
        </button>
        {ripples.map(id => (
          <span key={id} className="nod-ripple" />
        ))}
      </div>

      <div className="yep-history">
        {nods.map(nod => (
          <span
            key={nod.id}
            className={`yep-item yep-${nod.entrance}`}
            style={{
              fontFamily: nod.font,
              fontSize: nod.size,
              transform: `rotate(${nod.rotation})`,
            }}
          >
            Yep.
          </span>
        ))}
      </div>

      {count > 0 && (
        <p className="nod-counter">
          You have nodded {count} time{count !== 1 ? 's' : ''}. Your manager is impressed.
        </p>
      )}
    </div>
  )
}
