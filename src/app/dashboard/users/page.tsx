"use client";

import { UserRoleTitle, UserRole } from "@/constants/roles";
import { useAllUsers } from "@/hooks/useUsers";
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
} from "@mui/material";
import {
    AdminPanelSettings,
    HealthAndSafety,
    Person,
    PersonAdd,
} from "@mui/icons-material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import RegisterForm from "@/components/auth/register-form";
import { useState } from "react";

const UserRoleIcon = new Map([
    [UserRole.ADMIN, <AdminPanelSettings />],
    [UserRole.HEALTH_PROFESSIONAL, <HealthAndSafety />],
    [UserRole.STANDARD_USER, <Person />],
]);

export default function UsersPage() {
    const { data: users, isLoading } = useAllUsers();
    const [selectedUser, setSelectedUser] = useState({});
    const [openRegisterUser, setOpenRegisterModal] = useState(false);

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 300 },
        { field: "email", headerName: "Email", width: 300 },
        {
            field: "role",
            headerName: "Role",
            width: 200,
            renderCell: (params: GridCellParams) => (
                <Chip
                    label={UserRoleTitle.get(params?.value as UserRole)}
                    icon={UserRoleIcon.get(params?.value as UserRole)}
                />
            ),
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
                <Button
                    onClick={() => {
                        setSelectedUser(params.row);
                        setOpenRegisterModal(true);
                    }}
                >
                    Update Role
                </Button>
            ),
        },
    ];

    return (
        <Container>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant='h4'>
                    All Users ({users?.length || 0})
                </Typography>
                <Button
                    startIcon={<PersonAdd />}
                    variant='contained'
                    onClick={() => setOpenRegisterModal(true)}
                >
                    Add User
                </Button>
            </Box>
            <Box sx={{ height: 500, width: "100%", marginTop: 2 }}>
                <DataGrid rows={users} columns={columns} />
            </Box>
            {openRegisterUser && (
                <RegisterForm
                    selectedUser={selectedUser}
                    open={openRegisterUser}
                    onClose={() => setOpenRegisterModal(false)}
                />
            )}
        </Container>
    );
}
