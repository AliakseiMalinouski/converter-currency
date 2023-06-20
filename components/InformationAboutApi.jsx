'use client';

import classes from './InformationAboutApi.module.css';
import { useEffect, useMemo, useState } from "react";
import { Progress } from "./Progress";
import { observer } from "mobx-react-lite";
import details from '@/mobx/store/details';
import { toJS } from 'mobx';
import { useTranslation } from 'react-i18next';
import { Details } from './Details';
import { converterEvents } from '@/events';

export const InformationAboutApi = observer(() => {

    let {t} = useTranslation();

    const [mount, setMount] = useState(false);
    const [isActive, setActive] = useState(null);

    let detailsAPI = toJS(details.details);

    useEffect(() => {
        setMount(true);
        if(detailsAPI.length === 0) details.loadDetails("https://gist.githubusercontent.com/AliakseiMalinouski/459d39deac32e19f72e6e1b090b3a9c4/raw/06a60c9b235ef5338af879c2ade074e2069d512e/DetailsAPIConv");
    }, []);
    
    useEffect(() => {
        converterEvents.addListener('openInfo', openInfoParent);
        return () => {
            converterEvents.removeListener('openInfo', openInfoParent);
        }
    }, []);

    const openInfoParent = (id) => setActive(id);

    let detailsAPImemo = useMemo(() => detailsAPI && detailsAPI.map(({id, link, title}) => <Details key={id} t={t} link={link} title={title} id={id} isActive={isActive}/>), [detailsAPI])

    if(!mount) {
        return <Progress/>
    }
    else {
        return (
            <div className={classes.InformationAboutApi}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    {detailsAPImemo}
                </div>
            </div>
        )
    }
})