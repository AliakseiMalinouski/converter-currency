'use client';

import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import classes from './Title.module.css';
import { motion } from "framer-motion";
import { appVariants } from "@/framer_motion/variant";

export const Title = memo(({tag, text}) => {

    let Tag = tag || 'h2';

    let {t} = useTranslation();

    const [componentState, setComponentState] = useState(false);

    useEffect(() => {
        setComponentState(true);
    }, []);

    if(!componentState) {
        return null;
    }

    return (
        <motion.div className={classes.Title} variants={appVariants.title} initial={'hidden'} animate={'visible'}>
            <Tag>{t(`${text}`)}</Tag>
        </motion.div>
    )
})