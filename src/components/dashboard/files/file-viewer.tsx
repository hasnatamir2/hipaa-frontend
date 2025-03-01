import { useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { useFileDownload } from "@/hooks/useFiles";
import { Box, Button, CircularProgress, Typography } from "@mui/material";

const FileDisplay = ({
    fileKey,
    fileId,
}: {
    fileKey: string;
    fileId: string;
}) => {
    const { mutateAsync, error, isPending } = useFileDownload(fileId);

    const [fileUrl, setFileUrl] = useState<{ uri: string; fileType: string }>({
        uri: "",
        fileType: "",
    });

    if (error) {
        return (
            <Typography variant='body1' color="error">
                Error loading file
            </Typography>
        );
    }

    const handleDownloadClick = async () => {
        const file = await mutateAsync(fileKey);
        const fileBlob = new Blob([file.data], {
            type: file.headers["content-type"],
        });

        const fileToDisplay = {
            uri: URL.createObjectURL(fileBlob),
            fileType: file.headers["content-type"],
        };

        setFileUrl(fileToDisplay);
    };

    return (
        <Box
            sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                minHeight: "400px",
            }}
        >
            {isPending ? (
                <CircularProgress />
            ) : fileUrl.uri ? (
                <DocViewer
                    documents={[fileUrl]}
                    pluginRenderers={DocViewerRenderers}
                />
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        gap: 1,
                    }}
                >
                    <Typography variant='body1' color='textSecondary'>
                        File is encrypted. Please request decryption.
                    </Typography>
                    <Button onClick={handleDownloadClick} disabled={!fileKey}>
                        View file
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default FileDisplay;
