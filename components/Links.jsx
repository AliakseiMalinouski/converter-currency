'use client';

import Link from "next/link";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import styles from './Links.module.css';
import { motion } from "framer-motion";
import { appVariants } from "@/framer_motion/variant";

export const Links = memo(({links}) => {

    let {t} = useTranslation();

    return (
        <ul className={styles.Links}>
            {
                links && links.map(({id, link, title}) => 
                link === '/auth'
                ?
                <motion.li variants={appVariants.links} initial={'hidden'} animate={'visible'} custom={id / 2}>
                    <Link key={id} href={link} className={styles.AuthLink}>
                        {
                            t(`${title}`)
                        }
                    </Link>
                </motion.li>
                :
                <motion.li variants={appVariants.links} initial={'hidden'} animate={'visible'} custom={id / 2}>
                    <Link key={id} href={link}>
                        {
                            t(`${title}`)
                        }
                    </Link>
                </motion.li>
                )
            }
        </ul>
    )
})