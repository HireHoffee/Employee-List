import { $selectedDepartment } from "@/entities/departments/store";
import { getEmployees } from "@/entities/employees/api";
import { $foundEmployees, $searchedText, setEmployees } from "@/entities/employees/store";
import { setError } from "@/shared/store/errors";
import { $isDrawerOpen } from "@/shared/store/utils";
import EmployeeCard from "@/shared/ui/EmployeeCard";
import NoResults from "@/shared/ui/NoResults";
import SortDrawer from "@/shared/ui/SortDrawer";
import TopBar from "@/widgets/topbar/ui/TopBar";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const HomePage = () => {
  const [foundEmployees, setEmployeesData, selectedDepartment, searchedText] = useUnit([
    $foundEmployees,
    setEmployees,
    $selectedDepartment,
    $searchedText,
  ]);
  const setNewError = useUnit(setError);
  const isDrawerOpen = useUnit($isDrawerOpen);

  useEffect(() => {
    getEmployees(selectedDepartment)
      .then((response) => {
        setEmployeesData(response.data.items);
      })
      .catch((error) => {
        console.error(error);
        setNewError(error);
      });
  }, [selectedDepartment]);

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <TopBar />
      {foundEmployees.length > 0 ? (
        <FlatList
          data={foundEmployees}
          renderItem={(item) => <EmployeeCard {...item.item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.cardsContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : searchedText ? (
        <NoResults />
      ) : null}
      {isDrawerOpen && <SortDrawer />}
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
