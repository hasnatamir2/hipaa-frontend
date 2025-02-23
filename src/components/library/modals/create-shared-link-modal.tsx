"use client";
import { useCreateSharedLink } from "@/hooks/useSharedLinks";
import { ContentCopy, Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    TextField,
    Button,
    Typography,
    IconButton,
    Alert,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ISharedLinkForm {
    password?: string;
    expiresAt?: string | null;
}

interface ICreateSharedLinkModal {
    open: boolean;
    onClose: () => any;
    fileId: string;
}

const CreateSharedLinkModal = ({
    open,
    onClose,
    fileId,
}: ICreateSharedLinkModal) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ISharedLinkForm>();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const { mutate, data, isSuccess, isPending } = useCreateSharedLink();

    const onSubmit = async ({ expiresAt, password }: ISharedLinkForm) => {
        setCopySuccess(false);
        mutate({
            fileId,
            expiresAt: Boolean(expiresAt) ? expiresAt : null,
            password: password,
        });
    };

    const handleCopyLink = async () => {
        try {
            const link = `${process.env.NEXT_PUBLIC_URL}/shared-link/${data.linkToken}`;
            await navigator.clipboard.writeText(link);
            setCopySuccess(true);
        } catch (err) {
            setCopySuccess(false);
        }
    };
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Shared Link for this File</DialogTitle>
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
                        label='Password'
                        type={showPassword ? "text" : "password"}
                        variant='outlined'
                        margin='normal'
                        {...register("password", {
                            minLength: {
                                value: 6,
                                message:
                                    "Password should be at least 6 characters",
                            },
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                            endAdornment: showPassword ? (
                                <Visibility
                                    onClick={() => setShowPassword(false)}
                                />
                            ) : (
                                <VisibilityOff
                                    onClick={() => setShowPassword(true)}
                                />
                            ),
                        }}
                    />
                    <TextField
                        fullWidth
                        label='Expires At'
                        variant='outlined'
                        margin='normal'
                        type='datetime-local'
                        {...register("expiresAt")}
                        error={!!errors.expiresAt}
                        helperText={errors.expiresAt?.message}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button
                        variant='contained'
                        fullWidth
                        color='primary'
                        sx={{ mt: 2 }}
                        type='submit'
                        loading={isPending}
                    >
                        Create Share link
                    </Button>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginTop: 1 }}>
                    {isSuccess && (
                        <Box
                            sx={{
                                border: "1px dashed",
                                padding: 1,
                                borderRadius: 1,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant='caption'>
                                {`${process.env.NEXT_PUBLIC_URL}/shared-link/${data?.linkToken}`}
                            </Typography>
                            <IconButton onClick={handleCopyLink}>
                                <ContentCopy />
                            </IconButton>
                        </Box>
                    )}
                    {copySuccess && <Alert>Copied to clipboard!</Alert>}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default CreateSharedLinkModal;
