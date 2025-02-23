"use client";
import { useValidateLink } from "@/hooks/useSharedLinks";
import {
    Box,
    Button,
    CircularProgress,
    Container,
    TextField,
    Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ValidateLink {
    password: string;
}

export default function SharedLink() {
    const { token } = useParams();
    const { push } = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ValidateLink>();
    const [password, setPassword] = useState("");

    const { data, isPending, error, isSuccess } = useValidateLink(
        token as string,
        password
    );

    const onSubmit = async ({ password }: ValidateLink) => {
        setPassword(password);
        // refetch
    };

    if ((error as any)?.status === 404) {
        return (
            <Container maxWidth='md'>
                <Typography variant='h4'>
                    {(error as any)?.data?.message}
                </Typography>
            </Container>
        );
    }

    if ((error as any)?.status === 403) {
        return (
            <Container maxWidth='sm'>
                <Box maxWidth='sm'>
                    <Typography>Enter password to access file</Typography>
                    <Box
                        component='form'
                        noValidate
                        autoComplete='off'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <TextField
                            fullWidth
                            label='Password'
                            type={"text"}
                            variant='outlined'
                            margin='normal'
                            {...register("password")}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                        <Button type='submit'>Submit</Button>
                    </Box>
                </Box>
            </Container>
        );
    }

    if (isSuccess && data.file) {
        const fileId = data?.file?.id;
        push(`/file/${fileId}`);
        return (
            <Container>
                <Typography variant='h4'>Redirecting...</Typography>
            </Container>
        );
    }

    return <Container>{isPending && <CircularProgress size={24} />}</Container>;
}
