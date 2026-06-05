import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import PrivateRoutes from './components/PrivateRoutes.tsx'
import Header from './components/Header.tsx'
import LoginPage from './pages/LoginPage.tsx'
import HomePage from './pages/HomePage.tsx'
import MyInfoPage from './pages/MyInfoPage.tsx'

function App() {
    const [roadmaps, setRoadmaps] = React.useState([])

    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

    return (
        <>
            <Router>
                <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}></Header>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />

                    {/* Protected Routes Wrapper */}
                    <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/info" element={<MyInfoPage />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
