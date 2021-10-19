import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import translationRu from '../public/locales/ru/translation.json';
import translationEn from '../public/locales/en/translation.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ru: {
        translation: translationRu,
      },
      en: {
        translation: translationEn,
      },
    },
    lng: 'ru',
  });

export default i18n;
