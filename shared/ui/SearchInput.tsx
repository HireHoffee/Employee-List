import SearchIcon from "@/shared/assets/svgs/search-icon.svg";
import SortIcon from "@/shared/assets/svgs/sort-icon.svg";
import { useUnit } from "effector-react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { $sortValue, setIsDrawerOpen } from "../store/utils";

const SearchInput = ({ onChangeText }: { onChangeText: (text: string) => void }) => {
  const [sortValue, setDrawerOpen] = useUnit([$sortValue, setIsDrawerOpen]);

  return (
    <View style={styles.inputContainer}>
      <SearchIcon width={24} height={24} style={styles.search} />
      <TextInput
        style={styles.input}
        placeholder="Введи имя, тег, почту..."
        placeholderTextColor={"#c3c3c6"}
        onChangeText={onChangeText}
      />
      <Pressable style={styles.sort} onPress={() => setDrawerOpen(true)}>
        {({ pressed }) => (
          <SortIcon
            width={24}
            height={24}
            style={[pressed && { opacity: 0.6 }]}
            fill={sortValue ? "#6534ff" : "#9e9ea2"}
          />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  input: {
    paddingHorizontal: 44,
    paddingVertical: 8,
    height: 40,
    borderRadius: 16,
    backgroundColor: "#f7f7f8",
    width: "100%",
    fontSize: 15,
  },
  search: {
    position: "absolute",
    left: 28,
    zIndex: 1,
  },
  sort: {
    position: "absolute",
    right: 28,
    zIndex: 1,
  },
});

export default SearchInput;
