"use client";
import { useGetActivityLogsByUserId } from "@/hooks/useActivityLogs";
import { Box } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";
import { FC } from "react";

const ActivityLogsTable: FC = () => {

    const { data, isLoading } = useGetActivityLogsByUserId();
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 300 },
        { field: "action", headerName: "Action", width: 150 },
        {
            field: "targetId",
            headerName: "Target Id",
            width: 300,
        },
        {
            field: "targetType",
            headerName: "Type",
            width: 150,
        },
        {
            field: "timestamp",
            headerName: "Timestamp",
            width: 250,
            renderCell: (params: GridCellParams) =>
                format(String(params.value), "yyyy/MM/dd hh:mm a"),
        },
    ];
    return (
        <Box sx={{ height: 500, width: "100%", marginTop: 2 }}>
            <DataGrid
                rows={data?.result || []}
                columns={columns}
                loading={isLoading}
            />
        </Box>
    );
};

export default ActivityLogsTable;
