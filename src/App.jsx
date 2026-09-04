import './App.css'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/HomePage'
import ReportIssue from './componenets/ReportIssue'
import ReportDetail from './pages/ReportDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/report" element={<ReportIssue />} />
      <Route path="/reports/:id" element={<ReportDetail />} />
    </Routes>)
}

export default App