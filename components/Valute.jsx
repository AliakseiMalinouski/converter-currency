'use client';

import { memo } from "react";
import valutesStyles from './Valute.module.css';
import { AnimatePresence, motion } from "framer-motion";
import {appVariants} from '../framer_motion/variant';
import { converterEvents } from "@/events";

export const Valute = memo(({id, currency, listNumber}) => {

    const changeValute = () => {
        converterEvents.emit('changeValute', {
            listNumber: listNumber,
            currency: currency
        });
    }

    return (
        <AnimatePresence>
            <motion.li className={valutesStyles.Valute} key='currency' variants={appVariants.currency} initial={"hidden"} animate={'visible'} onClick={changeValute}
            >
            {currency}
            </motion.li>
        </AnimatePresence>
    )
})