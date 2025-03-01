"use client";

import { useState } from "react";
import FolderList from "@/components/dashboard/folders/folder-list";
import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FolderForm from "@/components/library/modals/folder-form-modal";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateFolder } from "@/hooks/useFolders";

export default function FoldersPage() {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const onSuccess = () => {
        queryClient.invalidateQueries({
            queryKey: ["get-folders-accessible"],
        });
        setOpen(false);
    };

    const { mutate, isPending } = useCreateFolder({ onSuccess });

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
                isLoading={isPending}
                mode='create'
            />
            <Tooltip title='Add File'>
                <Fab
                    color='primary'
                    style={{ position: "fixed", bottom: 20, right: 20 }}
                    onClick={() => setOpen(true)}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
        </div>
    );
}
