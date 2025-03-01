"use client";

import { useState } from "react";

import Sidebar from "./sidebar";
import { useAuth } from "@/hooks/useAuth";
import Header from "./header";

const DashboardLayout = ({ children }: any) => {
    const { user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // if (!user) return redirect('/auth/login');

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
