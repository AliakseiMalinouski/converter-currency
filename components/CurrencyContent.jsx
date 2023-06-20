'use client';
import { motion } from "framer-motion";
import { appVariants } from "@/framer_motion/variant";
import currency from "@/mobx/store/currency";
import { observer } from "mobx-react-lite";
import classes from './CurrencyContent.module.css';
import { Title } from "./Title";
import { Paragraph } from "./Paragraph";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Progress } from "./Progress";

export const CurrencyContent = observer(() => {

    const [mount, setMount] = useState(false);

    useEffect(() => {
        setMount(true);
    }, []);

    let {t} = useTranslation();

    if(!mount) {
        return <Progress/>
    }
    else {
        return (
            <div className={classes.CurrencyContent}>
                <Title tag='h2' text='currency-api-title'/>
                <Paragraph t={t} text='currency-api-text'/>
                <Link className={classes.LinkC} href='/currency/information'>{t('go-to-api-info')}</Link>
            </div>
        )
    }
})