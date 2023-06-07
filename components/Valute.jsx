'use client';

import { memo } from "react";
import valutesStyles from './Valute.module.css';
import { AnimatePresence, motion } from "framer-motion";
import {appVariants} from '../framer_motion/variant';

export const Valute = memo(({id, currency}) => {
    return (
        <AnimatePresence>
            <motion.li className={valutesStyles.Valute} key='currency' variants={appVariants.currency} initial={"hidden"} animate={'visible'}
            >
                {currency}
            </motion.li>
        </AnimatePresence>
    )
})