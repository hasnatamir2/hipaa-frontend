import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import Dropzone from "@/components/library/dropzone";
import { BytesFormatter, fileToBase64 } from "@/utils";
import CloseIcon from "@mui/icons-material/Close";
import { useBulkUploadFiles } from "@/hooks/useFiles";


const UploadFileModal = ({
    open,
    handleClose,
    folderId,
    onSuccessfulUpload,
}: any) => {
    const [files, setFiles] = useState<File[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
    const {
        mutateAsync: bulkUpload,
        isPending,
        isSuccess,
    } = useBulkUploadFiles();

    const generatePreview = async (files: File[]) => {
        const previews = await Promise.all(
            files.map(async (file) => {
                const preview = await fileToBase64(file);
                return {
                    preview,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                };
            })
        );
        if (previews.length > 0) {
            setUploadedFiles((prevFiles) => [...prevFiles, ...previews]);
        }
    };
    const handleUpload = async (uploadedFiles: File[]) => {
        generatePreview(uploadedFiles);

        setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
    };

    const handleRemoveSelectedFile = (index: number) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
        setUploadedFiles((prevFiles) =>
            prevFiles.filter((_, i) => i !== index)
        );
    };

    const handleFilesUpload = () => {
        if (files.length > 0) {
            bulkUpload({ files, folderId });
        }
    };

    useEffect(() => {
        if (isSuccess) {
            setFiles([]);
            setUploadedFiles([]);
            onSuccessfulUpload?.();
            handleClose();
        }
    }, [isSuccess]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle> Upload Files</DialogTitle>
            <DialogContent>
                <Dropzone
                    onUpload={handleUpload}
                    styles={{
                        cursor: "pointer",
                        padding: "1rem",
                        border: "1px dashed",
                    }}
                    accept={{
                        "image/*": ["jpg", "jpeg", "png", "gif"],
                        "application/pdf": ["pdf"],
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            margin: 2,
                        }}
                    >
                        <Typography variant='body1'>
                            Drag & Drop files here or Click to Browse
                        </Typography>
                        <Typography variant='body2'>
                            Acceptable formats: jpg, jpeg, png, gif, pdf
                        </Typography>

                        <label htmlFor='file-upload-input'>
                            <Button
                                variant='outlined'
                                component='span'
                                sx={{ marginTop: "8px" }}
                            >
                                Browse Files
                            </Button>
                        </label>
                    </Box>
                </Dropzone>
                {uploadedFiles.length > 0 && (
                    <List>
                        {uploadedFiles.map((file, index) => (
                            <Box key={index}>
                                <ListItem
                                    secondaryAction={
                                        <IconButton
                                            onClick={() =>
                                                handleRemoveSelectedFile(index)
                                            }
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    }
                                    sx={{ padding: 0.5 }}
                                >
                                    <ListItemAvatar>
                                        {file?.name?.endsWith(".pdf") ? (
                                            <iframe
                                                src={file.preview}
                                                title={file.name}
                                                width='36px'
                                                height='36px'
                                                style={{
                                                    border: "none",
                                                }}
                                            ></iframe>
                                        ) : (
                                            <img
                                                src={file.preview}
                                                alt='preview'
                                                style={{
                                                    width: "36px",
                                                    height: "36px",
                                                }}
                                            />
                                        )}
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={file.name}
                                        secondary={`${BytesFormatter(
                                            file.size
                                        )} bytes`}
                                    />
                                </ListItem>
                            </Box>
                        ))}
                    </List>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    component='span'
                    fullWidth
                    sx={{ marginTop: "8px" }}
                    onClick={handleFilesUpload}
                    loading={isPending}
                >
                    Upload
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UploadFileModal;
