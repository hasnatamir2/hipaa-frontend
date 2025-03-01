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
import { useAllFolders } from "@/hooks/useFolders";
import { useAllUserGroup, useAssignFolderToGroup } from "@/hooks/useUserGroup";

const FolderGroupAssignment = () => {
    const [selectedGroup, setSelectedGroup] = useState("");
    const queryClient = useQueryClient();

    const { data: folders, isLoading: foldersLoading } = useAllFolders();
    const { data: groups, isLoading: groupsLoading } = useAllUserGroup();

    const mutation = useAssignFolderToGroup({
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["get-all-folders"]}); // Invalidate to refetch folder-group data
        },
    });

    const handleAssign = (folderId: string) => {
        mutation.mutate({ folderId, groupId: selectedGroup });
    };

    if (foldersLoading || groupsLoading) return <CircularProgress />;

    return (
        <Box>
            <Typography variant="h4">Assign Folders to Groups</Typography>
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
                {folders.map((folder: any) => (
                    <ListItem key={folder.id}>
                        <ListItemText primary={folder.name} />
                        <Button
                            onClick={() => handleAssign(folder.id)}
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

export default FolderGroupAssignment;
