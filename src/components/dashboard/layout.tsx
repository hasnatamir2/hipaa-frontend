"use client";

import { createContext, useContext, useState } from "react";

import Sidebar from "./sidebar";
import { useAuth } from "@/hooks/useAuth";
import Header from "./header";
import { UserRole } from "@/constants/roles";

const initialDashboardContent = {
    user: {
        role: UserRole.STANDARD_USER, // or any default role
        id: "",
        email: "",
        passwordHash: "",
    }
}

const DashboardContext = createContext(initialDashboardContent);
export const useDashboardContext = () => useContext(DashboardContext);

const DashboardLayout = ({ children }: any) => {
    const { user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    if (!user) return null;

    const handleDrawer = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <DashboardContext.Provider value={{ user }}>
            <Header handleDrawer={handleDrawer} user={user} />

            <Sidebar
                open={sidebarOpen}
                toggleDrawer={handleDrawer}
                user={user}
            />
            <main style={{ marginTop: 64, padding: 16 }}>{children}</main>
        </DashboardContext.Provider>
    );
};

export default DashboardLayout;
