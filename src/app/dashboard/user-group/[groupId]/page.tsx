"use client";

import { FC, useState } from "react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
    Typography,
    Button,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
    Tabs,
    Tab,
    CircularProgress,
    Container,
    List,
    ListItem,
    Snackbar,
    ListItemText,
} from "@mui/material";
import { useAllUsers } from "@/hooks/useUsers";
import { useAllFolders } from "@/hooks/useFolders";
import {
    useAssignFolderToGroup,
    useAssignUserToGroup,
    useUnassignFolderToGroup,
    useUnassignUserToGroup,
    useUserGroupDetails,
} from "@/hooks/useUserGroup";

const GroupDetails: FC = () => {
    const { groupId }: { groupId: string } = useParams();
    const queryClient = useQueryClient();

    const [selectedUser, setSelectedUser] = useState("");
    const [selectedFolder, setSelectedFolder] = useState("");
    const [openAssignUser, setOpenAssignUser] = useState(false);
    const [openAssignFolder, setOpenAssignFolder] = useState(false);
    const [activeTab, setActiveTab] = useState(0); // Active tab state

    const {
        data: group,
        isLoading,
        isPending,
        isError,
    } = useUserGroupDetails({ groupId });
    const { data: users, isLoading: isLoadingUsers } = useAllUsers();
    const { data: folders, isLoading: isLoadingFolders } = useAllFolders();
    const unassignUserMutation = useUnassignUserToGroup({
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-user-groups", groupId],
            })
        }
    });

    const unassignFolderMutation = useUnassignFolderToGroup({
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-user-groups", groupId],
            })
        }
    });

    const assignUserMutation = useAssignUserToGroup({
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["get-user-groups", groupId],
            }),
    });

    const assignFolderMutation = useAssignFolderToGroup({
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["get-user-groups", groupId],
            }),
    });
    if (isLoading || isLoadingUsers || isLoadingFolders || isPending) return <CircularProgress />;
    if (isError) return <Typography variant="subtitle2">Error loading group</Typography>;

    const handleUnassignUser = (userId: string) => {
        unassignUserMutation.mutate({ groupId, userId });
    };

    const handleAssignUser = () => {
        assignUserMutation.mutate({ groupId, userId: selectedUser });
        setOpenAssignUser(false);
    };

    const handleAssignFolder = () => {
        assignFolderMutation.mutate({ groupId, folderId: selectedFolder });
        setOpenAssignFolder(false);
    };

    const handleUnassignFolder = (folderId: string) => {
        unassignFolderMutation.mutate({ groupId, folderId });
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <Container>
            <Typography variant='h4'>Group: {group.name}</Typography>

            <Tabs
                centered
                value={activeTab}
                onChange={handleTabChange}
                aria-label='group details tabs'
            >
                <Tab label='Users' />
                <Tab label='Folders' />
            </Tabs>

            {/* Content for the Users Tab */}
            {activeTab === 0 && (
                <Box mt={4}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 1,
                        }}
                    >
                        <Typography variant='h6'>
                            Users in this group: ({group.users.length})
                        </Typography>
                        <Button
                            variant='contained'
                            onClick={() => setOpenAssignUser(true)}
                        >
                            Assign User
                        </Button>
                    </Box>
                    <List>
                        {group.users.length ? (
                            group.users.map((user: any) => (
                                <ListItem
                                    disableGutters
                                    key={user.id}
                                    secondaryAction={
                                        <Button
                                            variant='outlined'
                                            color='error'
                                            onClick={() =>
                                                handleUnassignUser(user.id)
                                            }
                                        >
                                            Unassign
                                        </Button>
                                    }
                                >
                                    <ListItemText primary={user.email} />
                                </ListItem>
                            ))
                        ) : (
                            <Typography variant='subtitle2'>
                                No user assigned to this group
                            </Typography>
                        )}
                    </List>
                </Box>
            )}

            {/* Content for the Folders Tab */}
            {activeTab === 1 && (
                <Box mt={4}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 1,
                        }}
                    >
                        <Typography variant='h6'>
                            Folders in this group: ({group.folders.length})
                        </Typography>

                        <Button
                            variant='contained'
                            onClick={() => setOpenAssignFolder(true)}
                        >
                            Assign Folder
                        </Button>
                    </Box>
                    <List>
                        {group.folders.length ? (
                            group.folders.map((folder: any) => (
                                <ListItem
                                    key={folder.id}
                                    disableGutters
                                    secondaryAction={
                                        <Button
                                            variant='outlined'
                                            color='error'
                                            onClick={() => handleUnassignFolder(folder.id)}
                                        >
                                            Unassign
                                        </Button>
                                    }
                                >
                                    <ListItemText primary={folder.name} />
                                </ListItem>
                            ))
                        ) : (
                            <Typography variant='subtitle2'>
                                No Folder assign to this group
                            </Typography>
                        )}
                    </List>
                </Box>
            )}

            {/* Dialog to assign users */}
            <Dialog
                open={openAssignUser}
                onClose={() => setOpenAssignUser(false)}
                maxWidth='sm'
                fullWidth
            >
                <DialogTitle>Assign User to Group</DialogTitle>
                <DialogContent>
                    <TextField
                        sx={{ marginTop: 2 }}
                        select
                        label='Select User'
                        fullWidth
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                    >
                        {users?.map((user: any) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.email}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAssignUser(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleAssignUser}>Assign</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog to assign folders */}
            <Dialog
                open={openAssignFolder}
                onClose={() => setOpenAssignFolder(false)}
                maxWidth='sm'
                fullWidth
            >
                <DialogTitle>Assign Folder to Group</DialogTitle>
                <DialogContent>
                    <TextField
                        sx={{ marginTop: 2 }}
                        select
                        label='Select Folder'
                        fullWidth
                        value={selectedFolder}
                        onChange={(e) => setSelectedFolder(e.target.value)}
                    >
                        {folders?.map((folder: any) => (
                            <MenuItem key={folder.id} value={folder.id}>
                                {folder.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAssignFolder(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleAssignFolder}>Assign</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default GroupDetails;
