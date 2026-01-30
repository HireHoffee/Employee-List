import { i18n } from "@/shared/locales";
import { Pressable, ScrollView, StyleSheet, TextStyle, View } from "react-native";
import { DEPARTMENTS_LIST } from "../data";
import { useTheme } from "../hooks/useTheme";
import { AppText } from "./AppText";

type Props = {
  selectedTag: string;
  setDepartment: (tag: string) => void;
};

const DepartmentsList = ({ selectedTag, setDepartment }: Props) => {
  const { theme, light, dark } = useTheme();

  const selectedItem = {
    fontWeight: 600,
    color: theme === "light" ? light.text : dark.text,
  };
  const bottomBorder = {
    borderBottomWidth: 2,
    borderBottomColor: theme === "light" ? light.primary : dark.primary,
  };

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {DEPARTMENTS_LIST.map((department) => (
          <Pressable
            key={department.id}
            style={[styles.department, selectedTag === department.apiTag && bottomBorder]}
            onPress={() => setDepartment(department.apiTag)}
          >
            {({ pressed }) => (
              <AppText
                lightText
                style={[
                  { fontSize: 15 },
                  selectedTag === department.apiTag && (selectedItem as TextStyle),
                  pressed && { opacity: 0.6 },
                ]}
              >
                {i18n.t(`departments.${department.apiTag}`)}
              </AppText>
            )}
          </Pressable>
        ))}
      </ScrollView>
      <View
        style={[
          styles.brLine,
          theme === "light"
            ? { backgroundColor: light.lightText }
            : { backgroundColor: dark.lightText },
        ]}
      ></View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    flexDirection: "row",
  },
  department: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  brLine: {
    height: 0.5,
    width: "100%",
    position: "absolute",
    bottom: 0,
    zIndex: -1,
  },
});

export default DepartmentsList;
