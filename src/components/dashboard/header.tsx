"use client";

import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import UploadFileModal from "./files/upload-file-modal";
import { useState } from "react";
import { Menu, CloudUpload } from "@mui/icons-material";

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
                        aria-label='upload-file'
                        onClick={() => setOpenUpload(true)}
                        startIcon={<CloudUpload />}
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
