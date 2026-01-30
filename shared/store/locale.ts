import { createEvent, createStore } from "effector";
import { i18n } from "../locales";

type Locale = "en" | "ru";

export const changeLanguage = createEvent<Locale>();

export const $locale = createStore<Locale>(i18n.locale as Locale).on(
  changeLanguage,
  (_, locale) => {
    i18n.locale = locale;
    return locale;
  },
);
