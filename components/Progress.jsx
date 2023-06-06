'use client';

import { CircularProgress } from "@mui/material";
import { memo } from "react";
import classes from './Progress.module.css';

export const Progress = memo(() => {
    return (
        <div className={classes.Progress}>
            <CircularProgress/>
        </div>
    )
})