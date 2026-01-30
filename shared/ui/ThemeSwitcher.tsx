import SelectedIcon from "@/shared/assets/svgs/selected-icon.svg";
import UnselectedIcon from "@/shared/assets/svgs/unselected-icon.svg";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { i18n } from "../locales";
import { AppText } from "./AppText";

const ThemeSwitcher = ({ handleClose }: { handleClose: () => void }) => {
  const { theme, changeTheme } = useTheme();

  return (
    <>
      <AppText style={styles.title}>{i18n.t("theme")}</AppText>
      <View style={styles.options}>
        <Pressable
          style={styles.option}
          onPress={() => {
            changeTheme("light");
            handleClose();
          }}
        >
          {({ pressed }) => (
            <>
              {theme === "light" ? <SelectedIcon /> : <UnselectedIcon />}
              <AppText style={[pressed && { opacity: 0.6 }]}>{i18n.t("lightTheme")}</AppText>
            </>
          )}
        </Pressable>
        <Pressable
          style={styles.option}
          onPress={() => {
            changeTheme("dark");
            handleClose();
          }}
        >
          {({ pressed }) => (
            <>
              {theme === "dark" ? <SelectedIcon /> : <UnselectedIcon />}
              <AppText style={[pressed && { opacity: 0.6 }]}>{i18n.t("darkTheme")}</AppText>
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

export default ThemeSwitcher;
