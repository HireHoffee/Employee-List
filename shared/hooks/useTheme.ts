import { useUnit } from "effector-react";
import { ViewStyle } from "react-native";
import { $theme, changeTheme as changeAppTheme } from "../store/themes";
import { ThemeColors, themes } from "../themes";

export const useTheme = () => {
  const [theme, changeTheme] = useUnit([$theme, changeAppTheme]);
  const { light, dark } = themes;

  const changeStyles = (stylePairs: [keyof ViewStyle, keyof ThemeColors][]) => {
    const palette = theme === "light" ? light : dark;

    return stylePairs.reduce((acc, [styleKey, colorKey]) => {
      (acc[styleKey] as unknown as string) = palette[colorKey];
      return acc;
    }, {} as ViewStyle);
  };

  return { theme, light, dark, changeStyles, changeTheme };
};
