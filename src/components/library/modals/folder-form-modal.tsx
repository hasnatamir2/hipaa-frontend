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
} from "@mui/material";

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
    } = useForm<{ name: string }>({
        defaultValues,
    });

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
                <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default FolderForm;
