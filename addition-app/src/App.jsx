import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import TokenEntry from "./components/TokenEntry"
import TokenDisplay from "./components/TokenDisplay"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TokenEntry />} />
        <Route path="/display" element={<TokenDisplay />} />
      </Routes>
    </Router>
  )
}

export default App
