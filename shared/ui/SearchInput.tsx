import SearchIcon from "@/shared/assets/svgs/search-icon.svg";
import SortIcon from "@/shared/assets/svgs/sort-icon.svg";
import { i18n } from "@/shared/locales";
import { useUnit } from "effector-react";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { $sortValue, setIsDrawerOpen } from "../store/utils";
import { AppText } from "./AppText";

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
  const { theme, dark, light } = useTheme();

  const iconBase = theme === "light" ? light.lightText : dark.lightText;
  const iconPrimary = theme === "light" ? light.primary : dark.primary;

  return (
    <View style={styles.inputContainer}>
      <SearchIcon width={24} height={24} style={styles.search} />
      <TextInput
        ref={inputRef}
        style={[
          styles.input,
          theme === "light"
            ? { backgroundColor: light.secondaryBackground, color: light.text }
            : { backgroundColor: dark.secondaryBackground, color: dark.text },
        ]}
        placeholder={i18n.t("searchPlaceholder")}
        placeholderTextColor={theme === "light" ? light.lightText : dark.lightText}
        onChangeText={(text) => {
          onChangeText(text);
          setSearchValue(text);
        }}
        value={searchValue}
        onFocus={() => setSearchOnFocus(true)}
        onBlur={() => {
          setTimeout(() => {
            setSearchOnFocus(false);
          }, 100);
        }}
      />
      {!searchOnFocus && (
        <Pressable style={styles.sort} onPress={() => setDrawerOpen(true)}>
          {({ pressed }) => (
            <SortIcon
              width={24}
              height={24}
              style={[pressed && { opacity: 0.6 }]}
              fill={sortValue ? iconPrimary : iconBase}
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
            <AppText primary style={[styles.cancel, pressed && { opacity: 0.6 }]}>
              {i18n.t("cancel")}
            </AppText>
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
    fontSize: 14,
    fontWeight: 600,
  },
});

export default SearchInput;
