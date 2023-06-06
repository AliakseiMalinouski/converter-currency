'use client';

import { useCallback, useEffect, useMemo } from "react";
import classes from './ConverterContent.module.css';
import { Title } from "./Title";
import currency from "@/mobx/store/currency";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { Progress } from "./Progress";
import { Valute } from "./Valute";
import valutesStyles from './Valute.module.css';
import { useState } from "react";

export const ConverterContent = observer(() => {

    const [currencyLengthState, setCurrencyLengthState] = useState(false);

    let arrayCurrencies = currency.arrayKeys;

    useEffect(() => {
        currency.doMockRequest('USD');
    }, []);

    const viewAllCurrencies = () => {
        setCurrencyLengthState(prev => !prev);
        transfromLengthOfArray();
    }

    const transfromLengthOfArray = useCallback(() => {
        if(!currencyLengthState) {
            let tranformedArray = toJS(arrayCurrencies).filter(elem => elem.id < 24);
            return tranformedArray;
        } else {
           return toJS(arrayCurrencies);
        }
    }, [currencyLengthState]);

    let currentArrayCurrencies = transfromLengthOfArray();

    let currenciesMemo = useMemo(() => currentArrayCurrencies && currentArrayCurrencies.map((elem, index) => <Valute key={elem?.id} currency={elem?.currency}/>), [currentArrayCurrencies]); 

    if(arrayCurrencies.length === 0) {
        return <Progress/>
    }
    else {
        return (
            <div className={classes.ConverterContent}>
                <Title text='all-currency'/>
                <h4 onClick={viewAllCurrencies}>Open</h4>
                <div className="ConverterTools">
                    <ul className={valutesStyles.Valutes}>{currenciesMemo}</ul>
                </div>
            </div>
        )
    }
})