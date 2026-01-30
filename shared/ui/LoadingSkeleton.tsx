import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface SkeletonItemProps {
  style?: StyleProp<ViewStyle>;
  animatedValue: Animated.Value;
}

const SkeletonItem = ({ style, animatedValue }: SkeletonItemProps) => {
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["-100%", "100%"],
  });

  return (
    <View style={[styles.skeletonBase, style]}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <View style={styles.shimmerGradient} />
      </Animated.View>
    </View>
  );
};

const LoadingSkeleton = () => {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(shimmerValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    );

    loop.start();

    return () => loop.stop();
  }, [shimmerValue]);

  return (
    <View style={styles.wrapper}>
      {[1, 2, 3, 4, 5].map((item) => (
        <View key={item} style={styles.container}>
          <SkeletonItem animatedValue={shimmerValue} style={styles.circle} />
          <View style={styles.textWrapper}>
            <SkeletonItem animatedValue={shimmerValue} style={styles.text} />
            <SkeletonItem animatedValue={shimmerValue} style={styles.additional} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 16,
    paddingBottom: 32,
    paddingHorizontal: 16,
    gap: 4,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  skeletonBase: {
    backgroundColor: "#E1E9EE",
    overflow: "hidden",
  },
  textWrapper: {
    gap: 8,
    flex: 1,
  },
  circle: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  text: {
    width: "80%",
    height: 16,
    borderRadius: 8,
  },
  additional: {
    width: "40%",
    height: 12,
    borderRadius: 8,
  },
  shimmerGradient: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    transform: [{ skewX: "-20deg" }],
  },
});

export default LoadingSkeleton;
