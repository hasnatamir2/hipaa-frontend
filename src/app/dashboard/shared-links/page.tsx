"use client";
import {
    useGetSharedLinksByUserId,
    useRemoveSharedLink,
} from "@/hooks/useSharedLinks";
import {
    Alert,
    Box,
    Button,
    Chip,
    Container,
    IconButton,
    Snackbar,
} from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";
import { ContentCopy } from "@mui/icons-material";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const SharedLinksPage = () => {
    const queryClient = useQueryClient();
    const onSuccess = (data: any) => {
        queryClient.invalidateQueries({
            queryKey: ["get-shared-links"],
        });
        setSnackbarMessage(data?.message);
        setCopySuccess(true);
    };
    const { data: sharedLinks, isLoading } = useGetSharedLinksByUserId();
    const {
        mutate: revokeLink,
        isPending,
    } = useRemoveSharedLink({ onSuccess });
    const [copySuccess, setCopySuccess] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleCopyLink = async (linkToken: string) => {
        try {
            const link = `${process.env.NEXT_PUBLIC_URL}/shared-link/${linkToken}`;
            await navigator.clipboard.writeText(link);
            setSnackbarMessage("Link Copied!");
            setCopySuccess(true);
        } catch (err) {
            console.log(err);
            setCopySuccess(true);
        }
    };

    const handleLinkRevoke = (data: GridCellParams) => {
        revokeLink(data?.row?.id);
    };

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 300 },
        {
            field: "linkToken",
            headerName: "Token",
            width: 320,
            renderCell: (params: GridCellParams) => (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {params?.value as string}
                    <IconButton
                        onClick={() => handleCopyLink(params?.value as string)}
                    >
                        <ContentCopy />
                    </IconButton>
                </Box>
            ),
        },
        {
            field: "isActive",
            headerName: "Status",
            renderCell: (params: GridCellParams) => (
                <Chip
                    variant='outlined'
                    label={params.value ? "Active" : "Expired"}
                    color={params.value ? "success" : "error"}
                />
            ),
        },
        {
            field: "downloads",
            headerName: "Downloads",
            width: 100,
        },
        {
            field: "expiresAt",
            headerName: "Expires At",
            width: 200,
            renderCell: (params: GridCellParams) =>
                format(String(params.value), "yyyy/MM/dd hh:mm a"),
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params: GridCellParams) => (
                <Button
                    color='error'
                    variant='outlined'
                    loading={isPending}
                    onClick={() => {
                        handleLinkRevoke(params);
                    }}
                >
                    Revoke
                </Button>
            ),
        },
    ];

    const handleSnackbarClose = () => {
        setCopySuccess(false);
        setSnackbarMessage("");
    };
    return (
        <Container>
            <Box sx={{ height: 500, width: "100%", marginTop: 2 }}>
                <DataGrid
                    rows={sharedLinks}
                    columns={columns}
                    loading={isLoading}
                />
            </Box>
            <Snackbar open={copySuccess} autoHideDuration={6000}>
                <Alert
                    onClose={handleSnackbarClose}
                    severity='success'
                    variant='filled'
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default SharedLinksPage;
