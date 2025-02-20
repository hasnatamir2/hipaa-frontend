"use client";

import {
    List,
    ListItemText,
    CircularProgress,
    ListItemButton,
    ListItemIcon,
} from "@mui/material";
import useFiles from "@/hooks/useFiles";
import Link from "next/link";
import { ConvertBytesToKbs } from "@/utils";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FileListDetails from "./file-list-details";

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

export default FileList;
