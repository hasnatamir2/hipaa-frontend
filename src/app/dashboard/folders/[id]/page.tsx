"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
import { ConvertBytesToKbs } from "@/utils";
import FileDisplay from "@/components/dashboard/files/file-viewer";
import { useFilesInFolder } from "@/hooks/useFolders";

const FolderDetails = () => {
    const { id } = useParams();
    const [fileKey, setFileKey] = useState<string>("");

    const {
        data: folderDetails,
        isLoading,
        error,
        isFetched,
    } = useFilesInFolder(id as string);

    if (isLoading) return <CircularProgress />;
    if (error) return <div>Error loading file details</div>;
    
    return (
        <div>
            
        </div>
    );
};

export default FolderDetails;
