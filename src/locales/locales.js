import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './lang/en.json'
import de from './lang/de.json'
import ru from './lang/ru.json'
import appConfig from '@/configs/app.config'

const resources = {
    en: {
        translation: en,
    },
    de: {
        translation: de,
    },
    ru: {
        translation: ru,
    },
}

i18n.use(initReactI18next).init({
    resources,
    fallbackLng: appConfig.locale,
    lng: appConfig.locale,
    interpolation: {
        escapeValue: false,
    },
})

export const dateLocales = {
    en: () => import('dayjs/locale/en'),
    de: () => import('dayjs/locale/de'),
    ru: () => import('dayjs/locale/ar'),
}

export default i18n
