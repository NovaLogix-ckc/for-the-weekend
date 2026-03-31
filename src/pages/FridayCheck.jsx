import { useMemo } from 'react'
import './FridayCheck.css'

const dayData = {
  0: {
    answer: "It's BETTER than Friday",
    className: 'friday-weekend',
    color: 'var(--green)',
    message: 'Why are you checking this at work on a weekend? Go touch grass.',
  },
  1: {
    answer: 'NO',
    className: 'friday-monday',
    color: 'var(--red)',
    message: "It's Monday. The wound is fresh.",
  },
  2: {
    answer: 'NO',
    className: 'friday-tuesday',
    color: 'var(--red)',
    message: "Tuesday. Monday's ugly cousin.",
  },
  3: {
    answer: 'NO',
    className: 'friday-wednesday',
    color: 'var(--red)',
    message: 'Halfway. Hold the line, soldier.',
  },
  4: {
    answer: 'ALMOST',
    className: 'friday-thursday',
    color: 'var(--amber)',
    message: 'So close you can smell the weekend. It smells like pizza.',
  },
  5: {
    answer: 'YES',
    className: 'friday-friday',
    color: 'var(--green)',
    message: 'GET OUT. GO. BE FREE.',
  },
  6: {
    answer: "It's BETTER than Friday",
    className: 'friday-weekend',
    color: 'var(--green)',
    message: 'Why are you checking this at work on a weekend? Go touch grass.',
  },
}

export default function FridayCheck() {
  const day = useMemo(() => new Date().getDay(), [])
  const data = dayData[day]

  return (
    <div className={`page friday-page ${data.className}`}>
      <h1 className="page-title">Is It Friday Yet?</h1>

      <div className="friday-answer-container">
        <span className="friday-answer" style={{ color: data.color }}>
          {data.answer}
        </span>
      </div>

      <p className="friday-message">{data.message}</p>

      {day === 5 && (
        <div className="friday-arrow-container">
          <span className="friday-arrow">&#10132;</span>
        </div>
      )}

      {day === 1 && (
        <div className="friday-notes" aria-hidden="true">
          <span className="friday-note">&#9835;</span>
          <span className="friday-note">&#9834;</span>
          <span className="friday-note">&#9835;</span>
          <span className="friday-note">&#9834;</span>
          <span className="friday-note">&#9835;</span>
        </div>
      )}
    </div>
  )
}
