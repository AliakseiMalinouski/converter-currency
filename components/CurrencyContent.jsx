'use client';

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { appVariants } from "@/framer_motion/variant";
import { useEffect, useState } from "react";
import currency from "@/mobx/store/currency";
import { observer } from "mobx-react-lite";

export const CurrencyContent = observer(() => {

    let {t} = useTranslation();

    const [loadState, setLoadState] = useState(false);

    useEffect(() => {
        setLoadState(true);
    }, []);

    if(!loadState) {
        return null;
    }
    else {
        return (
            <motion.div
            variants={appVariants.currency}
            initial={'hidden'}
            animate={'visible'} 
            >
                <button onClick={() => currency.plus()}>plus</button ><button onClick={() => currency.minus()}>minus</button>
                {
                    currency.total
                }
                
            </motion.div>
        )
    }
})