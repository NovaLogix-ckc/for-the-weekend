import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import FridayCheck from './pages/FridayCheck'
import ExcuseGenerator from './pages/ExcuseGenerator'
import DarkModeToggle from './pages/DarkModeToggle'
import ApologyEscalator from './pages/ApologyEscalator'
import LoadingForever from './pages/LoadingForever'
import IsMyCodeGood from './pages/IsMyCodeGood'
import MeetingDetector from './pages/MeetingDetector'
import PassiveAggressive from './pages/PassiveAggressive'
import NodButton from './pages/NodButton'
import BuzzwordBingo from './pages/BuzzwordBingo'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/friday" element={<FridayCheck />} />
          <Route path="/excuses" element={<ExcuseGenerator />} />
          <Route path="/dark-mode" element={<DarkModeToggle />} />
          <Route path="/apology" element={<ApologyEscalator />} />
          <Route path="/loading" element={<LoadingForever />} />
          <Route path="/code-check" element={<IsMyCodeGood />} />
          <Route path="/meeting" element={<MeetingDetector />} />
          <Route path="/compliments" element={<PassiveAggressive />} />
          <Route path="/nod" element={<NodButton />} />
          <Route path="/bingo" element={<BuzzwordBingo />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
