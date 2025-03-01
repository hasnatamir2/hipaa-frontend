// pages/admin/UserGroups.tsx
import React from "react";
import UserGroupForm from "@/components/dashboard/user-group/user-group-form";
import UserGroupList from "@/components/dashboard/user-group/user-group-list";
import { Container, Typography } from "@mui/material";

const UserGroupsPage = () => {
    return (
        <Container>
            <Typography variant='h4'>Manage User Groups</Typography>
            <UserGroupForm />
            <UserGroupList />
        </Container>
    );
};

export default UserGroupsPage;
