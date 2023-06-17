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
import { ButtonCurrenciesLength } from "./ButtonCurrenciesLength";
import { converterEvents } from "@/events";
import { ConverterFilters } from "./ConverterFilters";
import { useTranslation } from "react-i18next";

export const ConverterContent = observer(() => {

    const [currencyLengthState, setCurrencyLengthState] = useState(false);
    const [convertImageConfig, setConvertImageConfig] = useState({});

    let {t} = useTranslation();

    let arrayCurrencies = currency.arrayKeys;
    let resultAfterCounting = toJS(currency.resultAfterPair);

    useEffect(() => {
        currency.doMockRequest('USD');
    }, []);

    useEffect(() => {
        converterEvents.addListener('showAllCurrencies', viewAllCurrencies);
        converterEvents.addListener('startPairRequest', startPairRequest);
        converterEvents.addListener('animateImage', animateImageConvert);
        return () => {
            converterEvents.removeListener('showAllCurrencies', viewAllCurrencies);
            converterEvents.removeListener('startPairRequest', startPairRequest);
            converterEvents.addListener('animateImage', animateImageConvert);
        }
    }, []);

    const viewAllCurrencies = () => {
        setCurrencyLengthState(prev => !prev);
    }

    const startPairRequest = (data) => {
        const {
            firstCurrency,
            secondCurrency,
            amount,
            currenciesPosition
        } = data;

        currency.doPairRequest(firstCurrency, secondCurrency, amount, currenciesPosition);

    }

    const transfromLengthOfArray = useCallback(() => {
        if(!currencyLengthState && arrayCurrencies.length) {
            let tranformedArray = toJS(arrayCurrencies).filter(elem => elem.id < 24);
            return tranformedArray;
        } else {
           return toJS(arrayCurrencies);
        }
    }, [currencyLengthState, arrayCurrencies]);

    const animateImageConvert = (currenciesPosition) => {
        if(currenciesPosition === 'default') {
            setConvertImageConfig({
                variant: true
            });
        } else if(currenciesPosition === 'changed') {
            setConvertImageConfig({
                variant: false
            });
        }
    }

    let currentArrayCurrencies = transfromLengthOfArray();

    let currenciesMemo = useMemo(() => currentArrayCurrencies && currentArrayCurrencies.map((elem, index) => <Valute key={elem?.id} currency={elem?.currency}/>), [currentArrayCurrencies]); 

    console.log(resultAfterCounting)

    if(arrayCurrencies.length === 0) {
        return <Progress/>
    }
    else {
        return (
            <div className={classes.ConverterContent}>
                <Title text='all-currency'/>
                <ButtonCurrenciesLength key={1} text='currencies-length-button' currencyLengthState={currencyLengthState} textHide='hide-currencies'/>
                <div className={classes.ConverterFiltersAndCurrenciesWrapper}>
                    <div className={classes.ConverterFilters}>
                        <ConverterFilters submitText='on-submit' t={t} configForImage={convertImageConfig}/>
                    </div>
                    <div className={classes.ConverterCurrencies}>
                        <ul className={valutesStyles.Valutes}>{currenciesMemo}</ul>
                    </div>
                </div>
            </div>
        )
    }
})