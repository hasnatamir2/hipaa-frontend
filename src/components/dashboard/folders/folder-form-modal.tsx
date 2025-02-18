import React from "react";
import { useForm } from "react-hook-form";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";

const FolderForm = ({
    open,
    onClose,
    defaultValues,
    onSubmit,
}: {
    open: boolean;
    onClose: () => any;
    onSubmit: (data: any) => any;
    defaultValues?: {
        [key: string]: any;
    };
}) => {
    const { register, handleSubmit, reset, getValues } = useForm({
        defaultValues,
    });

    const handleFormSubmit = (data: any) => {
        onSubmit(data);
        reset();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Folder</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <TextField
                        {...register("name")}
                        label='Folder Name'
                        fullWidth
                        margin='normal'
                    />
                    <Button type='submit' color='primary' variant='contained'>
                        Create
                    </Button>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color='secondary'>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FolderForm;
