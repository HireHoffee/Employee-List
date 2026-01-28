import { ScrollView, StyleSheet, Text, View } from "react-native";

const departments = [
  { id: 0, name: "Все", apiTag: "all" },
  { id: 1, name: "Android", apiTag: "android" },
  { id: 2, name: "iOS", apiTag: "ios" },
  { id: 3, name: "Дизайн", apiTag: "design" },
  { id: 4, name: "Менеджмент", apiTag: "management" },
  { id: 5, name: "QA", apiTag: "qa" },
  { id: 6, name: "Бэк-офис", apiTag: "back_office" },
  { id: 7, name: "Frontend", apiTag: "frontend" },
  { id: 8, name: "HR", apiTag: "hr" },
  { id: 9, name: "PR", apiTag: "pr" },
  { id: 10, name: "Backend", apiTag: "backend" },
  { id: 11, name: "Техподдержка", apiTag: "support" },
  { id: 12, name: "Аналитика", apiTag: "analytics" },
];

const DepartmentsList = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {departments.map((department) => (
        <View key={department.id} style={styles.department}>
          <Text style={styles.text}>{department.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    marginTop: 8,
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
});

export default DepartmentsList;
