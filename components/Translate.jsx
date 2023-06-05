'use client';

import { memo, } from "react";
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import { converterEvents } from "@/events";
import translate from "@/mobx/store/translate";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";

export const Translate = observer(({languages}) => {

    let {t} = useTranslation();

    const chooseLanguage = (language) => {
        converterEvents.emit('changeLanguage', language);
    }

  return (
    <FormControl sx={{ minWidth: 120, background: '#EFF0F5', borderRadius: '6px'}}  size="small">
        <InputLabel id="demo-select-small-label">{t(`${translate.getCurrentLanguage()}`)}</InputLabel>
        <Select labelId="demo-select-small-label" id="demo-select-small">
            {
                languages.map(({id, lng}) => <MenuItem key={id}
                onClick={() => chooseLanguage(lng)}
                >
                    {lng}
                </MenuItem>)
            }
        </Select>
    </FormControl>
  )  
})