import { $selectedDepartment } from "@/entities/departments/store";
import { getEmployees } from "@/entities/employees/api";
import { $searchedText, $sortedEmployees, setEmployees } from "@/entities/employees/store";
import { setError } from "@/shared/store/errors";
import { $isDrawerOpen } from "@/shared/store/utils";
import EmployeeCard from "@/shared/ui/EmployeeCard";
import NoResults from "@/shared/ui/NoResults";
import SortDrawer from "@/shared/ui/SortDrawer";
import TopBar from "@/widgets/topbar/ui/TopBar";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const HomePage = () => {
  const [sortedEmployees, setEmployeesData, selectedDepartment, searchedText] = useUnit([
    $sortedEmployees,
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
      {sortedEmployees.length > 0 ? (
        <FlatList
          data={sortedEmployees}
          renderItem={(data) => {
            return data.item.newYearBirthdaysStart ? (
              <>
                <View style={styles.newYearBr}>
                  <View style={styles.brLine}></View>
                  <Text style={{ color: "#C3C3C6", fontSize: 15 }}>
                    {new Date().getFullYear() + 1}{" "}
                  </Text>
                  <View style={styles.brLine}></View>
                </View>
                <EmployeeCard {...data.item} />
              </>
            ) : (
              <EmployeeCard {...data.item} />
            );
          }}
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
  newYearBr: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 24,
  },
  brLine: {
    width: 72,
    height: 2,
    backgroundColor: "#C3C3C6",
    borderRadius: 2,
  },
});

export default HomePage;
