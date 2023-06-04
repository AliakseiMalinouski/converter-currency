'use client';

import { memo, } from "react";
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import { toJS } from "mobx";
import { converterEvents } from "@/events";

export const Translate = memo(({languages}) => {

    const chooseLanguage = (language) => {
        converterEvents.emit('changeLanguage', language);
    }

  return (
    <FormControl sx={{ minWidth: 120, color: '#fff' }}  size="small">
        <InputLabel id="demo-select-small-label">lng</InputLabel>
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