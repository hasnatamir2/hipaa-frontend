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
    useFolders,
    useUpdateFolderName,
} from "@/hooks/useFolders";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FolderForm from "./folder-form-modal";
import { useQueryClient } from "@tanstack/react-query";

const FolderList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState({ id: "", name: "" });

    const queryClient = useQueryClient();
    const refetchFolders = () => {
        queryClient.invalidateQueries({
            queryKey: ["folders"],
        });
    };
    const { data: folders, isLoading, error } = useFolders();
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
            />
            <List style={{ maxHeight: 500, overflow: "scroll" }}>
                {folders.map((folder: any) => {
                    return (
                        <ListItem
                            key={folder.id}
                            // component={Link}
                            // href={`/dashboard/folders/${folder.id}`}
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
                                secondary={""}
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
