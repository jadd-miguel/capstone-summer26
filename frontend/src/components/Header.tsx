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

interface HeaderProps {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function Header({ isAuthenticated, setIsAuthenticated }: HeaderProps): React.JSX.Element {

    const [menuAnchorElement, setMenuAnchorElement] = useState<null | HTMLElement>(null);
    let navigate = useNavigate()

    return (<>
        <AppBar position="sticky">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Typography variant="h6" sx={{ mr: 2 }}>
                        NaviSkill AI
                    </Typography>

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

                <IconButton color="inherit" onClick={(e) => setMenuAnchorElement(e.currentTarget)}>
                    <MenuIcon />
                </IconButton>
            </Toolbar >
        </AppBar >


        <Menu anchorEl={menuAnchorElement}
            open={Boolean(menuAnchorElement)}
            onClose={() => setMenuAnchorElement(null)}
        >
            <MenuItem onClick={() => { setIsAuthenticated(false) }}>Log Out</MenuItem>
        </Menu>
    </>);
};
