import EmployeeCard from "@/shared/ui/EmployeeCard";
import SortDrawer from "@/shared/ui/SortDrawer";
import TopBar from "@/widgets/topbar/ui/TopBar";
import { FlatList, StyleSheet, View } from "react-native";

const HomePage = () => {
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <TopBar />
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
        renderItem={() => <EmployeeCard />}
        keyExtractor={(item) => item.toString()}
        contentContainerStyle={styles.cardsContainer}
        showsVerticalScrollIndicator={false}
      />
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
