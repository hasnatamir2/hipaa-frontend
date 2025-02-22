"use client";

import { CircularProgress } from "@mui/material";
import useFiles from "@/hooks/useFiles";
import { BytesFormatter } from "@/utils";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ListGridView from "@/components/list-grid-view";

const FileList = () => {
    const { data: files, isLoading, error } = useFiles();

    if (isLoading) return <CircularProgress />;
    if (error) return <div>Error loading files</div>;

    const generateFileMetadata = (file: any) => {
        const lastModifiedDate = new Date(file.lastModified);
        return `Last Modified: ${lastModifiedDate.getDate()}/${
            lastModifiedDate.getMonth() + 1
        }/${lastModifiedDate.getFullYear()}, Size: ${BytesFormatter(
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

    return (
        <ListGridView
            data={modifiedFiles}
            isLoading={isLoading}
            icon={<InsertDriveFileIcon />}
            actions={[
                {
                    label: "Download",
                    onClick: (fileId: string) => {
                        console.log("Download file with id: ", fileId);
                    },
                },
                {
                    label: "Delete",
                    onClick: (id: string) => {
                        console.log("Delete file with id: ", id);
                    },
                },
            ]}
        />
    );
};

export default FileList;
