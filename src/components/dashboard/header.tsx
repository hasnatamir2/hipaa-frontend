'use client';

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const Header = ({ user, onLogout }: any) => {
    const router = useRouter();

    const handleLogout = () => {
        // Call your logout API or remove authentication token
        onLogout();
    };

    return (
        <AppBar position='sticky'>
            <Toolbar>
                <Typography variant='h6' sx={{ flexGrow: 1 }}>
                    Dashboard
                </Typography>
                <Button color='inherit' onClick={handleLogout}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
