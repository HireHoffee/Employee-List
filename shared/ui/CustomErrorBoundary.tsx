import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const CustomErrorBoundary = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 56, height: 56 }}
        source={require("@/shared/assets/images/alien-icon.png")}
      />
      <View style={{ paddingTop: 8, gap: 12 }}>
        <Text style={styles.errorTitle}>Какой-то сверхразум все сломал</Text>
        <Text style={styles.errorSubtitle}>Постараемся быстро починить</Text>
        <Pressable onPress={() => router.push("/")}>
          <Text style={styles.retry}>Попробовать снова</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorTitle: {
    fontSize: 17,
    fontWeight: 600,
    textAlign: "center",
  },
  errorSubtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#97979B",
  },
  retry: {
    fontSize: 16,
    textAlign: "center",
    color: "#6534FF",
    fontWeight: 600,
  },
});

export default CustomErrorBoundary;
