'use client';
import { useEffect, useState } from "react";
import { converterEvents } from "@/events";
import classes from './ConverterContent.module.css';
import { FormControl, InputLabel, MenuItem, Select, Button } from "@mui/material";
import { Valute } from "./Valute";

export const ConverterFilters = ({submitText, t, configForImage, currencies}) => {

    const [currenciesPosition, setCurrenciesPosition] = useState('default');

    const [converterData, setData] = useState({
        firstCurrency: '',
        secondCurrency: '',
        amount: ''
    })

    useEffect(() => {
        converterEvents.addListener('changeValute', changeValuteParent);
        return () => {
            converterEvents.removeListener('changeValute', changeValuteParent);
        }
    }, []);

    const viewError = () => {
        alert('ERROR')
    }

    useEffect(() => {
        if(converterData.firstCurrency !== '' && converterData.secondCurrency !== '' && converterData.firstCurrency === converterData.secondCurrency) {
            viewError();
        }
    }, [converterData]);


    const changeValuteParent = (data) => {
        const {
            listNumber, currency
        } = data;

        if(listNumber === 1) {
            setData(prev => ({...prev, firstCurrency: currency}));
        }
        else if(listNumber === 2) {
            setData(prev => ({...prev, secondCurrency: currency}));
        }
    }

    const onSubmit = (eo) => {

        eo.preventDefault();

        let newData = {
            firstCurrency: converterData.firstCurrency.toUpperCase(),
            secondCurrency: converterData.secondCurrency.toUpperCase(),
            amount: parseInt(converterData.amount),
            currenciesPosition: currenciesPosition
        }
        
        converterEvents.emit('startPairRequest', newData);

    }

    const handleChange = (eo) => {
        setData({...converterData, [eo.target.name]: eo.target.value});
    }

    return (
        <>
            <input type="number" min={1} className={classes.Amount} name='amount' placeholder={t('amount-placeholder')} value={converterData.amount} onChange={handleChange}/>
            <FormControl sx={{ minWidth: 120, background: '#EFF0F5', borderRadius: '6px'}} fullWidth>
                <InputLabel id="demo-select-small-label">{t('first-currency')}</InputLabel>
                <Select labelid="demo-select-small-label" id="demo-select-small">
                    {
                        currencies.map(({id, currency}) => <Valute key={id} currency={currency} listNumber={1}/>)
                    }
                </Select>
            </FormControl>
            <div className={classes.HintCurrency}>{converterData.firstCurrency || t('first-currency-hint')}</div>
            <FormControl sx={{ minWidth: 120, background: '#EFF0F5', borderRadius: '6px'}}  fullWidth>
                <InputLabel id="demo-select-small-label">{t('second-currency')}</InputLabel>
                <Select labelid="demo-select-small-label" id="demo-select-small">
                    {
                        currencies.map(({id, currency}) => <Valute key={id} currency={currency} listNumber={2}/>)
                    }
                </Select>
            </FormControl>
            <div className={classes.HintCurrency}>{converterData.secondCurrency || t('second-currency-hint')}</div>
            <div onClick={onSubmit} className={classes.ConvertButton}>
                <Button variant="contained" color="success" sx={{width: '100%'}}>send</Button>
            </div>
        </>
    )
}