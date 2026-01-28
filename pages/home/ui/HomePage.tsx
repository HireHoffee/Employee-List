import { getEmployees } from "@/entities/employees/api";
import { Employee } from "@/entities/employees/types";
import EmployeeCard from "@/shared/ui/EmployeeCard";
import SortDrawer from "@/shared/ui/SortDrawer";
import TopBar from "@/widgets/topbar/ui/TopBar";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const HomePage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    getEmployees().then((response) => {
      setEmployees(response.data.items);
    });
  }, []);

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <TopBar />
      {employees.length > 0 ? (
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
