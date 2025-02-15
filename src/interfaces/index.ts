import { UserRole } from "@/constants/roles";

export interface IUserData {
    role: UserRole;
    id: string;
    email: string;
    passwordHash: string;
}
