'use client';

import { Alert, Snackbar } from "@mui/material";
import { memo } from "react";
import { useTranslation } from "react-i18next";

export const Snack = memo(({open, handleClose, autoHideDuration, variant, infoAboutChosenCurrency}) => {


    let {t} = useTranslation();
    

    if(variant === 'currency') {
        return (
            <Snackbar open={open} onClose={handleClose} autoHideDuration={autoHideDuration}>
                <Alert severity="success">
                    {t('snack-currency-text')} {infoAboutChosenCurrency.listNumber} &#8212; {infoAboutChosenCurrency.currency}
                </Alert>
            </Snackbar>
        )
    }
    else if(variant === 'all-currencies') {
        return (
            <Snackbar open={open} onClose={handleClose} autoHideDuration={autoHideDuration}>
                <Alert severity="success">
                    {t('snack-all-currencies')}
                </Alert>
            </Snackbar>
        )
    }
    else {
        return (
            <Snackbar open={open} onClose={handleClose} autoHideDuration={autoHideDuration}>
                <Alert severity="success">
                    {t('has-been-changed-lng')} {t(``)}
                </Alert>
            </Snackbar>
        )
    }
})