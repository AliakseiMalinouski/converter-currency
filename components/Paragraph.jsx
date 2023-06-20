'use client';

import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import classes from './Paragraph.module.css';

export const Paragraph = memo(({text}) => {

    let {t} = useTranslation();

    const [mount, setMount] = useState(false);

    useEffect(() => {
        setMount(true);
    }, []);

    if(!mount) {
        return null;
    }
    else {
        return (
            <p className={classes.Paragraph}>{t(`${text}`)}</p>
        )
    }
})