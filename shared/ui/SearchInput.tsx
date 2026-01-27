import SearchIcon from "@/shared/assets/svgs/search-icon.svg";
import SortIcon from "@/shared/assets/svgs/sort-icon.svg";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const SearchInput = () => {
  return (
    <View style={styles.inputContainer}>
      <SearchIcon width={24} height={24} style={styles.search} />
      <TextInput
        style={styles.input}
        placeholder="Введи имя, тег, почту..."
        placeholderTextColor={"#c3c3c6"}
      />
      <SortIcon width={24} height={24} style={styles.sort} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
    marginHorizontal: 16,
  },
  input: {
    paddingHorizontal: 44,
    paddingVertical: 8,
    height: 40,
    borderRadius: 16,
    backgroundColor: "#f7f7f8",
    width: "100%",
    fontSize: 16,
  },
  search: {
    position: "absolute",
    left: 12,
    zIndex: 1,
  },
  sort: {
    position: "absolute",
    right: 12,
    zIndex: 1,
  },
});

export default SearchInput;
