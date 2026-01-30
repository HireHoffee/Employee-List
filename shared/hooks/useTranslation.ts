import { $locale, changeLanguage } from "@/shared/store/locale";
import { useUnit } from "effector-react";

export const useTranslation = () => {
  const [locale, changeTextLanguage] = useUnit([$locale, changeLanguage]);

  return {
    locale,
    changeLanguage: changeTextLanguage,
  };
};
