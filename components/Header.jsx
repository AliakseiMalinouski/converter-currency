'use client'

import { changeLanguage } from "i18next"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { Translate } from "./Translate";
import { converterEvents } from "@/events";
import { Snack } from "./Snack";

export const Header = observer (() =>  {

    let {t} = useTranslation();

    const [loadState, setLoadState] = useState(false);
    const [snackState, setSnackState] = useState(false);

    useEffect(() => {
        setLoadState(true);
    }, []);

    useEffect(() => {
        converterEvents.addListener('changeLanguage', setLanguage);
        return () => {
            converterEvents.removeListener('changeLanguage', setLanguage);
        }
    }, []);

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
            <header>
                <div className='Container'>
                    <Translate/>
                    <div>
                        {
                            t('status')
                        }
                    </div>
                </div>
            </header>
            <Snack open={snackState} handleClose={() => setSnackState(false)} autoHideDuration={3000}/>
            </>
        )
    }
})