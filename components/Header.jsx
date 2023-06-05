'use client'

import { changeLanguage } from "i18next"
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { Translate } from "./Translate";
import { converterEvents } from "@/events";
import { Snack } from "./Snack";
import styles from './Header.module.css';
import { Logo } from "./Logo";
import translate from "@/mobx/store/translate";
import { toJS } from "mobx";
import { Links } from "./Links";
import getData from "@/helpers/getData";
import { usePathname } from 'next/navigation';

export const Header = observer (() =>  {

    let {t} = useTranslation();

    let pathname = usePathname();

    const [loadState, setLoadState] = useState(false);
    const [snackState, setSnackState] = useState(false);
    const [languages, setLanguages] = useState(toJS(translate.languages));
    const [links, setLinks] = useState({});

    useEffect(() => {
        setLoadState(true);
    }, []);

    useEffect(() => {
        converterEvents.addListener('changeLanguage', setLanguage);
        return () => {
            converterEvents.removeListener('changeLanguage', setLanguage);
        }
    }, []);

    useEffect(() => {
        if(languages.length === 0) {
            translate.loadLanguages();
            setLanguages(toJS(translate.languages));
        }
    }, [languages]);

    useEffect(() => {
        if(!links.hasOwnProperty('data')) {
            const wrapperAsync = async () => {
                let updatedLinks = await getData("https://gist.githubusercontent.com/AliakseiMalinouski/f226376ca13551b30e53786d6ea4271a/raw/5a6d20b93e839c14ce83fd1000563e943cdafa24/linksConverter");
                setLinks(updatedLinks);
            }
            wrapperAsync();
        }
    }, [links]);

    const setLanguage = (language) => {
        changeLanguage(language);
        translate.setLanguage(language);
        setSnackState(true);
    };

    let memoLinks = useMemo(() => links && <Links links={links.data} pathname={pathname}/>, [links, pathname]);

    if(!loadState) {
        return null;
    }
    else {
        return (
            <>
            <header className={styles.Header}>
                <div className='Container' style={{height: '100%'}}>
                    <div className={styles.HeaderContent}>
                        <Logo src="https://i.ibb.co/GcPksm5/money-exchange.png" alt="Logo"/>
                        {memoLinks}
                        <Translate languages={languages}/>
                    </div>
                </div>
            </header>
            <Snack open={snackState} handleClose={() => setSnackState(false)} autoHideDuration={3000}/>
            </>
        )
    }
})