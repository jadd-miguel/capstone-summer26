import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RoadmapPage from './pages/RoadmapPage'
import HomePage from './pages/HomePage'
import MyInfoPage from './pages/MyInfoPage'
import JobDescPage from './pages/JobDescPage';

function App() {
    const [roadmaps, setRoadmaps] = React.useState([])

    return (
        <>
            <Router>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/roadmaps">Roadmaps</Link></li>
                        <li><Link to="/myinfo">My Info</Link></li>
                        <li><Link to="/jobdescriptions">Job Descriptions</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/roadmaps" element={<RoadmapPage />} />
                    <Route path="/myinfo" element={<MyInfoPage />} />
                    <Route path="/jobdescriptions" element={<JobDescPage />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
