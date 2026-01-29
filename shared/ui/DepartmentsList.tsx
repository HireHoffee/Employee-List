import { i18n } from "@/shared/locales";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { DEPARTMENTS_LIST } from "../data";

type Props = {
  selectedTag: string;
  setDepartment: (tag: string) => void;
};

const DepartmentsList = ({ selectedTag, setDepartment }: Props) => {
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
              <Text
                style={[
                  styles.text,
                  selectedTag === department.apiTag && styles.selectedItem,
                  pressed && { opacity: 0.6 },
                ]}
              >
                {i18n.t(`departments.${department.apiTag}`)}
              </Text>
            )}
          </Pressable>
        ))}
      </ScrollView>
      <View
        style={{
          height: 0.5,
          backgroundColor: "#c3c3c6",
          width: "100%",
          position: "absolute",
          bottom: 0,
          zIndex: -1,
        }}
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
  text: {
    color: "#97979b",
    fontSize: 15,
  },
  bottomBorder: {
    borderBottomWidth: 2,
    borderBottomColor: "#6534ff",
  },
  selectedItem: {
    fontWeight: 600,
    color: "#000",
  },
});

export default DepartmentsList;
