import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { i18n } from "../locales";

export const ConnectionFailed = () => {
  return (
    <View style={[styles.container, { backgroundColor: "#f44336" }]}>
      <Text style={styles.text}>{i18n.t("cannotUpdateData")}</Text>
      <Text style={styles.text}>{i18n.t("checkConnection")}</Text>
    </View>
  );
};

export const ConnectionSuccess = () => {
  const queryClient = useQueryClient();
  const isFetching = useIsFetching();

  useEffect(() => {
    queryClient.invalidateQueries();
  }, []);

  return (
    <>
      {isFetching === 1 && (
        <View style={[styles.container, { backgroundColor: "#6534ff" }]}>
          <Text style={styles.text}>{i18n.t("waiting")}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    position: "absolute",
    bottom: 40,
    left: 16,
    right: 16,
    marginHorizontal: 16,
  },
  text: {
    fontSize: 16,
    color: "#fff",
  },
});
