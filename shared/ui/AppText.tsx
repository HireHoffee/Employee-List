import { Text, TextProps } from "react-native";
import { useTheme } from "../hooks/useTheme";

export const AppText = ({
  children,
  style,
  secondary,
  lightText,
  primary,
  ...props
}: TextProps & { secondary?: boolean; lightText?: boolean; primary?: boolean }) => {
  const { dark, light, theme } = useTheme();
  const textColor = secondary
    ? "secondaryText"
    : lightText
      ? "lightText"
      : primary
        ? "primary"
        : "text";

  return (
    <Text
      {...props}
      style={[theme === "light" ? { color: light[textColor] } : { color: dark[textColor] }, style]}
    >
      {children}
    </Text>
  );
};
