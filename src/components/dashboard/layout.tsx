"use client";

import Sidebar from "./sidebar";
import Header from "./header";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/constants/roles";

const DashboardLayout = ({ children }: any) => {
    const { user, onLogout } = useAuth();

    if(user?.role !== UserRole.ADMIN) return null

    return (
        <div style={{ display: "flex" }}>
            {/* Sidebar */}
            <Sidebar />
            <div style={{ flexGrow: 1 }}>
                {/* Header */}
                <Header user={user} onLogout={onLogout} />
                {/* Main Content */}
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;
