"use client";
import { useParams } from "next/navigation";
import {
    CircularProgress,
    Container,
    Fab,
    List,
    Tooltip,
    Typography,
} from "@mui/material";
import { useFilesInFolder } from "@/hooks/useFolders";
import ListGridView from "@/components/list-grid-view";
import { InsertDriveFile } from "@mui/icons-material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { useState } from "react";
import UploadFileModal from "@/components/library/modals/upload-file-modal";
import { useQueryClient } from "@tanstack/react-query";

const FolderDetails = () => {
    const { id } = useParams();

    const [openUpload, setOpenUpload] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const {
        data: folderDetails,
        isLoading,
        error,
    } = useFilesInFolder(id as string);

    if (isLoading) return <CircularProgress />;
    if (error) return <div>Error loading file details</div>;

    const onSuccessfulUpload = () => {
        setOpenUpload(false);
        queryClient.invalidateQueries({
            queryKey: ["files-in-folder", id],
        });
    };

    return (
        <Container>
            <Typography variant='h4'>{folderDetails.name}</Typography>
            <List>
                <ListGridView
                    data={folderDetails.files}
                    isLoading={isLoading}
                    icon={<InsertDriveFile />}
                    title={`Files: (${folderDetails.files.length})`}
                />
            </List>
            <UploadFileModal
                open={openUpload}
                handleClose={() => setOpenUpload(false)}
                folderId={id as string}
                onSuccessfulUpload={onSuccessfulUpload}
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
