import DepartmentsList from "@/shared/ui/DepartmentsList";
import SearchInput from "@/shared/ui/SearchInput";
import { StyleSheet, View } from "react-native";

const TopBar = () => {
  return (
    <View style={styles.container}>
      <SearchInput />
      <DepartmentsList />
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
