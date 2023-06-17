'use client';
import { Button } from "@mui/material";
import { useState } from "react";
import { converterEvents } from "@/events";
import { useForm } from "react-hook-form";
import classes from './ConverterContent.module.css';

export const ConverterFilters = () => {

    const [currenciesPosition, setCurrenciesPosition] = useState('default');

    const [data, setData] = useState({
        firstCurrency: '',
        secondCurrency: '',
        amount: ''
    })

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid
        }
    } = useForm();

    const onSubmit = (eo) => {

        // const {
        //     firstCurrency,
        //     secondCurrency,
        //     amount
        // } = data;

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
            <input type="number" className={classes.Amount} name='amount' value={data.amount} onChange={handleChange}
            // {...register('amount', {
            //     required: 'This field is required',
            //     minLength: {
            //         value: 1,
            //         message: '>= 1'
            //     }
            // })}
            />
            <input type="text" maxLength={3} name="firstCurrency" value={data.firstCurrency} onChange={handleChange}
            // {...register('firstCurrency', {
            //     required: 'This field 1 is required',
            //     minLength: {
            //         value: 3,
            //         message: 'short',
            //     }
            // })}
            />
            <img src="https://i.ibb.co/ZY7CFtf/cycle.png" alt="Arrows" onClick={changeModeCurrencies}/>
            <input type="text" name="secondCurrency" maxLength={3} value={data.secondCurrency} onChange={handleChange}
            // {...register('secondCurrency', {
            //     required: 'This field 2 is required',
            //     minLength: {
            //         value: 3,
            //         message: 'short'
            //     }
            // })}
            />
            <button type="submit" disabled={!isValid}> 
                send
            </button>
        </form>
    )
}