"use client";
import { useParams } from "next/navigation";
import {
    Box,
    CircularProgress,
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
import UploadFileModal from "@/components/dashboard/files/upload-file-modal";

const FolderDetails = () => {
    const { id } = useParams();

    const [openUpload, setOpenUpload] = useState<boolean>(false);

    const {
        data: folderDetails,
        isLoading,
        error,
    } = useFilesInFolder(id as string);

    if (isLoading) return <CircularProgress />;
    if (error) return <div>Error loading file details</div>;

    return (
        <div>
            <Typography variant='h4'>Folder: {folderDetails.name}</Typography>
            <Typography variant='h6' style={{ marginTop: "20px" }}>
                Files: ({folderDetails.files.length})
            </Typography>
            <List>
                {folderDetails.files.length ? (
                    <ListGridView
                        data={folderDetails.files}
                        isLoading={isLoading}
                        secondaryContent={<Box>content</Box>}
                        icon={<InsertDriveFile />}
                    />
                ) : (
                    <Typography>No files in this folder</Typography>
                )}
            </List>
            <UploadFileModal
                open={openUpload}
                handleClose={() => setOpenUpload(false)}
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
        </div>
    );
};

export default FolderDetails;
