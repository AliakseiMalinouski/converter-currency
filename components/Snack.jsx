'use client';

import { Alert, Snackbar } from "@mui/material";
import { memo } from "react";
import { useTranslation } from "react-i18next";

export const Snack = memo(({open, handleClose, autoHideDuration}) => {

    let {t} = useTranslation();

    return (
        <Snackbar open={open} onClose={handleClose} autoHideDuration={autoHideDuration}>
            <Alert severity="success">
                {t('has-been-changed-lng')} {t(``)}
            </Alert>
        </Snackbar>
    )
})