import { useEffect, useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

const FileDisplay = ({
    fileKey,
    data,
    isLoading,
    error,
}: {
    fileKey: string;
    data: any;
    isLoading: boolean;
    error: any;
}) => {
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const blob = new Blob([data], { type: "pdf" });
                const url = URL.createObjectURL(blob);
                setFileUrl(url);
            } catch (error) {
                console.error("Error fetching file:", error);
            }
        })();
    }, [data]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading file</p>;
    }

    if (!data) {
        return <p>no data yet</p>;
    }

    if (!fileUrl) {
        return <div>Loading file...</div>;
    }

    return (
        <div>
            <h3>File Content</h3>
            <DocViewer
                documents={[{ uri: String(fileUrl) }]}
                pluginRenderers={DocViewerRenderers}
            />
        </div>
    );
};

export default FileDisplay;
