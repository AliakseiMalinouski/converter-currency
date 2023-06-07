'use client';
import { Button } from "@mui/material";
import { useState } from "react";
import { converterEvents } from "@/events";
import { useForm } from "react-hook-form";
import classes from './ConverterContent.module.css';

export const ConverterFilters = () => {

    const [firstCurrency, setFirstCurrency] = useState("");
    const [secondCurrency, setSecondCurrency] = useState("");

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid
        }
    } = useForm();

    const onSubmit = (data) => {

        const {
            firstCurrency,
            secondCurrency,
            amount
        } = data;

        let newData = {
            firstCurrency: firstCurrency.toUpperCase(),
            secondCurrency: secondCurrency.toUpperCase(),
            amount: parseInt(amount)
        }
        
        converterEvents.emit('startPairRequest', newData);

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="number" className={classes.Amount}
            {...register('amount', {
                required: 'This field is required',
                minLength: {
                    value: 1,
                    message: '>= 1'
                }
            })}
            />
            <input type="text" maxLength={3} onChange={(eo) => setFirstCurrency(eo.target.value)}
            {...register('firstCurrency', {
                required: 'This field 1 is required',
                minLength: {
                    value: 3,
                    message: 'short',
                }
            })}
            />
            <img src="https://i.ibb.co/ZY7CFtf/cycle.png" alt="Arrows"/>
            <input type="text" maxLength={3} onChange={(eo) => setSecondCurrency(eo.target.value)} 
            {...register('secondCurrency', {
                required: 'This field 2 is required',
                minLength: {
                    value: 3,
                    message: 'short'
                }
            })}
            />
            <button type="submit" disabled={!isValid}> 
                send
            </button>
        </form>
    )
}