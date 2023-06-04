'use client'

import { changeLanguage } from "i18next"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { Translate } from "./Translate";
import { converterEvents } from "@/events";
import { Snack } from "./Snack";
import styles from './Header.module.css';
import { Logo } from "./Logo";
import translate from "@/mobx/store/translate";
import { toJS } from "mobx";

export const Header = observer (() =>  {

    let {t} = useTranslation();

    const [loadState, setLoadState] = useState(false);
    const [snackState, setSnackState] = useState(false);
    const [languages, setLanguages] = useState(toJS(translate.languages));

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

    const setLanguage = (language) => {
        changeLanguage(language);
        setSnackState(true);
    };

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
                        <Translate languages={languages}/>
                    </div>
                </div>
            </header>
            <Snack open={snackState} handleClose={() => setSnackState(false)} autoHideDuration={3000}/>
            </>
        )
    }
})