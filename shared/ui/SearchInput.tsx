import SearchIcon from "@/shared/assets/svgs/search-icon.svg";
import SortIcon from "@/shared/assets/svgs/sort-icon.svg";
import { useUnit } from "effector-react";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { $sortValue, setIsDrawerOpen } from "../store/utils";

const SearchInput = ({
  onChangeText,
  value,
}: {
  onChangeText: (text: string) => void;
  value: string;
}) => {
  const [sortValue, setDrawerOpen] = useUnit([$sortValue, setIsDrawerOpen]);
  const [searchValue, setSearchValue] = useState(value);
  const [searchOnFocus, setSearchOnFocus] = useState(false);
  const inputRef = useRef<TextInput>(null);

  return (
    <View style={styles.inputContainer}>
      <SearchIcon width={24} height={24} style={styles.search} />
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Введи имя, тег, почту..."
        placeholderTextColor={"#c3c3c6"}
        onChangeText={(text) => {
          onChangeText(text);
          setSearchValue(text);
        }}
        value={searchValue}
        onFocus={() => setSearchOnFocus(true)}
        onBlur={() => setSearchOnFocus(false)}
      />
      {!searchOnFocus && (
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
      )}
      {searchOnFocus && (
        <Pressable
          onPress={() => {
            inputRef.current?.blur();
            setSearchOnFocus(false);
            setSearchValue("");
            onChangeText("");
          }}
        >
          {({ pressed }) => (
            <Text style={[styles.cancel, pressed && { opacity: 0.6 }]}>Отмена</Text>
          )}
        </Pressable>
      )}
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
    gap: 12,
  },
  input: {
    paddingHorizontal: 44,
    paddingVertical: 8,
    height: 40,
    borderRadius: 16,
    backgroundColor: "#f7f7f8",
    flex: 1,
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
  cancel: {
    color: "#6534FF",
    fontSize: 14,
    fontWeight: 600,
  },
});

export default SearchInput;
