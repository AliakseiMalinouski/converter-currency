'use client';

import { useCallback, useEffect } from "react";
import classes from './ConverterContent.module.css';
import { Title } from "./Title";
import currency from "@/mobx/store/currency";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { Progress } from "./Progress";
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
    let inputsCurrencies = toJS(currency.arrayInput);

    useEffect(() => {
        currency.doMockRequest('USD');
    }, []);

    

    useEffect(() => {
        converterEvents.addListener('showAllCurrencies', viewAllCurrencies);
        converterEvents.addListener('startPairRequest', startPairRequest);
        return () => {
            converterEvents.removeListener('showAllCurrencies', viewAllCurrencies);
            converterEvents.removeListener('startPairRequest', startPairRequest);
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

    console.log(toJS(currency.arrayInput))

    const transfromLengthOfArray = useCallback(() => {
        if(!currencyLengthState && arrayCurrencies.length) {
            let tranformedArray = toJS(arrayCurrencies).filter(elem => elem.id < 24);
            return tranformedArray;
        } else {
           return toJS(arrayCurrencies);
        }
    }, [currencyLengthState, arrayCurrencies]);

    console.log(resultAfterCounting)

    let currentArrayCurrencies = transfromLengthOfArray();


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
                        <ConverterFilters submitText='on-submit' currencies={currentArrayCurrencies} t={t} configForImage={convertImageConfig} chosenValutes={inputsCurrencies.length > 0 ? inputsCurrencies : []}/>
                    </div>
                </div>
            </div>
        )
    }
})