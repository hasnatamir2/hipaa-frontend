"use client";

import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import UploadFileModal from "../library/modals/upload-file-modal";
import { useState } from "react";
import { Menu, CloudUpload } from "@mui/icons-material";
import { UserRole } from "@/constants/roles";

const Header = ({ user, handleDrawer }: any) => {
    const [openUpload, setOpenUpload] = useState<boolean>(false);

    return (
        <>
            <AppBar position='fixed'>
                <Toolbar>
                    <IconButton
                        edge='start'
                        color='inherit'
                        onClick={handleDrawer}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant='h6' sx={{ flexGrow: 1 }}>
                        Hipaa - Dashboard
                    </Typography>
                    <Button
                        color='inherit'
                        variant='outlined'
                        aria-label='upload-file'
                        onClick={() => setOpenUpload(true)}
                        startIcon={<CloudUpload />}
                        disabled={user?.role === UserRole.STANDARD_USER}
                    >
                        Upload File
                    </Button>
                </Toolbar>
            </AppBar>
            <UploadFileModal
                open={openUpload}
                handleClose={() => setOpenUpload(false)}
            />
        </>
    );
};

export default Header;
