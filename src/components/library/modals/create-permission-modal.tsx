"use client";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    Button,
} from "@mui/material";
import { useCreateFilePermission } from "@/hooks/usePermissions";
import { useForm } from "react-hook-form";
import { PermissionLevel, ResourceType } from "@/constants/permission-level";

interface ISharedLinkForm {
    email: string;
    accessMode: PermissionLevel;
}

const accessOptinons = [
    { value: PermissionLevel.VIEW, label: "View Only" },
    { value: PermissionLevel.EDIT, label: "Edit & View" },
];

const CreatePermissionModal = ({
    open,
    onClose,
    fileId,
    type = ResourceType.FILE,
}: any) => {
    const { mutate } = useCreateFilePermission();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ISharedLinkForm>();

    const onSubmit = async ({ email, accessMode }: ISharedLinkForm) => {
        const access = {
            canRead: false,
            canWrite: false,
            canShare: false,
            canDelete: false,
        };
        if (accessMode === PermissionLevel.VIEW) {
            access.canRead = true;
        }
        if (accessMode === PermissionLevel.EDIT) {
            access.canRead = true;
            access.canShare = true;
            access.canWrite = true;
        }
        mutate({
            resourceType: type,
            email,
            resourceId: fileId,
            permissionLevel: accessMode,
            ...access,
        });
    };
    return (
        <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
            <DialogTitle>Share file# {fileId}</DialogTitle>
            <DialogContent>
                <Box
                    component='form'
                    noValidate
                    autoComplete='off'
                    sx={{ mt: 2 }}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextField
                        fullWidth
                        label='Email'
                        variant='outlined'
                        margin='normal'
                        type='email'
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                message: "Invalid email address",
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <FormControl
                        fullWidth
                        margin='normal'
                        error={!!errors.accessMode}
                    >
                        <InputLabel>Access Mode</InputLabel>
                        <Select
                            label='Access Mode'
                            defaultValue=''
                            {...register("accessMode", {
                                required: "Access Mode is required",
                            })}
                        >
                            {accessOptinons.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.accessMode && (
                            <FormHelperText>
                                {errors.accessMode.message}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                    >
                        Share Access
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default CreatePermissionModal;
