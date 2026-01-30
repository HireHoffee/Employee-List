import { $employee, setEmployeeSelectedId } from "@/entities/employees/store";
import LeftArrowIcon from "@/shared/assets/svgs/left-arrow-icon.svg";
import PhoneIcon from "@/shared/assets/svgs/phone-icon.svg";
import StarIcon from "@/shared/assets/svgs/star-icon.svg";
import { useTheme } from "@/shared/hooks/useTheme";
import { i18n } from "@/shared/locales";
import { AppText } from "@/shared/ui/AppText";
import { calculateAge, formatPhoneNumber } from "@/shared/utils/utilsFunctions";
import { useUnit } from "effector-react";
import { Image } from "expo-image";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Linking, Pressable, StyleSheet, View } from "react-native";

const EmployeePage = () => {
  const router = useRouter();
  const glob = useGlobalSearchParams();
  const [data, setEmployeesId] = useUnit([$employee, setEmployeeSelectedId]);
  const [errorImageLoading, setErrorImageLoading] = useState(false);
  const { theme, dark, light } = useTheme();

  useEffect(() => {
    setEmployeesId(glob.id as string);
  }, []);

  if (!data) {
    return;
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={[
          styles.mainInfoContainer,
          theme === "light"
            ? { backgroundColor: light.secondaryBackground }
            : { backgroundColor: dark.secondaryBackground },
        ]}
      >
        <Pressable style={styles.icon} onPress={() => router.back()}>
          {({ pressed }) => (
            <LeftArrowIcon
              style={[pressed && { opacity: 0.6 }]}
              fill={theme === "light" ? light.text : dark.text}
            />
          )}
        </Pressable>
        <Image
          style={styles.image}
          source={
            errorImageLoading
              ? require("@/shared/assets/images/fallback-image.png")
              : { uri: data.avatarUrl }
          }
          onError={() => setErrorImageLoading(true)}
        />
        <View style={{ gap: 12 }}>
          <View style={styles.info}>
            <AppText
              style={{ fontWeight: "600", fontSize: 24 }}
            >{`${data.firstName} ${data.lastName}`}</AppText>
            <AppText lightText>{data.userTag}</AppText>
          </View>
          <AppText style={{ textAlign: "center", fontSize: 13 }}>{data.department}</AppText>
        </View>
      </View>
      <View
        style={[
          styles.additionalInfoContainer,
          theme === "light"
            ? { backgroundColor: light.background }
            : { backgroundColor: dark.background },
        ]}
      >
        <View style={styles.birthdayContainer}>
          <View style={styles.birthday}>
            <StarIcon fill={theme === "light" ? light.text : dark.text} />
            <AppText style={{ fontSize: 16 }}>
              {new Date(data.birthday).toLocaleDateString(
                `${i18n.locale === "ru" ? "ru-RU" : "en-US"}`,
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            </AppText>
          </View>
          <AppText lightText style={{ fontSize: 16 }}>
            {calculateAge(data.birthday, i18n.locale)}
          </AppText>
        </View>
        <Pressable onPress={() => Linking.openURL(`tel:${data.phone}`)}>
          {({ pressed }) => (
            <View style={[styles.phoneContainer, pressed && { opacity: 0.6 }]}>
              <PhoneIcon fill={theme === "light" ? light.text : dark.text} />
              <AppText style={{ fontSize: 16 }}>{formatPhoneNumber(data.phone)}</AppText>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainInfoContainer: {
    minHeight: 200,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingTop: 28,
    paddingBottom: 42,
  },
  icon: {
    position: "absolute",
    top: 14,
    left: 16,
  },
  image: {
    width: 104,
    height: 104,
    borderRadius: 50,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  additionalInfoContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
  },
  birthdayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  birthday: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "center",
  },
  phoneContainer: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 16,
  },
});

export default EmployeePage;
