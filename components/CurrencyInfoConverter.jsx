'use client';

import classes from './CurrencyInfoConverter.module.css';
import { converterEvents } from '@/events';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { appVariants } from '@/framer_motion/variant';

export const CurrencyInfoConverter = ({resultAfterCounting, t}) => {

    let  {counting, from, to, state, price} = resultAfterCounting;

    const close = () => {
        converterEvents.emit('closeResult', state);
    }

    console.log(resultAfterCounting)
    return (
        <motion.div className={classes.CurrencyInfoConverter} variants={appVariants.result} initial={appVariants.result.hidden} animate={appVariants.result.visible} exit={appVariants.result.exit}>
            <h4 className={classes.FromToTitle}>
                <span>{from}</span>
                <img className={classes.FromToArrow} src='https://i.ibb.co/C0pWLxQ/right-arrow.png' alt='From To Arrow'/>
                <span>{to}</span>
            </h4>
            <ul className={classes.InfoList}>
                <li>{t("price")}<span>{price.toFixed(2)}</span></li>
                <li>{t('result')}<span> {counting.toFixed(2)}</span></li>
            </ul>
            <Button onClick={close} color='warning' variant='contained' sx={{width: '60%'}}>{t('close-result')}</Button>
        </motion.div>
    )
}