"use client";

import {
    List,
    ListItemText,
    CircularProgress,
    Grid2,
    ListItemIcon,
    ToggleButtonGroup,
    ToggleButton,
    Container,
    Card,
    CardContent,
    Typography,
    ListItem,
    IconButton,
    Menu,
    MenuItem,
    Box,
    CardMedia,
    CardActions,
    CardActionArea,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { List as ListIcon, GridView, MoreVert } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Action {
    label: string;
    disabled?: boolean;
    onClick: (action: string, id: string) => void;
}
interface ListGridViewProps {
    data: Array<any>;
    isLoading: boolean;
    error?: any;
    icon: any;
    actions?: Array<Action>;
    title?: string;
    subTitle?: string;
}

const ListGridView = ({
    data,
    isLoading,
    error,
    icon,
    actions,
    title,
    subTitle,
}: ListGridViewProps) => {
    const [toggleView, setToggleView] = useState<"list" | "grid">("list");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const { push } = useRouter();

    if (isLoading) return <CircularProgress />;
    if (error) return <div>Error loading files</div>;

    const handleViewChange = (event: any, newView: "list" | "grid") => {
        if (newView !== null) {
            setToggleView(newView);
        }
    };

    const handleMenuOpen = (
        event: React.MouseEvent<HTMLElement>,
        id: string
    ) => {
        setAnchorEl(event.currentTarget);
        setSelectedId(id);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedId(null);
    };

    const handleActionClick = (
        action: string,
        actionCallBack: (id: string, action: string) => void
    ) => {
        if (selectedId) {
            actionCallBack(selectedId, action);
        }
        handleMenuClose();
    };

    if (data.length === 0) {
        return <Typography>No data available</Typography>;
    }

    return (
        <Container>
            <Box
                component='div'
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                marginBottom={2}
            >
                <Typography variant='h6'>{title}</Typography>
                <Typography variant='body2'>{subTitle}</Typography>
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
            </Box>
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
                                    <CardActionArea
                                        onClick={() => push(item.link)}
                                    >
                                        <CardMedia sx={{ textAlign: "center" }}>
                                            <Image
                                                src={item.icon}
                                                height={100}
                                                width={100}
                                                alt={item.name}
                                            />
                                        </CardMedia>
                                        <CardContent>
                                            <Typography variant='body1'>
                                                {item.name}
                                            </Typography>
                                            <Typography variant='body2'>
                                                {item.secondaryContent}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        {actions && actions?.length > 0 && (
                                            <IconButton
                                                onClick={(e) =>
                                                    handleMenuOpen(e, item.id)
                                                }
                                                style={{}}
                                            >
                                                <MoreVert />
                                            </IconButton>
                                        )}
                                    </CardActions>
                                </Card>
                            </Grid2>
                        ))}
                    </Grid2>
                ) : (
                    <List style={{ maxHeight: "75dvh", overflow: "scroll" }}>
                        {data.map((item: any) => {
                            return (
                                <ListItem
                                    divider
                                    key={item.id}
                                    secondaryAction={
                                        actions &&
                                        actions?.length > 0 && (
                                            <IconButton
                                                onClick={(e: any) =>
                                                    handleMenuOpen(e, item.id)
                                                }
                                            >
                                                <MoreVert />
                                            </IconButton>
                                        )
                                    }
                                    sx={{ cursor: "pointer" }}
                                >
                                    <ListItemIcon
                                        onClick={() => push(item.link)}
                                    >
                                        <Image
                                            src={item.icon}
                                            height={32}
                                            width={32}
                                            alt={item.name}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        onClick={() => push(item.link)}
                                        primary={item.name}
                                        secondary={item.secondaryContent}
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                )
            }
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                {actions?.map((action: any, index: number) => (
                    <MenuItem
                        disabled={action.disabled}
                        onClick={() =>
                            handleActionClick(action.label, action.onClick)
                        }
                        key={index}
                    >
                        {action.label}
                    </MenuItem>
                ))}
            </Menu>
        </Container>
    );
};

export default ListGridView;
