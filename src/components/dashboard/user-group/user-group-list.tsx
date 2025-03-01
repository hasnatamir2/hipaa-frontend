"use client";
import { useQueryClient } from "@tanstack/react-query";
import {
    List,
    ListItem,
    ListItemText,
    IconButton,
    CircularProgress,
    Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDeleteGroup, useAllUserGroup } from "@/hooks/useUserGroup";
import { useRouter } from "next/navigation";

const UserGroupList = () => {
    const { push } = useRouter();
    const queryClient = useQueryClient();
    const { data: groups, isLoading, error } = useAllUserGroup();

    const deleteMutation = useDeleteGroup({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-user-groups"] });
        },
    });

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography variant="subtitle2">Error fetching Groups</Typography>

    return (
        <List>
            {groups && groups?.map((group: any) => (
                <ListItem
                    key={group.id}
                    secondaryAction={
                        <IconButton
                            onClick={() =>
                                deleteMutation.mutate({ groupId: group.id })
                            }
                            color='error'
                        >
                            <Delete />
                        </IconButton>
                    }
                >
                    <ListItemText
                        primary={group.name}
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                            push(`/dashboard/user-group/${group.id}`)
                        }
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default UserGroupList;
