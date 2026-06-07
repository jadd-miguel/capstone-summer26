import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import PrivateRoutes from './components/PrivateRoutes.tsx'
import Header from './components/Header.tsx'
import LoginPage from './pages/LoginPage.tsx'
import HomePage from './pages/HomePage.tsx'
import MyInfoPage from './pages/MyInfoPage.tsx'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { green, blue } from '@mui/material/colors'

function App() {
    const [roadmaps, setRoadmaps] = React.useState([])

    {/* Variable to check if user if logged in */ }
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
    const [isDarkMode, setDarkMode] = React.useState(false);

    const swapTheme = () => {
        setDarkMode((prev) => !prev);
    };

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
            primary: { main: '#1976d2' },
            background: { default: '#f5f5f5', paper: '#ffffff' },
        },
    });

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: { main: '#90caf9' },
            background: { default: '#121212', paper: '#1e1e1e' },
        },
    });

    return (
        <>
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                <CssBaseline/>
                <Router>
                    <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} swapTheme={swapTheme}></Header>
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
            </ThemeProvider>
        </>
    )
}

export default App
