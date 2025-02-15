'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN } from "@/constants/string";

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        if (!token) {
            // Redirect to login page if no token
            router.push("/auth/login");
        } else {
            setLoading(false); // Proceed to render the protected content
        }
    }, [router]);

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a spinner or loading indicator
    }

    return <>{children}</>;
};

export default PrivateRoute;
