"use client";

import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import FolderIcon from "@mui/icons-material/Folder";
import Link from "next/link";

const Sidebar = () => {
    return (
        <nav
            aria-label='main mailbox folders'
            style={{
                width: "250px",
                height: "100vh",
                backgroundColor: "#f4f4f4",
                paddingLeft: '1rem'
            }}
        >
            <List>
                <ListItem disablePadding component={Link} href='/dashboard'>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText>Dashboard</ListItemText>
                </ListItem>
                <ListItem
                    disablePadding
                    component={Link}
                    href='/dashboard/users'
                >
                    <ListItemIcon>
                        <GroupIcon />
                    </ListItemIcon>
                    <ListItemText>Users</ListItemText>
                </ListItem>
                <ListItem
                    disablePadding
                    component={Link}
                    href='/dashboard/users/create-user'
                >
                    <ListItemIcon>
                        <FolderIcon />
                    </ListItemIcon>
                    <ListItemText>Create User</ListItemText>
                </ListItem>
                <ListItem
                    disablePadding
                    component={Link}
                    href='/dashboard/folders'
                >
                    <ListItemIcon>
                        <FolderIcon />
                    </ListItemIcon>
                    <ListItemText>Folders</ListItemText>
                </ListItem>
            </List>
        </nav>
    );
};

export default Sidebar;
