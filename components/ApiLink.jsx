'use client';

import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import details from "@/mobx/store/details";
import { toJS } from "mobx";
import { Progress } from "./Progress";
import { useTranslation } from "react-i18next";
import classes from './Details.module.css';

export const ApiLink = observer(({id}) => {

    let {t} = useTranslation();

    let detailsAPI = toJS(details.details);

    const [currentLink, setCurrentLink] = useState(undefined);

    useEffect(() => {
        if(!detailsAPI.length) details.loadDetails("https://gist.githubusercontent.com/AliakseiMalinouski/459d39deac32e19f72e6e1b090b3a9c4/raw/06a60c9b235ef5338af879c2ade074e2069d512e/DetailsAPIConv")
    }, [detailsAPI]);

    useEffect(() => {
        if(currentLink === undefined) {
            let neededLink = detailsAPI.find(elem => elem.id === parseInt(id));
            setCurrentLink(neededLink);
        }
    }, [id, detailsAPI]);

    console.log(currentLink)
    
    if(currentLink === undefined) {
        return <Progress/>
    }
    else {
        return (
            <a className={classes.LinkDetails} target="_blank" href={currentLink.link}>{t(`${currentLink.title}`)}</a>
        )
    }
})