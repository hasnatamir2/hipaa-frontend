"use client";

import { useAddFileToFolder, useFolders } from "@/hooks/useFolders";
import {
    List,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    ListItemButton,
    ListItemAvatar,
} from "@mui/material";
import { Folder } from "@mui/icons-material";

const AssignFileToFolderModal = ({ open, handleClose, fileId, onSuccess }: any) => {
    const { data } = useFolders();
    const { mutate } = useAddFileToFolder({ onSuccess });

    const handleAssignFileToFolder = (folderId: string) => {
        mutate({ folderId, fileId });
        handleClose();
    };
    return (
        <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
            <DialogTitle>Assign File to Folder</DialogTitle>
            <DialogContent>
                <List>
                    {data?.map((folder: any) => (
                        <ListItemButton
                            key={folder.id}
                            onClick={() => handleAssignFileToFolder(folder.id)}
                            disableGutters
                        >
                            <ListItemAvatar>
                                <Folder />
                            </ListItemAvatar>
                            <ListItemText primary={folder.name} />
                        </ListItemButton>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default AssignFileToFolderModal;
