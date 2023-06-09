'use client';

import { useCallback, useEffect, useRef } from "react";
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
import { Snack } from "./Snack";
import { CurrencyInfoConverter } from "./CurrencyInfoConverter";
import { AnimatePresence } from "framer-motion";
import coordinates from "@/mobx/store/coordinates";

export const ConverterContent = observer(() => {

    let filterDiv = useRef();

    const [currencyLengthState, setCurrencyLengthState] = useState(false);
    const [snackState, setSnackState] = useState(false);

    let {t} = useTranslation();

    let arrayCurrencies = currency.arrayKeys;
    let resultAfterCounting = toJS(currency.resultAfterPair);
    let currentCoordinates = coordinates.coordinates;

    useEffect(() => {
        currency.doMockRequest('USD');
    }, []);

    useEffect(() => {
        converterEvents.addListener('showAllCurrencies', viewAllCurrencies);
        converterEvents.addListener('startPairRequest', startPairRequest);
        converterEvents.addListener('closeResult', closeResultParent);
        return () => {
            converterEvents.removeListener('showAllCurrencies', viewAllCurrencies);
            converterEvents.removeListener('startPairRequest', startPairRequest);
            converterEvents.removeListener('closeResult', closeResultParent);
        }
    }, []);


    const viewAllCurrencies = () => {
        setCurrencyLengthState(prev => !prev);
        if(snackState === false) {
            setSnackState(true);
        }
        else {
            console.log('e')
            setSnackState(false);
        }
    }

    const startPairRequest = (data) => {

        coordinates.setCoordinates(filterDiv.current.getBoundingClientRect());

        const {
            firstCurrency,
            secondCurrency,
            amount,
        } = data;

        currency.doPairRequest(firstCurrency, secondCurrency, amount);

    }

    const transfromLengthOfArray = useCallback(() => {
        if(!currencyLengthState && arrayCurrencies.length) {
            let tranformedArray = toJS(arrayCurrencies).filter(elem => elem.id < 24);
            return tranformedArray;
        } else {
           return toJS(arrayCurrencies);
        }
    }, [currencyLengthState, arrayCurrencies]);

    const closeResultParent = (state) => currency.closeResult(state);

    let currentArrayCurrencies = transfromLengthOfArray();

    if(arrayCurrencies.length === 0) {
        return <Progress/>
    }
    else {
        return (
            <>
                <div className={classes.ConverterContent}>
                    <Title text='all-currency'/>
                    <ButtonCurrenciesLength key={1} text='currencies-length-button' currencyLengthState={currencyLengthState} textHide='hide-currencies'/>
                    <div className={classes.ConverterFiltersAndCurrenciesWrapper}>
                        <div className={classes.ConverterFilters} ref={filterDiv}>
                            <ConverterFilters submitText='on-submit' currencies={currentArrayCurrencies} t={t}/>
                        </div>
                    </div>
                </div>
                {
                    !currencyLengthState 
                    ?
                    null
                    :
                    <Snack open={snackState} handleClose={() => setSnackState(false)} autoHideDuration={3000} variant={'all-currencies'}/>
                }
                {
                    resultAfterCounting.state
                    ?
                    <AnimatePresence>
                        <CurrencyInfoConverter resultAfterCounting={resultAfterCounting} t={t} currentCoordinates={currentCoordinates}/>
                    </AnimatePresence>
                    :
                    null
                }
            </>
        )
    }
})