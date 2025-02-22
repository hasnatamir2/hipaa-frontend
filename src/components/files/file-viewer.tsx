import { useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { useFileDownload } from "@/hooks/useFiles";
import { Button } from "@mui/material";

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
        return <p>Error loading file</p>;
    }

    if (isPending) {
        return <div>Loading file...</div>;
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
        <div>
            <h3>File Content</h3>
            {fileUrl.uri ? (
                <DocViewer
                    documents={[fileUrl]}
                    pluginRenderers={DocViewerRenderers}
                />
            ) : (
                <Button onClick={handleDownloadClick} disabled={!fileKey}>
                    View file
                </Button>
            )}
        </div>
    );
};

export default FileDisplay;
