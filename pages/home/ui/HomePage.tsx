import { $selectedDepartment } from "@/entities/departments/store";
import { getEmployees } from "@/entities/employees/api";
import { $searchedText, $sortedEmployees, setEmployees } from "@/entities/employees/store";
import { setError } from "@/shared/store/errors";
import { $isDrawerOpen } from "@/shared/store/utils";
import EmployeeCard from "@/shared/ui/EmployeeCard";
import LoadingSkeleton from "@/shared/ui/LoadingSkeleton";
import NoResults from "@/shared/ui/NoResults";
import SortDrawer from "@/shared/ui/SortDrawer";
import TopBar from "@/widgets/topbar/ui/TopBar";
import { useQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

const HomePage = () => {
  const [sortedEmployees, setEmployeesData, selectedDepartment, searchedText] = useUnit([
    $sortedEmployees,
    setEmployees,
    $selectedDepartment,
    $searchedText,
  ]);
  const setNewError = useUnit(setError);
  const isDrawerOpen = useUnit($isDrawerOpen);

  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ["employees", selectedDepartment],
    queryFn: () => getEmployees(selectedDepartment),
    select: (response) => response.data.items,
  });

  if (isError) {
    console.error(error);
    setNewError(error);
  }

  useEffect(() => {
    if (data) setEmployeesData(data);
  }, [data]);

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <TopBar />
      {sortedEmployees.length > 0 && !isLoading ? (
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
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              colors={["#6534FF"]}
              tintColor="#6534FF"
            />
          }
        />
      ) : searchedText ? (
        <NoResults />
      ) : (
        isLoading && <LoadingSkeleton />
      )}
      {isDrawerOpen && <SortDrawer />}
    </View>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    paddingTop: 16,
    paddingBottom: 32,
    paddingHorizontal: 16,
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
