import EmployeePage from "@/pages/employee/ui/EmployeePage";
import { basicStyles } from "@/shared/utils/basicStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Employee() {
  return (
    <SafeAreaView style={basicStyles}>
      <EmployeePage />
    </SafeAreaView>
  );
}
