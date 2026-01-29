import SelectedIcon from "@/shared/assets/svgs/selected-icon.svg";
import UnselectedIcon from "@/shared/assets/svgs/unselected-icon.svg";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "../hooks/useTranslation";
import { i18n } from "../locales";

const LocalizationSwitcher = ({ handleClose }: { handleClose: () => void }) => {
  const { locale, changeLanguage } = useTranslation();

  return (
    <>
      <Text style={styles.title}>{i18n.t("localization")}</Text>
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
              <Text style={[pressed && { opacity: 0.6 }]}>{i18n.t("russian")}</Text>
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
              <Text style={[pressed && { opacity: 0.6 }]}>{i18n.t("english")}</Text>
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
