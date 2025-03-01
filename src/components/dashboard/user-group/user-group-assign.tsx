"use client";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
    List,
    ListItem,
    ListItemText,
    Select,
    MenuItem,
    Button,
    Box,
    Typography,
    CircularProgress,
} from "@mui/material";
import { useAllUsers } from "@/hooks/useUsers";
import { useAllUserGroup, useAssignUserToGroup } from "@/hooks/useUserGroup";

const UserGroupAssignment = () => {
    const [selectedGroup, setSelectedGroup] = useState("");
    const queryClient = useQueryClient();

    const { data: users, isLoading: usersLoading } = useAllUsers();
    const { data: groups, isLoading: groupsLoading } = useAllUserGroup();

    const mutation = useAssignUserToGroup({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-all-users"] }); // Invalidate to refetch user group assignment data
        },
    });

    const handleAssign = (userId: string) => {
        mutation.mutate({ userId, groupId: selectedGroup });
    };

    if (usersLoading || groupsLoading) return <CircularProgress/>;

    return (
        <Box>
            <Typography variant="h4">Assign Users to Groups</Typography>
            <Select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                fullWidth
            >
                {groups.map((group: any) => (
                    <MenuItem key={group.id} value={group.id}>
                        {group.name}
                    </MenuItem>
                ))}
            </Select>

            <List>
                {users.map((user: any) => (
                    <ListItem key={user.id}>
                        <ListItemText primary={user.name} />
                        <Button
                            onClick={() => handleAssign(user.id)}
                            variant='contained'
                            color='primary'
                        >
                            Assign to Group
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default UserGroupAssignment;
