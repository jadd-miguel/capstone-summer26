import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { RoadmapPage } from './pages/RoadmapPage'
import { HomePage } from './pages/HomePage'
import { MyInfoPage } from './pages/MyInfoPage'

function App() {
    return (
        <>
            <Router>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/roadmaps">Roadmaps</Link></li>
                        <li><Link to="/myinfo">My Info</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/roadmaps" element={<RoadmapPage />} />
                    <Route path="/myinfo" element={<MyInfoPage />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
