"use client";

import { useState } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";

import Sidebar from "./sidebar";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/constants/roles";

const DashboardLayout = ({ children }: any) => {
    const { user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (user?.role !== UserRole.ADMIN) return null;

    const handleDrawer = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <AppBar position='fixed'>
                <Toolbar>
                    <IconButton
                        edge='start'
                        color='inherit'
                        onClick={handleDrawer}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant='h6' sx={{ flexGrow: 1 }}>
                        Hipaa - Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>

            <Sidebar open={sidebarOpen} toggleDrawer={handleDrawer} />
            <div style={{ marginTop: 64, padding: 16 }}>
                {children}
            </div>
        </>
    );
};

export default DashboardLayout;
