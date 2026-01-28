import { $selectedDepartment, setSelectedDepartment } from "@/entities/departments/store";
import { setSearchedText } from "@/entities/employees/store";
import DepartmentsList from "@/shared/ui/DepartmentsList";
import SearchInput from "@/shared/ui/SearchInput";
import { useUnit } from "effector-react";
import { StyleSheet, View } from "react-native";

const TopBar = () => {
  const [selectedDepartment, setDepartmentTag, onChangeText] = useUnit([
    $selectedDepartment,
    setSelectedDepartment,
    setSearchedText,
  ]);

  return (
    <View style={styles.container}>
      <SearchInput onChangeText={onChangeText} />
      <DepartmentsList setDepartment={setDepartmentTag} selectedTag={selectedDepartment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    justifyContent: "center",
    paddingTop: 10,
  },
});

export default TopBar;
