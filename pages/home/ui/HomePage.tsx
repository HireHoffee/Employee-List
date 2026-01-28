import { $selectedDepartment } from "@/entities/departments/store";
import { getEmployees } from "@/entities/employees/api";
import { $employees, setEmployees } from "@/entities/employees/store";
import EmployeeCard from "@/shared/ui/EmployeeCard";
import SortDrawer from "@/shared/ui/SortDrawer";
import TopBar from "@/widgets/topbar/ui/TopBar";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const HomePage = () => {
  const [employees, setEmployeesData, selectedDepartment] = useUnit([
    $employees,
    setEmployees,
    $selectedDepartment,
  ]);

  useEffect(() => {
    getEmployees(selectedDepartment).then((response) => {
      setEmployeesData(response.data.items);
    });
  }, [selectedDepartment]);

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <TopBar />
      {employees && employees.length > 0 ? (
        <FlatList
          data={employees}
          renderItem={(item) => <EmployeeCard {...item.item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.cardsContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : null}
      <SortDrawer />
    </View>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    marginTop: 16,
    paddingBottom: 32,
    marginHorizontal: 16,
    gap: 4,
  },
});

export default HomePage;
