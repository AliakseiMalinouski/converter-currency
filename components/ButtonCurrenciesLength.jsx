'use client';

import { Button } from "@mui/material";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import styles from './ButtonCurrenciesLength.module.css';
import { converterEvents } from "@/events";

export const ButtonCurrenciesLength = memo(({text}) => {

    let {t} = useTranslation();

    const handleClick = () => converterEvents.emit('showAllCurrencies');

    return (
        <div className={styles.Button} onClick={handleClick}>
            <Button variant="contained">
                {t(`${text}`)}
            </Button>
        </div>
    )
})