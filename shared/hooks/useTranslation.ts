import { $locale, changeLanguage } from "@/shared/store/locale";
import { useUnit } from "effector-react";

export const useTranslation = () => {
  const locale = useUnit($locale);
  return {
    locale,
    changeLanguage,
  };
};
