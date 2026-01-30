import { useUnit } from "effector-react";
import { $theme, changeTheme } from "../store/themes";
import colors from "../themes";

export const useTheme = () => {
  const [theme, changeAppTheme] = useUnit([$theme, changeTheme]);
  const { dark, light } = colors;

  return {
    dark,
    light,
    theme,
    changeTheme: changeAppTheme,
  };
};
