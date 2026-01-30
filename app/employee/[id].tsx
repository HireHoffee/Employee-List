import EmployeePage from "@/pages/employee/ui/EmployeePage";
import { useTheme } from "@/shared/hooks/useTheme";
import { basicStyles } from "@/shared/utils/basicStyles";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Employee() {
  const { theme, dark, light } = useTheme();

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  return (
    <SafeAreaView
      style={[
        basicStyles,
        theme === "light"
          ? { backgroundColor: light.secondaryBackground }
          : { backgroundColor: dark.secondaryBackground },
      ]}
    >
      <EmployeePage />
    </SafeAreaView>
  );
}
