"use client";
import { useParams } from "next/navigation";
import {
    Box,
    CircularProgress,
    Container,
    Fab,
    IconButton,
    List,
    Tooltip,
    Typography,
} from "@mui/material";
import {
    useDeleteFolder,
    useFilesInFolder,
    useUpdateFolderName,
} from "@/hooks/useFolders";
import ListGridView from "@/components/list-grid-view";
import { InsertDriveFile, Delete, Edit } from "@mui/icons-material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { useState } from "react";
import UploadFileModal from "@/components/library/modals/upload-file-modal";
import { useQueryClient } from "@tanstack/react-query";
import { filIcon, generateFileMetadata } from "@/utils";
import FolderForm from "@/components/library/modals/folder-form-modal";
import { UserRole } from "@/constants/roles";

const FolderDetails = () => {
    const { id } = useParams();

    const [openUpload, setOpenUpload] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);
    const loggedInUser = localStorage.getItem("user");
    const user = JSON.parse(loggedInUser as string);

    const queryClient = useQueryClient();

    const {
        data: folderDetails,
        isLoading,
        error,
    } = useFilesInFolder(id as string);

    const onSuccess = () => {
        setOpenUpload(false);
        setIsOpen(false);
        queryClient.invalidateQueries({
            queryKey: ["files-in-folder", id],
        });
    };

    const { mutate: deleteMutation } = useDeleteFolder({
        onSuccess,
    });
    const { mutate: updateMutation, isPending } = useUpdateFolderName({
        onSuccess,
    });

    const modifiedFolders = folderDetails?.files?.map((file: any) => {
        const fileTypeIcon = filIcon.get(file.mimeType) || "";

        return {
            ...file,
            secondaryContent: generateFileMetadata(file),
            link: `/dashboard/files/${file.id}`,
            icon: fileTypeIcon,
        };
    });

    const handleDelete = () => {
        deleteMutation(id as string);
    };

    const handleEdit = () => {
        setIsOpen(true);
    };

    const updateFolder = (data: any) => {
        updateMutation({ id: id as string, name: data.name });
    };

    if (isLoading) return <CircularProgress />;
    if (error) return <div>Error loading file details</div>;

    const isOwnerOrAdmin =
        user?.role === UserRole.ADMIN || user?.id === folderDetails?.owner?.id;

    return (
        <Container>
            <FolderForm
                open={isOpen}
                onClose={() => setIsOpen(!open)}
                defaultValues={{
                    name: folderDetails.name,
                    id: folderDetails.id,
                }}
                onSubmit={updateFolder}
                mode='edit'
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant='h4'>{folderDetails.name}</Typography>
                {isOwnerOrAdmin && (
                    <Box>
                        <IconButton onClick={handleEdit}>
                            <Edit />
                        </IconButton>
                        <IconButton onClick={handleDelete}>
                            <Delete />
                        </IconButton>
                    </Box>
                )}
            </Box>
            <List>
                <ListGridView
                    data={modifiedFolders}
                    isLoading={isLoading}
                    icon={<InsertDriveFile />}
                    title={`Files: (${folderDetails.files.length})`}
                />
            </List>
            <UploadFileModal
                open={openUpload}
                handleClose={() => setOpenUpload(false)}
                folderId={id as string}
                onSuccessfulUpload={onSuccess}
            />
            <Tooltip title='Add File'>
                <Fab
                    color='primary'
                    style={{ position: "fixed", bottom: 20, right: 20 }}
                    onClick={() => setOpenUpload(true)}
                >
                    <NoteAddIcon />
                </Fab>
            </Tooltip>
        </Container>
    );
};

export default FolderDetails;
