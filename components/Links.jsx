'use client';

import Link from "next/link";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import styles from './Links.module.css';
import { motion } from "framer-motion";
import { appVariants } from "@/framer_motion/variant";

export const Links = memo(({links, pathname}) => {

    let {t} = useTranslation();

    console.log(pathname)

    return (
        <ul className={styles.Links}>
            {
                links && links.map(({id, link, title}) => 
                link === '/auth'
                ?
                <motion.li key={id} variants={appVariants.links} initial={'hidden'} animate={'visible'} custom={id / 2}>
                    <Link href={link} className={styles.AuthLink}>
                        {
                            t(`${title}`)
                        }
                    </Link>
                </motion.li>
                :
                <motion.li key={id} variants={appVariants.links} initial={'hidden'} animate={'visible'} custom={id / 2}>
                    <Link href={link} className={pathname === link ? styles.ActiveLink : ''}>
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