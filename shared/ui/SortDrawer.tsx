import SelectedIcon from "@/shared/assets/svgs/selected-icon.svg";
import UnselectedIcon from "@/shared/assets/svgs/unselected-icon.svg";
import { setIsDrawerOpen } from "@/shared/store/utils";
import { useUnit } from "effector-react";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

const SortDrawer = () => {
  const setDrawerOpen = useUnit(setIsDrawerOpen);
  const slideAnim = useRef(new Animated.Value(300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setDrawerOpen(false);
    });
  };

  return (
    <View style={styles.container}>
      <Pressable style={StyleSheet.absoluteFill} onPress={handleClose}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: "rgba(0,0,0,0.2)", opacity: fadeAnim },
          ]}
        />
      </Pressable>
      <Animated.View style={[styles.drawer, { transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.draggableLine} />
        <Text style={styles.title}>Сортировка</Text>
        <View style={styles.options}>
          <Pressable style={styles.option}>
            {({ pressed }) => (
              <>
                <SelectedIcon style={[pressed && { opacity: 0.6 }]} />
                <Text style={[pressed && { opacity: 0.6 }]}>По алфавиту</Text>
              </>
            )}
          </Pressable>
          <Pressable style={styles.option}>
            {({ pressed }) => (
              <>
                <UnselectedIcon style={[pressed && { opacity: 0.6 }]} />
                <Text style={[pressed && { opacity: 0.6 }]}>По дню рождения</Text>
              </>
            )}
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    width: "100%",
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
    fontWeight: "600",
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
