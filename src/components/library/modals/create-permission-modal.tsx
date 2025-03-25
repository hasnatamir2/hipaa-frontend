"use client";

import { useState } from "react";
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
    CircularProgress,
    Typography,
    IconButton,
    Alert,
} from "@mui/material";
import { ContentCopy, Visibility, VisibilityOff } from "@mui/icons-material";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm, Controller } from "react-hook-form";

import { useAssignFileToUsers } from "@/hooks/usePermissions";
import { AccessLevel } from "@/constants/permission-level";
import { useAllUsers } from "@/hooks/useUsers";
import { IUserData } from "@/interfaces";
import { useCreateSharedLink } from "@/hooks/useSharedLinks";

interface ISharedLinkForm {
    emails: string[];
    accessLevel: AccessLevel;
}

interface ISharedLinkForm {
    password?: string;
    expiresAt?: string | null;
}

const accessOptinons = [
    { value: AccessLevel.READ, label: "View Only" },
    { value: AccessLevel.WRITE, label: "Edit & View" },
];

const ShareAccessForm = ({
    onClose,
    fileId,
}: {
    onClose: () => void;
    fileId: string;
}) => {
    const { mutate, isPending } = useAssignFileToUsers();
    const { data: users, isLoading: usersLoading } = useAllUsers();
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<ISharedLinkForm>();

    const onSubmit = async ({ emails, accessLevel }: ISharedLinkForm) => {
        mutate({
            fileId,
            emails,
            accessLevel,
        });
    };

    if (usersLoading) return <CircularProgress />;

    return (
        <Box
            component='form'
            noValidate
            autoComplete='off'
            sx={{ mt: 2 }}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Controller
                name='emails'
                control={control}
                render={({ field: { onChange, value } }) => {
                    return (
                        <Autocomplete
                            multiple
                            id='emails'
                            options={users || []}
                            getOptionLabel={(option: any) => option.email}
                            getOptionKey={(option: any) => option.email}
                            defaultValue={[]}
                            filterSelectedOptions
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        label={option.email}
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant='outlined'
                                    label='Emails'
                                    placeholder='Emails'
                                />
                            )}
                            onChange={(event, item) => {
                                // parse the value to get the email
                                onChange(
                                    item.map((user: IUserData) => user.email)
                                );
                            }}
                            value={value}
                        />
                    );
                }}
            />

            <FormControl fullWidth margin='normal' error={!!errors.accessLevel}>
                <InputLabel>Access Level</InputLabel>
                <Select
                    label='Access Mode'
                    defaultValue=''
                    {...register("accessLevel", {
                        required: "Access Level is required",
                    })}
                >
                    {accessOptinons.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
                {errors.accessLevel && (
                    <FormHelperText>
                        {errors.accessLevel.message}
                    </FormHelperText>
                )}
            </FormControl>
            <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                loading={isPending}
            >
                Share Access
            </Button>
        </Box>
    );
};

const CreatePermissionModal = ({ open, onClose, fileId }: any) => {
    const [step, setStep] = useState(0); // step 0: generate shared link, step 1: share access
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ISharedLinkForm>();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const loggedInUser = localStorage.getItem("user");
    const user = JSON.parse(loggedInUser as string);
    const handleSuccess = () => {
        setStep(1);
    };
    const { mutate, data, isSuccess, isPending } = useCreateSharedLink({
        onSuccess: handleSuccess,
    });

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
    const { mutate: mutateAccess, isPending: isPendingAccess } =
        useAssignFileToUsers();
    const { data: users, isLoading: usersLoading } = useAllUsers();
    const {
        register: registerAccess,
        handleSubmit: handleSubmitAccess,
        formState: { errors: errorsAccess },
        control,
    } = useForm<ISharedLinkForm>();

    const onSubmitAccess = async ({ emails, accessLevel }: ISharedLinkForm) => {
        mutateAccess({
            fileId,
            emails,
            accessLevel,
        });
    };

    if (usersLoading) return <CircularProgress />;
    return (
        <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
            <DialogTitle sx={{ pb: 0 }}>
                {step === 0
                    ? "Create Shared Link for this File"
                    : "Share File Access"}
            </DialogTitle>
            <DialogContent>
                <Box
                    component='form'
                    noValidate
                    autoComplete='off'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextField
                        fullWidth
                        label='Password'
                        type={showPassword ? "text" : "password"}
                        variant='outlined'
                        size='small'
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
                        size='small'
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
                        color='inherit'
                        type='submit'
                        loading={isPending}
                    >
                        Generate Share link
                    </Button>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        marginTop: 1,
                    }}
                >
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
                {step === 1 && (
                    <Box
                        component='form'
                        noValidate
                        autoComplete='off'
                        sx={{ mt: 4 }}
                        onSubmit={handleSubmitAccess(onSubmitAccess)}
                    >
                        <Controller
                            name='emails'
                            control={control}
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <Autocomplete
                                        multiple
                                        id='emails'
                                        options={users || []}
                                        getOptionLabel={(option: any) =>
                                            option.email
                                        }
                                        getOptionKey={(option: any) =>
                                            option.email
                                        }
                                        getOptionDisabled={(option) =>
                                            option.email === user.email
                                        }
                                        clearOnEscape
                                        size='small'
                                        defaultValue={[]}
                                        filterSelectedOptions
                                        renderTags={(value, getTagProps) =>
                                            value.map((option, index) => (
                                                <Chip
                                                    size='small'
                                                    label={option.email}
                                                    {...getTagProps({ index })}
                                                />
                                            ))
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant='outlined'
                                                label='Emails'
                                                placeholder='Emails'
                                            />
                                        )}
                                        onChange={(event, item) => {
                                            // parse the value to get the email
                                            onChange(
                                                item.map(
                                                    (user: IUserData) =>
                                                        user.email
                                                )
                                            );
                                        }}
                                        value={value}
                                    />
                                );
                            }}
                        />

                        <FormControl
                            fullWidth
                            margin='normal'
                            size='small'
                            error={!!errorsAccess.accessLevel}
                        >
                            <InputLabel>Access Level</InputLabel>
                            <Select
                                label='Access Mode'
                                defaultValue=''
                                {...registerAccess("accessLevel", {
                                    required: "Access Level is required",
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
                            {errorsAccess.accessLevel && (
                                <FormHelperText>
                                    {errorsAccess.accessLevel.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            fullWidth
                            loading={isPendingAccess}
                        >
                            Share Access
                        </Button>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CreatePermissionModal;
