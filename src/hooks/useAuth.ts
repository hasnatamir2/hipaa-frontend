'use client';

import { ACCESS_TOKEN, USER } from "@/constants/string";
import { IUserData } from "@/interfaces";
import { loginService, registerService } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Custom hook for user registration
export const useRegister = () => {
    return useMutation({
        mutationKey: ["register"],
        mutationFn: registerService,
    });
};

// Custom hook for user login
export const useLogin = ({ onSuccess, onError }: any) => {

    return useMutation({
        mutationKey: ["login"],
        mutationFn: loginService,
        onSuccess,
        onError,
    });
};

export const useAuth = () => {
    const [user, setUser] = useState<IUserData | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Simulate fetching user from an API or localStorage
        const storedUser = localStorage.getItem(USER);
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            router.push("/auth/login"); // Redirect if no user found
        }
    }, []);

    const onLogout = () => {
        // Remove user data from localStorage and redirect to login
        localStorage.removeItem(USER);
        localStorage.removeItem(ACCESS_TOKEN);
        setUser(null);
        router.push("/");
    };

    return { user, onLogout };
};
