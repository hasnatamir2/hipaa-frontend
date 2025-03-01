"use client";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { Box, Button, TextField } from "@mui/material";
import { useCreateUserGroup } from "@/hooks/useUserGroup";

interface ICreateGroupForm {
    name: string;
}

const UserGroupForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ICreateGroupForm>();
    const queryClient = useQueryClient();

    const onSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ["get-user-groups"] });
        reset();
    };

    const { mutate, isPending } = useCreateUserGroup({ onSuccess });

    const onSubmit = ({ name }: any) => {
        mutate({ name });
    };

    return (
        <Box
            component='form'
            noValidate
            autoComplete='off'
            sx={{ mt: 2, display: "flex", alignItems: "start", gap: 2 }}
            onSubmit={handleSubmit(onSubmit)}
        >
            <TextField
                label='Group Name'
                fullWidth
                variant='outlined'
                required
                size="small"
                {...register("name", {
                    required: "Group name is required",
                })}
                sx={{ maxWidth: '85%' }}
                error={!!errors.name}
                helperText={errors.name?.message}
            />
            <Button
                type='submit'
                variant='contained'
                color='primary'
                loading={isPending}
            >
                Create Group
            </Button>
        </Box>
    );
};

export default UserGroupForm;
