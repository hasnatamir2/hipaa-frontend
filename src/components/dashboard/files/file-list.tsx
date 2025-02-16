"use client";

import { List, ListItemText, CircularProgress, ListItemButton } from "@mui/material";
import useFiles from "@/hooks/useFiles";
import Link from "next/link";

const FileList = () => {
    const { data: files, isLoading, error } = useFiles();

    if (isLoading) return <CircularProgress />;
    if (error) return <div>Error loading files</div>;

    return (
        <List>
            {files.map((file: any) => {
                const lastModified = new Date(file.lastModified);
                return (
                    <ListItemButton
                        key={file.id}
                        component={Link}
                        href={`/dashboard/files/${file.id}`}
                    >
                        <ListItemText
                            primary={file.name}
                            secondary={`Last Modified: ${lastModified.getDate()}/${
                                lastModified.getMonth() + 1
                            }/${lastModified.getFullYear()}`}
                        />
                    </ListItemButton>
                );
            })}
        </List>
    );
};

export default FileList;
