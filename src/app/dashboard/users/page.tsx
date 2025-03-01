"use client";

import { useAllUsers } from "@/hooks/useUsers";

export default function UsersPage() {
        const { data: users } = useAllUsers();
    
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <p>CreateUserPage</p>
        </div>
    );
}
