import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Box,
    Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import * as api from '../util/api.ts'

interface HeaderProps {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    isDarkMode: boolean
    swapTheme: () => void;
    alert: (message: string) => void;
}

{/* Component for the bar at the top*/ }
export default function Header({ isAuthenticated, setIsAuthenticated, swapTheme, isDarkMode, alert }: HeaderProps): React.JSX.Element {

    {/* Variable used for dropdown menu*/ }
    const [menuAnchorElement, setMenuAnchorElement] = useState<null | HTMLElement>(null);
    const navigate = useNavigate()

    return (<>
        <AppBar position="sticky">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Typography variant="h6" sx={{ mr: 2 }} onClick={() => (navigate("/login"))}>
                        NaviSkill AI
                    </Typography>

                    {/* Only show this if authenticated */}
                    {isAuthenticated && (
                        <>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/home"
                            >
                                Home
                            </Button>

                            <Button
                                color="inherit"
                                component={Link}
                                to="/info"
                            >
                                Info
                            </Button>
                        </>
                    )}

                </Box>

                {/* Icon on the top right */}
                <IconButton color="inherit" onClick={(e) => setMenuAnchorElement(e.currentTarget)}>
                    <MenuIcon />
                </IconButton>
            </Toolbar >
        </AppBar >

        {/* Dropdown Menu on the right */}
        <Menu anchorEl={menuAnchorElement}
            open={Boolean(menuAnchorElement)}
            onClose={() => setMenuAnchorElement(null)}
        >

            <MenuItem onClick={swapTheme}>{isDarkMode ? 'Light' : 'Dark'} Mode</MenuItem>

            {/* Debbug Feature Remove Later */}
            {!isAuthenticated && (
                <MenuItem onClick={() => { setIsAuthenticated(true); navigate("/home") }}>Bypass login</MenuItem>
            )}

            {isAuthenticated && (
                <MenuItem onClick={() => { navigate("/profiles") }}>Profiles</MenuItem>
            )}


            {/* Logout button */}
            {isAuthenticated && (
                <MenuItem onClick={() => { setIsAuthenticated(false); api.auth.logout() }}>Log Out</MenuItem>
            )}

        </Menu>
    </>);
};
