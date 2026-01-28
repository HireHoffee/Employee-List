import SelectedIcon from "@/shared/assets/svgs/selected-icon.svg";
import UnselectedIcon from "@/shared/assets/svgs/unselected-icon.svg";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const SortDrawer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.drawer}>
        <View style={styles.draggableLine}></View>
        <Text style={styles.title}>Сортировка</Text>
        <View style={styles.options}>
          <Pressable style={styles.option}>
            <SelectedIcon />
            <Text style={{ fontSize: 16 }}>По алфавиту</Text>
          </Pressable>
          <Pressable style={styles.option}>
            <UnselectedIcon />
            <Text style={{ fontSize: 16 }}>По дню рождения</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "none", // временно
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingHorizontal: 8,
    justifyContent: "flex-end",
  },
  draggableLine: {
    width: 56,
    height: 4,
    backgroundColor: "#c3c3c6",
    borderRadius: 2,
    marginVertical: 10,
    alignSelf: "center",
  },
  drawer: {
    height: 220,
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
  },
  options: {
    marginHorizontal: 16,
    marginVertical: 16,
    marginTop: 8,
  },
  option: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 18,
  },
});

export default SortDrawer;
