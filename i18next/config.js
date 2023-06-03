'use client'

import i18n from "i18next";
import {initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: require('./locales/en/translations.json')
      },
      ru: {
        translation: require('./locales/ru/translations.json')
      }
    },
    lng: "en",
    fallbackLng: "ru",

    interpolation: {
      escapeValue: false
    }
  });