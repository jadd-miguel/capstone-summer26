import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RoadmapPage from '../pages/@RoadmapPage/Roadmap'
import HomePage from '../pages/HomePage'
import MyInfoPage from '../pages/MyInfoPage'
import './Navbar.css';
import { useState, useEffect } from 'react';

export default function Navbar(): React.JSX.Element {

    const [theme, setTheme] = useState<string>(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = (): void => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };


    return (
        <Router>
            <nav className="top-navbar">
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/roadmaps">Roadmaps</Link></li>
                    <li><Link to="/myinfo">My Info</Link></li>
                    
                    
                    <button 
                        onClick={toggleTheme}
                        style={{
                            padding: '5px 10px',
                            cursor: 'pointer',
                            borderRadius: '5px',
                            border: '1px solid var(--text-color)',
                            background: 'transparent',
                            color: 'var(--text-color)'
                        }}
                    >
                        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                    </button>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<HomePage />} />
                {/*<Route path="/roadmaps" element={<RoadmapPage data={new } />} />*/}
                <Route path="/myinfo" element={<MyInfoPage />} />
                
            </Routes>
        </Router>
    );
}