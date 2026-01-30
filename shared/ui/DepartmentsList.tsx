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
  const { theme } = useTheme();
  const selectedItem = {
    fontWeight: 600,
    color: theme === "light" ? "#050510" : "#FFFFFF",
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
            style={[styles.department, selectedTag === department.apiTag && styles.bottomBorder]}
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
      <View style={styles.brLine}></View>
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
  bottomBorder: {
    borderBottomWidth: 2,
    borderBottomColor: "#6534ff",
  },
  selectedItem: {
    fontWeight: 600,
    color: "#050510",
  },
  brLine: {
    height: 0.5,
    backgroundColor: "#c3c3c6",
    width: "100%",
    position: "absolute",
    bottom: 0,
    zIndex: -1,
  },
});

export default DepartmentsList;
