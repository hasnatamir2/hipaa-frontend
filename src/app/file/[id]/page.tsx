"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CircularProgress, Container, Typography } from "@mui/material";
import { useFileDetails } from "@/hooks/useFiles";
import { BytesFormatter } from "@/utils";
import FileDisplay from "@/components/files/file-viewer";

const FileDetails = () => {
    const { id } = useParams();
    const [fileKey, setFileKey] = useState<string>("");

    const {
        data: file,
        isLoading,
        error,
        isFetched,
    } = useFileDetails(id as string);
    useEffect(() => {
        if (isFetched && file) {
            setFileKey(file.url.split("/")[1]);
        }
    }, [isFetched, file]);

    if (isLoading) return <CircularProgress />;
    if (error) return <div>Error loading file details</div>;

    return (
        <Container>
            <Typography variant='h5'>{file.name}</Typography>
            <Typography variant='body1'>
                Uploaded by: {file.lastModified}
            </Typography>
            <Typography variant='body1'>
                Size: {BytesFormatter(file.size)} KB
            </Typography>

            <FileDisplay fileKey={fileKey} fileId={id as string} />
        </Container>
    );
};

export default FileDetails;
