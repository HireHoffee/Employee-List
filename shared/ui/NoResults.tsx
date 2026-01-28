import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const NoResults = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 56, height: 56 }}
        source={require("@/shared/assets/images/lens-icon.png")}
      />
      <View style={{ paddingTop: 8, gap: 12 }}>
        <Text style={styles.errorTitle}>Мы никого не нашли</Text>
        <Text style={styles.errorSubtitle}>Попробуй скорректировать запрос</Text>
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
});

export default NoResults;
