import React from "react";
import { useForm } from "react-hook-form";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    CircularProgress,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import { useFolders } from "@/hooks/useFolders";

const FolderForm = ({
    open,
    onClose,
    defaultValues,
    onSubmit,
    mode = "create",
    isLoading,
}: {
    open: boolean;
    onClose: () => any;
    onSubmit: (data: any) => any;
    defaultValues?: {
        [key: string]: any;
    };
    isLoading?: boolean;
    mode?: "create" | "edit";
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<{ name: string; parentFolderId?: string }>({
        defaultValues,
    });

    const { data: folders } = useFolders();

    const handleFormSubmit = (data: any) => {
        onSubmit(data);
        reset();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>
                {mode === "edit" ? "Edit Folder" : "Create Folder"}
            </DialogTitle>
            <DialogContent>
                <Box component='form' onSubmit={handleSubmit(handleFormSubmit)}>
                    <TextField
                        {...register("name", {
                            required: "Folder name is required",
                        })}
                        label='Folder Name'
                        fullWidth
                        margin='normal'
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <FormControl
                        fullWidth
                        margin='normal'
                        error={!!errors.parentFolderId}
                    >
                        <InputLabel>Parent Folder</InputLabel>
                        <Select
                            label='Parent Folder'
                            defaultValue=''
                            {...register("parentFolderId")}
                            fullWidth
                        >
                            {folders?.map((group: any) => (
                                <MenuItem key={group.id} value={group.id} disabled={group.id === defaultValues?.id}>
                                    {group.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <DialogActions>
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <>
                                <Button
                                    type='submit'
                                    color='primary'
                                    variant='contained'
                                    disabled={isLoading}
                                >
                                    {mode === "edit" ? "Update" : "Create"}
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </>
                        )}
                    </DialogActions>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default FolderForm;
