"use client";

import {
    List,
    ListItemText,
    CircularProgress,
    ListItemButton,
    Box,
    ListItemIcon,
} from "@mui/material";
import useFiles from "@/hooks/useFiles";
import Link from "next/link";
import { ConvertBytesToKbs } from "@/utils";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const FileList = () => {
    const { data: files, isLoading, error } = useFiles();

    if (isLoading) return <CircularProgress />;
    if (error) return <div>Error loading files</div>;

    return (
        <List style={{ maxHeight: 500, overflow: "scroll" }}>
            {files.map((file: any) => {
                return (
                    <ListItemButton
                        key={file.id}
                        component={Link}
                        href={`/dashboard/files/${file.id}`}
                    >
                        <ListItemIcon>
                            <InsertDriveFileIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={file.name}
                            secondary={
                                <FileListDetails
                                    lastModified={file.lastModified}
                                    size={file.size}
                                />
                            }
                        />
                    </ListItemButton>
                );
            })}
        </List>
    );
};

const FileListDetails = ({
    lastModified,
    size,
}: {
    lastModified: string;
    size: number;
}) => {
    const lastModifiedDate = new Date(lastModified);

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <span>
                Last Modified: {lastModifiedDate.getDate()}/
                {lastModifiedDate.getMonth() + 1}/
                {lastModifiedDate.getFullYear()}
            </span>
            <span>Size: {ConvertBytesToKbs(size)} KB</span>
        </Box>
    );
};

export default FileList;
