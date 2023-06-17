'use client';
import { useState } from "react";
import { converterEvents } from "@/events";
import classes from './ConverterContent.module.css';

export const ConverterFilters = ({submitText, t, configForImage}) => {

    const [currenciesPosition, setCurrenciesPosition] = useState('default');

    const [data, setData] = useState({
        firstCurrency: '',
        secondCurrency: '',
        amount: ''
    })

    const onSubmit = (eo) => {

        eo.preventDefault();

        let newData = {
            firstCurrency: data.firstCurrency.toUpperCase(),
            secondCurrency: data.secondCurrency.toUpperCase(),
            amount: parseInt(data.amount),
            currenciesPosition: currenciesPosition
        }
        
        converterEvents.emit('startPairRequest', newData);

    }

    const handleChange = (eo) => {
        setData({...data, [eo.target.name]: eo.target.value});
    }

    const changeModeCurrencies = () => {
        converterEvents.emit('animateImage', currenciesPosition);
        if(currenciesPosition === 'default') {
            setData(prev => ({...prev, firstCurrency: data.secondCurrency, secondCurrency: data.firstCurrency}));
            setCurrenciesPosition('changed');
        }
        else if(currenciesPosition === 'changed') {
            setData(prev => ({...prev, secondCurrency: data.firstCurrency, firstCurrency: data.secondCurrency}));
            setCurrenciesPosition('default');
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="number" className={classes.Amount} name='amount' value={data.amount} onChange={handleChange}/>
            <input type="text" maxLength={3} name="firstCurrency" value={data.firstCurrency} onChange={handleChange}/>
            <img src="https://i.ibb.co/ZY7CFtf/cycle.png" alt="Arrows" onClick={changeModeCurrencies} className={configForImage.variant ? classes.ImageAnimationFirst : classes.ImageAnimationSecond}/>
            <input type="text" name="secondCurrency" maxLength={3} value={data.secondCurrency} onChange={handleChange}/>
            <button type="submit">{t(`${submitText}`)}</button>
        </form>
    )
}