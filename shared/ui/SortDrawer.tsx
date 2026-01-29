import SelectedIcon from "@/shared/assets/svgs/selected-icon.svg";
import UnselectedIcon from "@/shared/assets/svgs/unselected-icon.svg";
import { i18n } from "@/shared/locales";
import { $sortValue, setIsDrawerOpen, setSortValue } from "@/shared/store/utils";
import { useUnit } from "effector-react";
import { useEffect, useRef } from "react";
import { Animated, PanResponder, Pressable, StyleSheet, Text, View } from "react-native";

const SortDrawer = () => {
  const [sortValue, setSortingValue, setDrawerOpen] = useUnit([
    $sortValue,
    setSortValue,
    setIsDrawerOpen,
  ]);

  const slideAnim = useRef(new Animated.Value(300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const panY = useRef(new Animated.Value(0)).current;

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

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        panY.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          handleClose();
        } else {
          Animated.spring(panY, {
            toValue: 0,
            tension: 100,
            friction: 10,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

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
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateY: Animated.add(slideAnim, panY) }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.draggableLine} />
        <Text style={styles.title}>{i18n.t("sort")}</Text>
        <View style={styles.options}>
          <Pressable
            style={styles.option}
            onPress={() => {
              setSortingValue(sortValue === "alphabet" ? null : "alphabet");
              handleClose();
            }}
          >
            {({ pressed }) => (
              <>
                {sortValue === "alphabet" ? <SelectedIcon /> : <UnselectedIcon />}
                <Text style={[pressed && { opacity: 0.6 }]}>{i18n.t("sortByAlphabet")}</Text>
              </>
            )}
          </Pressable>
          <Pressable
            style={styles.option}
            onPress={() => {
              setSortingValue(sortValue === "birthday" ? null : "birthday");
              handleClose();
            }}
          >
            {({ pressed }) => (
              <>
                {sortValue === "birthday" ? <SelectedIcon /> : <UnselectedIcon />}
                <Text style={[pressed && { opacity: 0.6 }]}>{i18n.t("sortByBirthday")}</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 8,
  },
  option: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 18,
  },
});

export default SortDrawer;
