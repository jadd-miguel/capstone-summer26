import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import PrivateRoutes from './components/PrivateRoutes.tsx'
import Header from './components/Header.tsx'
import LoginPage from './pages/LoginPage.tsx'
import HomePage from './pages/HomePage.tsx'
import MyInfoPage from './pages/MyInfoPage.tsx'
import ProfilesPage from './pages/ProfilesPage.tsx'
import Roadmap from './pages/@RoadmapPage/Roadmap.tsx'
import ResumePage from './pages/ResumePage.tsx'
import CoverLetterPage from './pages/CoverLetterPage.tsx'
import ResumeUploadPage from './pages/ResumeUploadPage.tsx' // Added upload page import
import { CssBaseline, Snackbar, ThemeProvider, createTheme } from '@mui/material'
import SignupPage from './pages/SignupPage.tsx'
import RoadmapPage from './pages/RoadmapPage.tsx'
import QualJobPage from './pages/QualJobPage.tsx'

import {UserProfile, Profile} from './util/Profiles.ts'

function App() {
    const [userProfile, setUserProfile] = React.useState<UserProfile>(new UserProfile("Place Holder", [new Profile("Role 1", ["Job 1", "Job 2"], ["Qual 1", "Qual 2"]), new Profile("Role 2", ["Job 3", "Job 4"], ["Qual 3", "Qual 4"])]));

    {/* Snackbar object */ }
    const [snackbar, setSnackBar] = React.useState({
        open: false,
        message: ""
    });

    {/* Snackbar function */ }
    const alert = (message: string) => {
        setSnackBar({
            open: true,
            message,
        })
    }

    {/* Variable to check if user is logged in */ }
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

    {/* Variable to use in Light/Dark Mode */ }
    const [isDarkMode, setDarkMode] = React.useState(false);

    {/* Swap Themes */ }
    const swapTheme = () => {
        setDarkMode((prev) => !prev);
    };

    {/* Light/Dark Themes */ }
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
            background: { default: '#1e1e1e', paper: '#1e1e1e' },
        },
    });

    return (
        <>
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                <CssBaseline />

                <Router>
                    <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} swapTheme={swapTheme} isDarkMode={isDarkMode} alert={alert}></Header>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/login" element={<LoginPage alert={alert} setIsAuthenticated={setIsAuthenticated} userProfile={userProfile} setUserProfile={setUserProfile} />} />
                        <Route path="/signup" element={<SignupPage alert={alert} />} />

                        {/* Protected Routes Wrapper */}
                        <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>
                            <Route path="/home" element={<HomePage alert={alert} />} />
                            <Route path="/info" element={<QualJobPage />} />
                            <Route path="/profiles" element={<ProfilesPage alert={alert} userProfile={userProfile} setUserProfile={setUserProfile} />} />
                            <Route path="/resume" element={<ResumePage alert={alert} userProfile={userProfile} />} />
                            <Route path="/coverLetter" element={<CoverLetterPage alert={alert} userProfile={userProfile} />} />
                            <Route path="/roadmap" element={<RoadmapPage/>} />
                            <Route path="/upload" element={<ResumeUploadPage alert={alert} />} />
                        </Route>

                        {/* Default route navigate to /login */}
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>

                    <Snackbar
                        open={snackbar.open}
                        autoHideDuration={5000}
                        onClose={() => {
                            setSnackBar({ open: false, message: "" })
                        }}
                        message={snackbar.message}
                    />
                </Router>
            </ThemeProvider>
        </>
    )
}

export default App