'use client'

import { changeLanguage } from "i18next"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Header () {

    let {t} = useTranslation();

    const [loadState, setLoadState] = useState(false);

    const setLanguage = (language) => {
        changeLanguage(language);
    }

    useEffect(() => {
        setLoadState(true);
    }, []);

    if(!loadState) {
        return null;
    }
    else {
        return (
            <header>
                <div className='Container'>
                    <button onClick={() => setLanguage('ru')}>
                        RU
                    </button>
                    <button onClick={() => setLanguage('en')}>
                        EN
                    </button>
                    {
                        t('status')
                    }
                </div>
            </header>
        )
    }
}