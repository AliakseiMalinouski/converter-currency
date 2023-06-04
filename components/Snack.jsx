'use client';

import { Alert, Snackbar } from "@mui/material";
import { memo } from "react";

export const Snack = memo(({open, handleClose, autoHideDuration}) => {
    return (
        <Snackbar open={open} onClose={handleClose} autoHideDuration={autoHideDuration}>
            <Alert severity="success">
                success
            </Alert>
        </Snackbar>
    )
})