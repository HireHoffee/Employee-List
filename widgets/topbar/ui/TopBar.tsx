import SearchInput from "@/shared/ui/SearchInput";
import { StyleSheet, View } from "react-native";

const TopBar = () => {
  return (
    <View style={styles.container}>
      <SearchInput />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    justifyContent: "center",
  },
});

export default TopBar;
