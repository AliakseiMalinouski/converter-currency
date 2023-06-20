'use client';

import React from "react";
import classes from './AboutContent.module.css';
import { Title } from "./Title";
import { Paragraph } from "./Paragraph";
import { useTranslation } from "react-i18next";

export const AboutContent = () => {

    let {t} = useTranslation();

    return (
        <div className={classes.AboutContent}>
            <Title tag='h2' text='about-us-title'/>
            <Paragraph t={t} text='paragraph-about-us'/>
        </div>
    )
}