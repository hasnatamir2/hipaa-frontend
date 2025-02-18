"use client";

import { useState } from "react";
import FolderList from "@/components/dashboard/folders/folder-list";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FolderForm from "@/components/dashboard/folders/folder-form-modal";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateFolder } from "@/hooks/useFolders";

export default function FoldersPage() {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const onSuccess = () => {
        queryClient.invalidateQueries({
            queryKey: ["folders"],
        });
        setOpen(false);
    };

    const { mutate } = useCreateFolder({ onSuccess });

    const onSubmit = (data: any) => {
        mutate(data);
    };
    return (
        <div>
            <FolderList />
            <FolderForm
                open={open}
                onClose={() => setOpen(!open)}
                onSubmit={onSubmit}
            />
            <Fab
                color='primary'
                aria-label='add'
                sx={{ position: "fixed", bottom: "1.5rem", right: "1.5rem" }}
                onClick={() => setOpen(true)}
            >
                <AddIcon />
            </Fab>
        </div>
    );
}
