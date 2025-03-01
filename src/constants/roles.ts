export enum UserRole {
    STANDARD_USER = "STANDARD_USER",
    ADMIN = "ADMIN",
    HEALTH_PROFESSIONAL = "HEALTH_PROFESSIONAL",
}

export const UserRoleTitle = new Map([
    ["STANDARD_USER", "Standard User"],
    ["ADMIN", "Admin"],
    ["HEALTH_PROFESSIONAL", "Health Professional"],
]);
