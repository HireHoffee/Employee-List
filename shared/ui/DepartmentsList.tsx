import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { DEPARTMENTS_LIST } from "../data";

type Props = {
  selectedTag: string;
  setDepartment: (tag: string) => void;
};

const DepartmentsList = ({ selectedTag, setDepartment }: Props) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
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
              {department.name}
            </Text>
          )}
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingTop: 8,
  },
  contentContainer: {
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
