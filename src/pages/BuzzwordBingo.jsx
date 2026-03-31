import { useState, useCallback, useEffect, useRef } from 'react'
import './BuzzwordBingo.css'

const BUZZWORDS = [
  'synergy', 'circle back', 'low-hanging fruit', 'move the needle', 'deep dive',
  'leverage', 'bandwidth', 'take this offline', 'action items', 'align',
  'pivot', 'ecosystem', 'scalable', 'drill down', 'unpack',
  'double-click on that', 'net-net', 'boil the ocean', 'blue-sky thinking', 'north star',
  'value-add', 'best practice', 'stakeholder', 'thought leader', 'paradigm shift',
  'touch base', 'loop in', 'ping', 'flag', 'parking lot',
  'table this', 'socialize', 'lean in', 'rock star', 'ninja',
  'guru', 'disrupt', 'innovation', 'holistic', 'granular',
  'robust', 'seamless', 'optimize', 'iterate', 'deliverable',
  'KPI', 'ROI', 'EOD', 'OKR', 'vertical',
  'horizontal alignment', 'cross-pollinate', 'cadence', 'runway',
]

const FREE_SPACE = "FREE SPACE (you're still in this meeting)"

function shuffle(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function generateCard() {
  const shuffled = shuffle(BUZZWORDS).slice(0, 24)
  const grid = []
  let idx = 0
  for (let r = 0; r < 5; r++) {
    const row = []
    for (let c = 0; c < 5; c++) {
      if (r === 2 && c === 2) {
        row.push({ text: FREE_SPACE, marked: true, isFree: true })
      } else {
        row.push({ text: shuffled[idx++], marked: false, isFree: false })
      }
    }
    grid.push(row)
  }
  return grid
}

function checkBingo(grid) {
  const lines = []

  // Rows
  for (let r = 0; r < 5; r++) {
    lines.push(grid[r].map((_, c) => [r, c]))
  }
  // Columns
  for (let c = 0; c < 5; c++) {
    lines.push(grid.map((_, r) => [r, c]))
  }
  // Diagonals
  lines.push([0, 1, 2, 3, 4].map(i => [i, i]))
  lines.push([0, 1, 2, 3, 4].map(i => [i, 4 - i]))

  for (const line of lines) {
    if (line.every(([r, c]) => grid[r][c].marked)) {
      return line
    }
  }
  return null
}

export default function BuzzwordBingo() {
  const [grid, setGrid] = useState(() => generateCard())
  const [winLine, setWinLine] = useState(null)
  const [showVictory, setShowVictory] = useState(false)
  const [staggerIn, setStaggerIn] = useState(true)
  const [particles, setParticles] = useState([])
  const victoryDismissed = useRef(false)

  useEffect(() => {
    const timer = setTimeout(() => setStaggerIn(false), 1500)
    return () => clearTimeout(timer)
  }, [grid])

  const toggleCell = useCallback((r, c) => {
    if (showVictory || (r === 2 && c === 2)) return

    setGrid(prev => {
      const next = prev.map(row => row.map(cell => ({ ...cell })))
      next[r][c].marked = !next[r][c].marked

      const bingo = checkBingo(next)
      if (bingo && !victoryDismissed.current) {
        setWinLine(bingo)
        setShowVictory(true)
        setParticles(
          Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            angle: Math.random() * 360,
            distance: 60 + Math.random() * 140,
            size: 4 + Math.random() * 8,
            delay: Math.random() * 0.3,
          }))
        )
      }

      return next
    })
  }, [showVictory])

  const newCard = useCallback(() => {
    setGrid(generateCard())
    setWinLine(null)
    setShowVictory(false)
    setStaggerIn(true)
    setParticles([])
    victoryDismissed.current = false
  }, [])

  const dismissVictory = useCallback(() => {
    setShowVictory(false)
    victoryDismissed.current = true
  }, [])

  const isWinCell = (r, c) => {
    if (!winLine) return false
    return winLine.some(([wr, wc]) => wr === r && wc === c)
  }

  return (
    <div className="page bingo-page">
      <h1 className="page-title">Buzzword Bingo</h1>
      <p className="page-subtitle">Open this in your next all-hands. Winner leaves early (honour system).</p>

      <button className="btn new-card-btn" onClick={newCard}>
        ⟳ New Card
      </button>

      <div className="bingo-grid">
        {grid.map((row, r) =>
          row.map((cell, c) => {
            const cellIndex = r * 5 + c
            return (
              <button
                key={`${r}-${c}-${cell.text}`}
                className={
                  'bingo-cell' +
                  (cell.marked ? ' marked' : '') +
                  (cell.isFree ? ' free-space' : '') +
                  (isWinCell(r, c) ? ' win-cell' : '') +
                  (staggerIn ? ' stagger-in' : '')
                }
                style={staggerIn ? { animationDelay: `${cellIndex * 0.04}s` } : undefined}
                onClick={() => toggleCell(r, c)}
              >
                <span className="cell-text">{cell.text}</span>
                {cell.marked && !cell.isFree && <span className="cell-check">✓</span>}
                {cell.isFree && <span className="cell-check free-check">★</span>}
              </button>
            )
          })
        )}
      </div>

      {showVictory && (
        <div className="victory-overlay" onClick={dismissVictory}>
          {particles.map(p => (
            <span
              key={p.id}
              className="victory-particle"
              style={{
                '--px': `${p.x}%`,
                '--py': `${p.y}%`,
                '--angle': `${p.angle}deg`,
                '--distance': `${p.distance}px`,
                '--size': `${p.size}px`,
                '--delay': `${p.delay}s`,
              }}
            />
          ))}
          <div className="victory-content">
            <div className="victory-bingo">BINGO!</div>
            <p className="victory-sub">You may now leave the meeting with dignity.</p>
            <p className="victory-dismiss">(click anywhere to dismiss)</p>
          </div>
        </div>
      )}
    </div>
  )
}
