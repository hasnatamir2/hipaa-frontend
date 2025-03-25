"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
    Card,
    CircularProgress,
    Container,
    Divider,
    Typography,
    Grid2,
    Chip,
    Box,
} from "@mui/material";
import { useFileDetails } from "@/hooks/useFiles";
import { BytesFormatter, filIcon } from "@/utils";
import FileDisplay from "@/components/dashboard/files/file-viewer";
import { format } from "date-fns";
import { UserRole, UserRoleTitle } from "@/constants/roles";

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

    if (error && (error as any)?.status === 403)
        return (
            <Typography variant='h5'>
                You do not have access to this file
            </Typography>
        );
    if (error)
        return (
            <Typography variant='body1' color='error'>
                Error loading file details
            </Typography>
        );
    if (isLoading) return <CircularProgress />;

    const latestVersion = file?.versions.at(-1);

    const fileTypeIcon = filIcon.get(file.mimeType) || "";

    return (
        <Container>
            <Card sx={{ maxWidth: "100%", p: 3, boxShadow: 3 }}>
                <Typography variant='h5' gutterBottom>
                    {file.name}
                </Typography>
                <Divider />
                <Grid2 container spacing={2} sx={{ mt: 2 }}>
                    <Grid2 size={{ xs: 12, md: 8 }}>
                        <FileDisplay fileKey={fileKey} fileId={id as string} />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <Box sx={{ display: "flex", gap: 1, flexDirection: "column", maxWidth: 'fit-content' }}>
                            <Typography
                                variant='body1'
                                sx={{ display: "flex", gap: 1 }}
                            >
                                <strong>Owner:</strong> {file.owner.email}
                            </Typography>
                            <Typography
                                variant='body1'
                                sx={{
                                    display: "flex",
                                    gap: 1,
                                    alignItems: "center",
                                }}
                            >
                                <strong>Owner Role:</strong>{" "}
                                <Chip
                                    size='small'
                                    label={UserRoleTitle.get(
                                        file.owner.role as UserRole
                                    )}
                                />
                            </Typography>
                            <Typography
                                variant='body1'
                                sx={{ display: "flex", gap: 1 }}
                            >
                                <strong>File Type:</strong>
                                <Image
                                    src={fileTypeIcon}
                                    height={24}
                                    width={24}
                                    alt={file.name}
                                />
                            </Typography>
                            <Typography
                                variant='body1'
                                sx={{ display: "flex", gap: 1 }}
                            >
                                <strong>File Size:</strong>
                                {BytesFormatter(file.size)}
                            </Typography>
                            <Typography
                                variant='body1'
                                sx={{ display: "flex", gap: 1 }}
                            >
                                <strong>Last Modified:</strong>
                                {format(
                                    file.lastModified,
                                    "yyyy/MM/dd hh:mm a"
                                )}
                            </Typography>
                            <Typography
                                variant='body1'
                                sx={{ display: "flex", gap: 1 }}
                            >
                                <strong>Version:</strong>
                                {latestVersion?.versionNumber}
                            </Typography>
                        </Box>
                    </Grid2>
                </Grid2>
            </Card>
        </Container>
    );
};

export default FileDetails;
