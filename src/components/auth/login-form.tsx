"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useAuth";
import { useState } from "react";
import { AxiosError } from "axios";
import { ACCESS_TOKEN, USER } from "@/constants/string";
import Link from "next/link";
import { IUserData } from "@/interfaces";
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    TextField,
    Typography,
    Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface FormData {
    email: string;
    password: string;
}

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();
    const { push } = useRouter();
    const [error, setError] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const onSuccess = ({
        access_token,
        user,
    }: {
        access_token: string;
        user: IUserData;
    }) => {
        localStorage.setItem(ACCESS_TOKEN, access_token);
        localStorage.setItem(USER, JSON.stringify(user));
        push("/");
    };

    const onError = (errorResponse: AxiosError) => {
        const data = errorResponse.response?.data as { message: string };
        setError(data?.message || "An unexpected error occurred");
    };

    const { mutate: login } = useLogin({ onSuccess, onError });

    const onSubmit = async (data: FormData) => {
        try {
            login(data); // Trigger login mutation
        } catch (error) {
            console.error("Submission error:", error);
            setError("Login failed, please try again."); // Handle unexpected errors
        }
    };

    return (
        <Container
            maxWidth='sm'
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Card sx={{ width: "100%", p: 3, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant='h4' align='center' gutterBottom>
                        Login
                    </Typography>
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
                            {...register("password", {
                                required: "Password is required",
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
                        <Box sx={{ textAlign: "right", mt: 1 }}>
                            <Link
                                href='/auth/forget-password'
                                className='text-sm hover:underline'
                            >
                                Forget password?
                            </Link>
                        </Box>
                        {error && (
                            <Alert severity='error' sx={{ mt: 2 }}>
                                {error}
                            </Alert>
                        )}
                        <Button
                            fullWidth
                            variant='contained'
                            color='primary'
                            sx={{ mt: 2 }}
                            type='submit'
                            loading={isSubmitting}
                        >
                            Login
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default LoginForm;
