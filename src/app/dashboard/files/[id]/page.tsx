"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useFileDetails, useFileDownload } from "@/hooks/useFiles";
import { ConvertBytesToKbs } from "@/utils";
import FileDisplay from "@/components/dashboard/files/file-viewer";

const FileDetails = () => {
    const { id } = useParams();
    const [fileKey, setFileKey] = useState<string>("");

    const {
        data: file,
        isLoading,
        error,
        isFetched,
    } = useFileDetails(id as string);
    const downloadFileMutation = useFileDownload(id as string);
    useEffect(() => {
        if (isFetched && file) {
            setFileKey(file.url.split("/")[1]);
        }
    }, [isFetched, file]);

    if (isLoading) return <CircularProgress />;
    if (error) return <div>Error loading file details</div>;

    const handleDownload = () => {
        downloadFileMutation.mutate(fileKey);
    };

    return (
        <div>
            <Typography variant='h5'>{file.name}</Typography>
            <Typography variant='body1'>
                Uploaded by: {file.lastModified}
            </Typography>
            <Typography variant='body1'>
                Size: {ConvertBytesToKbs(file.size)} KB
            </Typography>
            <Button onClick={handleDownload} disabled={!fileKey}>
                View file
            </Button>
            <FileDisplay
                isLoading={downloadFileMutation.isPending}
                data={downloadFileMutation.data}
                fileKey={fileKey}
                error={downloadFileMutation.error}
            />
        </div>
    );
};

export default FileDetails;
