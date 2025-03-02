"use client";
import { useDashboardContext } from "@/components/dashboard/layout";
import { UserRole } from "@/constants/roles";
import { IUserData } from "@/interfaces";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid2,
    CardActionArea,
    CardActions,
    Button,
} from "@mui/material";
import { FC } from "react";

const Dashboard: FC = () => {
    const { user }: { user: IUserData } = useDashboardContext();
    const standardUserCards = [
        {
            title: "My Files",
            description: "View and manage your files",
            path: "/dashboard/files",
        },
        {
            title: "Folders",
            description: "Access your shared folders",
            path: "//dashboard/folders",
        },
    ];

    const adminCards = [
        {
            title: "Manage Users",
            description: "View and manage users",
            path: "/dashboard/users",
        },
        {
            title: "Manage Groups",
            description: "Create and edit groups",
            path: "/dashboard/user-groups",
        },
        {
            title: "All Files",
            description: "Access all system files",
            path: "/dashboard/files",
        },
    ];

    const cards = user.role === UserRole.ADMIN
        ? [...adminCards, ...standardUserCards]
        : standardUserCards;
    return (
        <Box sx={{ flexGrow: 1, padding: 3 }}>
            <Typography variant='h4' gutterBottom>
                Overview
            </Typography>

            <Grid2 container spacing={3}>
                {cards.map((card) => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={card.title}>
                        <Card>
                            <CardActionArea>
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant='h5'
                                        component='div'
                                    >
                                        {card.title}
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                    >
                                        {card.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button
                                    size='small'
                                    color='primary'
                                    href={card.path}
                                >
                                    Go
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
};

export default Dashboard;
