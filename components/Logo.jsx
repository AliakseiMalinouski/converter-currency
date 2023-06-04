'use client';

import { memo } from "react";
import styles from './Logo.module.css';
import Link from "next/link";


export const Logo = memo(({src, alt}) => {
    return (
        <Link href='/'>
            <img src={src} alt={alt} className={styles.Logo}/>
        </Link>
    )
})