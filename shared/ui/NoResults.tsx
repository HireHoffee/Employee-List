import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { i18n } from "../locales";
import { AppText } from "./AppText";

const NoResults = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 56, height: 56 }}
        source={require("@/shared/assets/images/lens-icon.png")}
      />
      <View style={{ paddingTop: 8, gap: 12 }}>
        <AppText style={styles.errorTitle}>{i18n.t("noOneFound")}</AppText>
        <AppText lightText style={styles.errorSubtitle}>
          {i18n.t("tryAnotherQuery")}
        </AppText>
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
});

export default NoResults;
