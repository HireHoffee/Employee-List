import EmployeePage from "@/pages/employee/ui/EmployeePage";
import { useTheme } from "@/shared/hooks/useTheme";
import { basicStyles } from "@/shared/utils/basicStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Employee() {
  const { changeStyles } = useTheme();

  return (
    <SafeAreaView style={[basicStyles, changeStyles([["backgroundColor", "secondaryBackground"]])]}>
      <EmployeePage />
    </SafeAreaView>
  );
}
