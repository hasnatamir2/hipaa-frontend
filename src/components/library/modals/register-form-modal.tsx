"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { UserRole } from "@/constants/roles";
import { useRegisterUser, useUpdateRole } from "@/hooks/useUsers";
import { useQueryClient } from "@tanstack/react-query";

interface RegisterFormInputs {
    email: string;
    password?: string;
    confirmPassword?: string;
    role: UserRole;
}

const RegisterForm = ({
    selectedUser,
    open,
    onClose,
    resetSelection,
}: {
    selectedUser?: any;
    open: boolean;
    onClose: any;
    resetSelection: any
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
    } = useForm<RegisterFormInputs>();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const onSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ["get-all-users"] });
        reset();
        onClose();
        resetSelection();
    };

    const { mutate } = useRegisterUser({ onSuccess });
    const { mutate: updateRole } = useUpdateRole({ onSuccess });

    useEffect(() => {
        console.log(selectedUser);
        if (selectedUser) {
            setValue("email", selectedUser.email);
            setValue("password", "123456");
            setValue("confirmPassword", "123456");
        }
    }, [selectedUser]);

    const onSubmit = async (data: RegisterFormInputs) => {
        if (!selectedUser) {
            mutate({
                email: data.email,
                password: data.password,
                role: data.role,
            });
        } else {
            updateRole({
                id: selectedUser.id,
                role: data.role,
            });
        }
    };

    const roles = [
        {
            label: "Admin",
            value: UserRole.ADMIN,
        },
        {
            label: "Health Professional",
            value: UserRole.HEALTH_PROFESSIONAL,
        },
        {
            label: "Standard User",
            value: UserRole.STANDARD_USER,
        },
    ];

    const password = watch("password");

    return (
        <Dialog open={open} fullWidth maxWidth='sm' onClose={onClose}>
            <DialogTitle>
                {selectedUser?.id ? "Edit User" : "Add User"}
            </DialogTitle>
            <DialogContent>
                <Box component='form' onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        label='Email'
                        variant='outlined'
                        margin='normal'
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email address",
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        fullWidth
                        label='Password'
                        type={showPassword ? "text" : "password"}
                        variant='outlined'
                        margin='normal'
                        disabled={selectedUser?.id}
                        {...register("password", {
                            required:
                                !selectedUser?.id && "Password is required",
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
                                    onClick={() =>
                                        !selectedUser?.id &&
                                        setShowPassword(false)
                                    }
                                />
                            ) : (
                                <VisibilityOff
                                    onClick={() =>
                                        !selectedUser?.id &&
                                        setShowPassword(true)
                                    }
                                />
                            ),
                        }}
                    />
                    <TextField
                        fullWidth
                        label='Confirm Password'
                        type={showPassword ? "text" : "password"}
                        variant='outlined'
                        margin='normal'
                        disabled={selectedUser?.id}
                        {...register("confirmPassword", {
                            required:
                                !selectedUser?.id &&
                                "Please confirm your password",
                            validate: (value) =>
                                value === password || "Passwords do not match",
                        })}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        InputProps={{
                            endAdornment: showPassword ? (
                                <Visibility
                                    onClick={() =>
                                        !selectedUser?.id &&
                                        setShowPassword(false)
                                    }
                                />
                            ) : (
                                <VisibilityOff
                                    onClick={() =>
                                        !selectedUser?.id &&
                                        setShowPassword(true)
                                    }
                                />
                            ),
                        }}
                    />
                    <FormControl
                        fullWidth
                        margin='normal'
                        error={!!errors.role}
                    >
                        <InputLabel id='role-label'>Role</InputLabel>
                        <Select
                            labelId='role-label'
                            label='Role'
                            defaultValue={
                                selectedUser?.id ? selectedUser.role : ""
                            }
                            {...register("role", {
                                required: "Role is required",
                            })}
                        >
                            {roles.map((role: any) => (
                                <MenuItem value={role.value} key={role.value}>
                                    {role.label}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText id='role-label'>
                            {errors.role?.message}
                        </FormHelperText>
                    </FormControl>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ marginTop: 1.5 }}
                    >
                        Save
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default RegisterForm;
