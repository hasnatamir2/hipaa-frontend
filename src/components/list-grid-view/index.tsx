"use client";

import {
    List,
    ListItemText,
    CircularProgress,
    ListItemButton,
    Box,
    ListItemIcon,
} from "@mui/material";
import Link from "next/link";

const FileList = ({
    data,
    isLoading,
    error,
    secondaryContent,
    icon,
}: {
    data: Array<any>;
    isLoading: boolean;
    error: any;
    secondaryContent: any;
    icon: any;
}) => {
    if (isLoading) return <CircularProgress />;
    if (error) return <div>Error loading files</div>;

    return (
        <Box>
            <List style={{ maxHeight: 500, overflow: "scroll" }}>
                {data.map((item: any) => {
                    return (
                        <ListItemButton
                            key={item.id}
                            component={Link}
                            href={item.link}
                        >
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText
                                primary={item.name}
                                secondary={secondaryContent}
                            />
                        </ListItemButton>
                    );
                })}
            </List>
        </Box>
    );
};

export default FileList;
