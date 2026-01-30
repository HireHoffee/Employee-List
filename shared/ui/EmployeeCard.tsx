import { Employee } from "@/entities/employees/types";
import { i18n } from "@/shared/locales";
import { useUnit } from "effector-react";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { $sortValue } from "../store/utils";
import { AppText } from "./AppText";

const EmployeeCard = ({
  id,
  firstName,
  lastName,
  avatarUrl,
  userTag,
  department,
  birthday,
}: Employee) => {
  const [sortValue] = useUnit([$sortValue]);
  const [errorImageLoading, setErrorImageLoading] = useState(false);

  return (
    <Link href={`/employee/${id}`} asChild>
      <Pressable>
        {({ pressed }) => (
          <View style={[styles.wrapper, pressed && { opacity: 0.6 }]}>
            <View style={styles.container}>
              <Image
                style={styles.image}
                placeholder={require("@/shared/assets/images/placeholder.png")}
                source={
                  errorImageLoading
                    ? require("@/shared/assets/images/fallback-image.png")
                    : { uri: avatarUrl }
                }
                onError={() => setErrorImageLoading(true)}
              />
              <View>
                <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
                  <AppText
                    style={{ fontWeight: "600", fontSize: 16 }}
                  >{`${firstName} ${lastName}`}</AppText>
                  <AppText lightText>{userTag}</AppText>
                </View>
                <AppText secondary style={{ fontSize: 13 }}>
                  {department}
                </AppText>
              </View>
            </View>
            {sortValue === "birthday" ? (
              <AppText style={{ fontSize: 15 }}>
                {new Date(birthday).toLocaleDateString(
                  `${i18n.locale === "ru" ? "ru-RU" : "en-US"}`,
                  {
                    month: "short",
                    day: "numeric",
                  },
                )}
              </AppText>
            ) : null}
          </View>
        )}
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 50,
  },
});

export default EmployeeCard;
