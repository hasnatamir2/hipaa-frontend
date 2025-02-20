"use client";

import {
    List,
    ListItemText,
    CircularProgress,
    ListItemButton,
    Grid2,
    ListItemIcon,
    ToggleButtonGroup,
    ToggleButton,
    Container,
    Card,
    CardContent,
    Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { List as ListIcon, GridView } from "@mui/icons-material";

const ListGridView = ({
    data,
    isLoading,
    error,
    secondaryContent,
    icon,
}: {
    data: Array<any>;
    isLoading: boolean;
    error?: any;
    secondaryContent: any;
    icon: any;
}) => {
    const [toggleView, setToggleView] = useState<string | null>("list");
    if (isLoading) return <CircularProgress />;
    if (error) return <div>Error loading files</div>;

    const handleViewChange = (event: any, newView: string | null) => {
        if (newView !== null) {
            setToggleView(newView);
        }
    };

    return (
        <Container>
            <ToggleButtonGroup
                exclusive
                size='small'
                value={toggleView}
                onChange={handleViewChange}
            >
                <ToggleButton value='list'>
                    <ListIcon />
                </ToggleButton>
                <ToggleButton value='grid'>
                    <GridView />
                </ToggleButton>
            </ToggleButtonGroup>
            {
                // Add grid view here
                toggleView === "grid" ? (
                    <Grid2 container spacing={2}>
                        {data.map((item: any) => (
                            <Grid2
                                size={{ xs: 12, sm: 6, md: 4 }}
                                key={item.id}
                            >
                                <Card>
                                    <CardContent>
                                        <Typography variant='body1'>
                                            {item.name}
                                        </Typography>
                                        <Typography variant='body2'>
                                            {secondaryContent}
                                        </Typography>
                                    </CardContent>
                                </Card>{" "}
                            </Grid2>
                        ))}
                    </Grid2>
                ) : (
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
                )
            }
        </Container>
    );
};

export default ListGridView;
