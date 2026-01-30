import { useUnit } from "effector-react";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { i18n } from "../locales";
import { setError } from "../store/errors";
import { AppText } from "./AppText";

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
        <AppText style={styles.errorTitle}>{i18n.t("brokenText")}</AppText>
        <AppText lightText style={styles.errorSubtitle}>
          {i18n.t("tryingToFixText")}
        </AppText>
        <Pressable
          onPress={() => {
            router.navigate("/");
            clearError(null);
          }}
        >
          <AppText primary style={styles.retry}>
            {i18n.t("tryAgainText")}
          </AppText>
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
  },
  retry: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: 600,
  },
});

export default CustomErrorBoundary;
