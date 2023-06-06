'use client';

import { memo } from "react";
import valutesStyles from './Valute.module.css';

export const Valute = memo(({id, currency}) => {
    return (
        <li className={valutesStyles.Valute}>
            {currency}
        </li>
    )
})