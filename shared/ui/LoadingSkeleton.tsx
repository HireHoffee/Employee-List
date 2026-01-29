import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

const LoadingSkeleton = () => {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      shimmerValue.setValue(0);
      Animated.timing(shimmerValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => animate());
    };

    animate();

    return console.log("lorem");
  }, [shimmerValue]);

  const shimmerTranslateX = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  const ShimmerOverlay = ({ style }: { style?: StyleProp<ViewStyle> }) => (
    <Animated.View
      style={[
        style,
        {
          transform: [{ translateX: shimmerTranslateX }],
        },
      ]}
    >
      <View style={styles.shimmerGradient} />
    </Animated.View>
  );

  return (
    <View style={styles.wrapper}>
      {[1, 2, 3, 4, 5].map((item) => (
        <View key={item} style={styles.container}>
          <View style={styles.skeletonWrapper}>
            <View style={styles.circle}></View>
            <ShimmerOverlay style={styles.shimmerOverlay} />
          </View>
          <View style={styles.textWrapper}>
            <View style={styles.textContainer}>
              <View style={styles.text}></View>
              <ShimmerOverlay style={styles.shimmerOverlay} />
            </View>
            <View style={styles.textContainer}>
              <View style={styles.additional}></View>
              <ShimmerOverlay style={styles.shimmerOverlay} />
            </View>
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
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  skeletonWrapper: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 36,
  },
  textWrapper: {
    gap: 6,
    flex: 1,
  },
  textContainer: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 8,
  },
  circle: {
    width: 72,
    height: 72,
    backgroundColor: "#f0f0f0",
  },
  text: {
    width: 144,
    height: 16,
    backgroundColor: "#f0f0f0",
  },
  additional: {
    width: 80,
    height: 12,
    backgroundColor: "#f0f0f0",
  },
  shimmerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  shimmerGradient: {
    width: "50%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    transform: [{ skewX: "-20deg" }],
  },
});

export default LoadingSkeleton;
