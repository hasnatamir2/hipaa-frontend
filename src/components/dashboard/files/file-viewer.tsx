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

    const [fileUrl, setFileUrl] = useState<string | null>(null);

    if (error) {
        return <p>Error loading file</p>;
    }

    if (isPending) {
        return <div>Loading file...</div>;
    }

    const handleDownloadClick = async () => {
        const file = await mutateAsync(fileKey);
        // const url = URL.createObjectURL(new Blob([file.data]));
        setFileUrl(file);
    };
    console.log(fileUrl);
    return (
        <div>
            <Button onClick={handleDownloadClick} disabled={!fileKey}>
                View file
            </Button>
            <h3>File Content</h3>
            {
                fileUrl ? (
                    <DocViewer documents={[{ uri: fileUrl }]} pluginRenderers={DocViewerRenderers} />
                  ) : (
                    <div>Loading file...</div>
                  )
            }
        </div>
    );
};

export default FileDisplay;
