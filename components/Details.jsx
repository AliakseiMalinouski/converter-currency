'use client';

import React, { memo } from 'react';
import {converterEvents} from '../events';
import { Button } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import classes from './Details.module.css';
import Link from 'next/link';

export const Details = memo(({title, link, isActive, id, t}) => {

    const open = () => converterEvents.emit('openInfo', id);

    console.log(isActive)

    return (
        <div className={classes.Details}>
            <h4>{title.toUpperCase()}</h4>
            <Button onClick={open} sx={{marginBottom: '20px'}} color={isActive === id ? 'success' : 'info'} variant={isActive === id ? 'contained' : 'outlined'}>{t('open')}</Button>
            <AnimatePresence>
                {isActive === id && 
                <motion.div initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                transition={{
                    delay: 0.1,
                    duration: 0.5
                }}
                exit={{
                    opacity: 0
                }}
                >
                    <Link href={`/currency/information/${id}`}>{t('go-to-api-info')}</Link>
                </motion.div>
                }
            </AnimatePresence>
        </div>
    )
})