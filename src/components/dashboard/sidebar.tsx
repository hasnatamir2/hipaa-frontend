"use client";

import { FC, useState } from "react";
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Drawer,
    Toolbar,
    Typography,
    Box,
    ListItemButton,
    Collapse,
} from "@mui/material";

import {
    Dashboard,
    Group,
    PersonAdd,
    Folder,
    InsertDriveFile,
    ExitToApp,
    ExpandLess,
    ExpandMore,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DRAWER_WIDTH } from "@/constants/string";
import { useAuth } from "@/hooks/useAuth";

const Sidebar: FC<{ open: boolean; toggleDrawer: () => void }> = ({
    open,
    toggleDrawer,
}) => {
    const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
    const { push } = useRouter();
    const { onLogout } = useAuth();

    const menuItems = [
        { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
        {
            text: "Users",
            icon: <Group />,
            path: "",
            subItems: [
                {
                    text: "List User",
                    icon: <PersonAdd />,
                    path: "/dashboard/users",
                },
                {
                    text: "Create User",
                    icon: <PersonAdd />,
                    path: "/dashboard/users/create-user",
                },
            ],
        },
        { text: "Folders", icon: <Folder />, path: "/dashboard/folders" },
        {
            text: "My Files",
            icon: <InsertDriveFile />,
            path: "/dashboard/files",
        },
        { text: "Logout", icon: <ExitToApp color="error" />, path: "/logout" },
    ];

    const handleMenuClick = (text: string) => {
        setOpenMenus({ ...openMenus, [text]: !openMenus[text] });
    };

    const handleNavClick = (path: string) => {
        push(path);
        toggleDrawer();
    };
    return (
        <Drawer
            anchor='left'
            open={open}
            onClose={toggleDrawer}
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: DRAWER_WIDTH,
                    boxSizing: "border-box",
                    paddingX: 2,
                },
            }}
        >
            <Toolbar>
                <Typography variant='h6' sx={{ ml: 1 }}>
                    Hipaa
                </Typography>
            </Toolbar>
            <List>
                {menuItems.map((item, index) => (
                    <Box key={index}>
                        {item.subItems ? (
                            <>
                                <ListItemButton
                                    onClick={() => handleMenuClick(item.text)}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text}>
                                        {item.text}
                                    </ListItemText>
                                    {openMenus[item.text] ? (
                                        <ExpandLess />
                                    ) : (
                                        <ExpandMore />
                                    )}
                                </ListItemButton>

                                <Collapse
                                    in={openMenus[item.text]}
                                    timeout='auto'
                                    unmountOnExit
                                >
                                    <List component='div' disablePadding>
                                        {item.subItems.map((subItem, index) => (
                                            <ListItemButton
                                                key={index}
                                                sx={{ pl: 4 }}
                                                onClick={() =>
                                                    handleNavClick(subItem.path)
                                                }
                                            >
                                                <ListItemIcon>
                                                    {subItem.icon}
                                                </ListItemIcon>
                                                <ListItemText>
                                                    {subItem.text}
                                                </ListItemText>
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            </>
                        ) : (
                            <ListItemButton
                                key={index}
                                onClick={() => handleNavClick(item.path)}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText>{item.text}</ListItemText>
                            </ListItemButton>
                        )}
                    </Box>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
