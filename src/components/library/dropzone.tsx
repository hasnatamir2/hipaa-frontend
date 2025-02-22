import { Box } from "@mui/material";
import { JSX } from "react";
import { Accept, useDropzone } from "react-dropzone";

interface DropzoneProps {
    onUpload: (files: File[]) => void;
    accept?: Accept;
    maxSize?: number;
    children?: JSX.Element;
    styles?: any;
}

const Dropzone = ({
    onUpload,
    accept,
    maxSize,
    children,
    styles,
}: DropzoneProps) => {
    const onDrop = (acceptedFiles: File[]) => {
        onUpload(acceptedFiles);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept,
        maxSize,
    });
    return (
        <Box {...getRootProps()} sx={{ ...styles }}>
            <input {...getInputProps()} />
            {children}
        </Box>
    );
};

export default Dropzone;
