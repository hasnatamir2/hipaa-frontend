"use client";
import { Box, Typography, Card, CardContent, Grid2 } from "@mui/material";
import { FC } from "react";

const Dashboard: FC = () => {
    return (
        <Box sx={{ flexGrow: 1, padding: 3 }}>
            <Typography variant='h4' gutterBottom>
                Dashboard Overview
            </Typography>

            <Grid2 container spacing={3}>
                {/* Card 1 */}
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <Card>
                        <CardContent>
                            <Typography variant='h6'>Active Users</Typography>
                            <Typography variant='h4'>256</Typography>
                        </CardContent>
                    </Card>
                </Grid2>

                {/* Card 2 */}
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <Card>
                        <CardContent>
                            <Typography variant='h6'>Total Files</Typography>
                            <Typography variant='h4'>1,025</Typography>
                        </CardContent>
                    </Card>
                </Grid2>

                {/* Card 3 */}
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <Card>
                        <CardContent>
                            <Typography variant='h6'>
                                New Notifications
                            </Typography>
                            <Typography variant='h4'>34</Typography>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default Dashboard;
