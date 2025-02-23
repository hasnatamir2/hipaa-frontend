"use client";

import { useState } from "react";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu, Logout, CloudUpload } from "@mui/icons-material";

import Sidebar from "./sidebar";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/constants/roles";
import Header from "./header";

const DashboardLayout = ({ children }: any) => {
    const { user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // if (user?.role !== UserRole.ADMIN) return null;

    const handleDrawer = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <Header handleDrawer={handleDrawer} user={user} />

            <Sidebar open={sidebarOpen} toggleDrawer={handleDrawer} />
            <main style={{ marginTop: 64, padding: 16 }}>{children}</main>
        </>
    );
};

export default DashboardLayout;
