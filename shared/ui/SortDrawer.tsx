import SelectedIcon from "@/shared/assets/svgs/selected-icon.svg";
import UnselectedIcon from "@/shared/assets/svgs/unselected-icon.svg";
import { i18n } from "@/shared/locales";
import { $sortValue, setIsDrawerOpen, setSortValue } from "@/shared/store/utils";
import { useUnit } from "effector-react";
import { useEffect, useRef } from "react";
import { Animated, PanResponder, Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { AppText } from "./AppText";
import LocalizationSwitcher from "./LocalizationSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

const SortDrawer = () => {
  const [sortValue, setSortingValue, setDrawerOpen] = useUnit([
    $sortValue,
    setSortValue,
    setIsDrawerOpen,
  ]);
  const { theme, dark, light } = useTheme();

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
          theme === "light"
            ? { backgroundColor: light.background }
            : { backgroundColor: dark.background },
          {
            transform: [{ translateY: Animated.add(slideAnim, panY) }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <View
          style={[
            styles.draggableLine,
            theme === "light"
              ? { backgroundColor: light.lightText }
              : { backgroundColor: dark.lightText },
          ]}
        />
        <AppText style={styles.title}>{i18n.t("sort")}</AppText>
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
                <AppText style={[pressed && { opacity: 0.6 }]}>{i18n.t("sortByAlphabet")}</AppText>
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
                <AppText style={[pressed && { opacity: 0.6 }]}>{i18n.t("sortByBirthday")}</AppText>
              </>
            )}
          </Pressable>
        </View>
        <LocalizationSwitcher handleClose={handleClose} />
        <ThemeSwitcher handleClose={handleClose} />
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
    borderRadius: 2,
    marginVertical: 10,
    alignSelf: "center",
  },
  drawer: {
    minHeight: 220,
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
