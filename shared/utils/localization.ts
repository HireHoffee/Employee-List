import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

export const i18n = new I18n({
  en: {
    departments: {
      all: "All",
      android: "Android",
      ios: "iOS",
      design: "Design",
      management: "Management",
      qa: "QA",
      back_office: "Back Office",
      frontend: "Frontend",
      hr: "HR",
      pr: "PR",
      backend: "Backend",
      support: "Support",
      analytics: "Analytics",
    },
    searchPlaceholder: "Enter name, tag, email...",
    sort: "Sorting",
    sortByAlphabet: "Alphabetically",
    sortByBirthday: "By birthday",
    cancel: "Cancel",
  },
  ru: {
    departments: {
      all: "Все",
      android: "Android",
      ios: "iOS",
      design: "Дизайн",
      management: "Менеджмент",
      qa: "QA",
      back_office: "Бэк-офис",
      frontend: "Frontend",
      hr: "HR",
      pr: "PR",
      backend: "Backend",
      support: "Техподдержка",
      analytics: "Аналитика",
    },
    searchPlaceholder: "Введи имя, тег, почту...",
    sort: "Сортировка",
    sortByAlphabet: "По алфавиту",
    sortByBirthday: "По дню рождения",
    cancel: "Отмена",
  },
});

i18n.locale = getLocales().at(0)?.languageCode ?? "ru";

console.log(i18n.t("welcome"));
