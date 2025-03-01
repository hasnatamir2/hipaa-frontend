"use client";

import { useState } from "react";
import {
    Box,
    CircularProgress,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import {
    useDeleteFolder,
    useFoldersAccessible,
    useFoldersWithFiles,
    useUpdateFolderName,
} from "@/hooks/useFolders";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FolderForm from "../../library/modals/folder-form-modal";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const FolderList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState({ id: "", name: "" });
    const { push } = useRouter();

    const queryClient = useQueryClient();
    const refetchFolders = () => {
        queryClient.invalidateQueries({
            queryKey: ["get-folders-accessible"],
        });
    };
    const { data: folders, isLoading, error } = useFoldersAccessible();
    const { mutate: deleteMutation } = useDeleteFolder({
        onSuccess: refetchFolders,
    });
    const { mutate: updateMutation, isPending } = useUpdateFolderName({
        onSuccess: () => {
            refetchFolders();
            setIsOpen(false);
        },
    });

    if (isLoading) return <CircularProgress />;
    if (error) return <div>Error loading files</div>;

    const handleDelete = (folderId: string) => {
        deleteMutation(folderId);
    };

    const handleEdit = (folderId: string, folderName: string) => {
        setSelectedFolder({ id: folderId, name: folderName });
        setIsOpen(true);
    };

    const updateFolder = (data: any) => {
        updateMutation({ id: selectedFolder.id, name: data.name });
    };

    return folders.length ? (
        <Box>
            <FolderForm
                open={isOpen}
                onClose={() => setIsOpen(!open)}
                defaultValues={{
                    name: selectedFolder.name,
                }}
                onSubmit={updateFolder}
                mode='edit'
            />
            <List style={{ maxHeight: 500, overflow: "scroll" }}>
                {folders.map((folder: any) => {
                    return (
                        <ListItem
                            key={folder.id}
                            onClick={() =>
                                push(`/dashboard/folders/${folder.id}`)
                            }
                            sx={{ cursor: "pointer" }}
                            secondaryAction={
                                <Box>
                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEdit(folder.id, folder.name);
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(folder.id);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            }
                        >
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={folder.name}
                                secondary={`Total files# ${folder.totalFiles}`}
                            />
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    ) : (
        <p>no folders found</p>
    );
};

export default FolderList;
