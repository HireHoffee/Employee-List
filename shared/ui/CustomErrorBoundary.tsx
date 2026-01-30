import { useUnit } from "effector-react";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { i18n } from "../locales";
import { setError } from "../store/errors";

const CustomErrorBoundary = () => {
  const router = useRouter();
  const clearError = useUnit(setError);

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 56, height: 56 }}
        source={require("@/shared/assets/images/alien-icon.png")}
      />
      <View style={{ paddingTop: 8, gap: 12 }}>
        <Text style={styles.errorTitle}>{i18n.t("brokenText")}</Text>
        <Text style={styles.errorSubtitle}>{i18n.t("tryingToFixText")}</Text>
        <Pressable
          onPress={() => {
            router.navigate("/");
            clearError(null);
          }}
        >
          <Text style={styles.retry}>{i18n.t("tryAgainText")}</Text>
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
