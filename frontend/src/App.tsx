import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import PrivateRoutes from './components/PrivateRoutes.tsx'
import Header from './components/Header.tsx'
import LoginPage from './pages/LoginPage.tsx'
import HomePage from './pages/HomePage.tsx'
import MyInfoPage from './pages/MyInfoPage.tsx'
import { CssBaseline, Snackbar, ThemeProvider, createTheme } from '@mui/material'
import SignupPage from './pages/SignupPage.tsx'

function App() {
    //const [roadmaps, setRoadmaps] = React.useState([])

    {/* Snackbar object */ }
    const [snackbar, setSnackBar] = React.useState({
        open: false,
        message: ""
    });

    {/* Snackbar funtion */ }
    const alert = (message: string) => {
        setSnackBar({
            open: true,
            message,
        })
    }

    {/* Variable to check if user if logged in */ }
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

                {/* Used for Light/Dark Theme */}
                <CssBaseline />

                <Router>
                    <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} swapTheme={swapTheme} isDarkMode={isDarkMode} alert={alert}></Header>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/login" element={<LoginPage alert={alert} setIsAuthenticated={setIsAuthenticated} />} />
                        <Route path="/signup" element={<SignupPage alert={alert} />} />

                        {/* Protected Routes Wrapper */}
                        {/* isAuthenticated needs to be true to be able to access them */}
                        {/* Any new pages should go inside this Route */}
                        <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>
                            <Route path="/home" element={<HomePage alert={alert} />} />
                            <Route path="/info" element={<MyInfoPage />} />
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
