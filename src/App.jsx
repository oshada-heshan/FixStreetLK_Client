import './App.css'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/HomePage'
import ReportDetail from './pages/ReportDetail'
import ReportModal from './componenets/ReportModal'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reports/:id" element={<ReportDetail />} />
      <Route path="/report" element={<ReportModal />} />
    </Routes>)
}

export default App