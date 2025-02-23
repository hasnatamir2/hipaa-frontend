"use client";

import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { format } from "date-fns";
import useFiles, { useDeleteFile } from "@/hooks/useFiles";
import { BytesFormatter } from "@/utils";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ListGridView from "@/components/list-grid-view";
import AssignFileToFolderModal from "../../library/modals/assign-file-to-folder-modal";
import ConfirmDeleteModal from "@/components/library/modals/confirm-delete-modal";
import CreateSharedLinkModal from "@/components/library/modals/create-shared-link-modal";
import CreatePermissionModal from "@/components/library/modals/create-permission-modal";

const FileList = () => {
    const { data: files, isLoading, error, refetch } = useFiles();

    const [openFolderModal, setOpenFolderModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openSharedLinkModal, setOpenSharedLinkModal] = useState(false);
    const [openPermissionModal, setOpenPermissionModal] = useState(false);

    const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

    const { mutate: deleteFile, isPending } = useDeleteFile({
        onSuccess: () => {
            refetch();
            setOpenDeleteModal(false);
        },
    });

    if (isLoading) return <CircularProgress />;
    if (error) return <div>Error loading files</div>;

    const generateFileMetadata = (file: any) => {
        const lastModifiedDateTime = format(
            file.lastModified,
            "yyyy/MM/dd hh:mm a"
        );

        return `Last Modified: ${lastModifiedDateTime}, Size: ${BytesFormatter(
            file.size
        )}`;
    };

    const modifiedFiles = files.map((file: any) => {
        return {
            ...file,
            secondaryContent: generateFileMetadata(file),
            link: `/file/${file.id}`,
        };
    });

    const handleDeleteFile = (id: string) => {
        setOpenDeleteModal(true);
        // deleteFile(id);
    };

    return (
        <>
            <ListGridView
                title='My Files'
                data={modifiedFiles}
                isLoading={isLoading}
                icon={<InsertDriveFileIcon />}
                actions={[
                    {
                        label: "Assign to Folder",
                        onClick: (fileId: string) => {
                            setSelectedFileId(fileId);
                            setOpenFolderModal(true);
                        },
                    },
                    {
                        label: "Create Share link",
                        onClick: (fileId: string) => {
                            setSelectedFileId(fileId);
                            setOpenSharedLinkModal(true);
                        },
                    },
                    {
                        label: "Share Access",
                        onClick: (fileId: string) => {
                            setSelectedFileId(fileId);
                            setOpenPermissionModal(true);
                        },
                    },
                    {
                        label: "Delete",
                        onClick: (id: string) => {
                            setSelectedFileId(id);
                            handleDeleteFile(id);
                        },
                    },
                ]}
            />
            {openFolderModal && (
                <AssignFileToFolderModal
                    open={openFolderModal}
                    handleClose={() => setOpenFolderModal(false)}
                    fileId={selectedFileId}
                    onSuccess={refetch}
                />
            )}
            {openDeleteModal && (
                <ConfirmDeleteModal
                    open={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                    onConfirm={() => deleteFile(selectedFileId as string)}
                    itemName={"file"}
                    loading={isPending}
                />
            )}
            {openSharedLinkModal && (
                <CreateSharedLinkModal
                    fileId={selectedFileId as string}
                    onClose={() => setOpenSharedLinkModal(false)}
                    open={openSharedLinkModal}
                />
            )}
            {openPermissionModal && (
                <CreatePermissionModal
                    fileId={selectedFileId as string}
                    onClose={() => setOpenPermissionModal(false)}
                    open={openPermissionModal}
                />
            )}
        </>
    );
};

export default FileList;
