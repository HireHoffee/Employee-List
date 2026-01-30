import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import { english } from "./english";
import { russian } from "./russian";

export const i18n = new I18n({
  en: english,
  ru: russian,
});

i18n.locale = getLocales().at(0)?.languageCode ?? "ru";
