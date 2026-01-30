import SelectedIcon from "@/shared/assets/svgs/selected-icon.svg";
import UnselectedIcon from "@/shared/assets/svgs/unselected-icon.svg";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useTranslation } from "../hooks/useTranslation";
import { i18n } from "../locales";
import { AppText } from "./AppText";

const LocalizationSwitcher = ({ handleClose }: { handleClose: () => void }) => {
  const { locale, changeLanguage } = useTranslation();

  return (
    <>
      <AppText style={styles.title}>{i18n.t("localization")}</AppText>
      <View style={styles.options}>
        <Pressable
          style={styles.option}
          onPress={() => {
            changeLanguage("ru");
            handleClose();
          }}
        >
          {({ pressed }) => (
            <>
              {locale === "ru" ? <SelectedIcon /> : <UnselectedIcon />}
              <AppText style={[pressed && { opacity: 0.6 }]}>{i18n.t("russian")}</AppText>
            </>
          )}
        </Pressable>
        <Pressable
          style={styles.option}
          onPress={() => {
            changeLanguage("en");
            handleClose();
          }}
        >
          {({ pressed }) => (
            <>
              {locale === "en" ? <SelectedIcon /> : <UnselectedIcon />}
              <AppText style={[pressed && { opacity: 0.6 }]}>{i18n.t("english")}</AppText>
            </>
          )}
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
    textAlign: "center",
    fontSize: 24,
  },
  options: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 8,
  },
  option: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 18,
  },
});

export default LocalizationSwitcher;
