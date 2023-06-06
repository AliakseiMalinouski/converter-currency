'use client';

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { appVariants } from "@/framer_motion/variant";
import { useEffect, useState } from "react";
import currency from "@/mobx/store/currency";
import { observer } from "mobx-react-lite";

export const CurrencyContent = observer(() => {

    return (
        <div>
            currency
        </div>
    )
})