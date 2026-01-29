import { $employee, setEmployeeSelectedId } from "@/entities/employees/store";
import LeftArrowIcon from "@/shared/assets/svgs/left-arrow-icon.svg";
import PhoneIcon from "@/shared/assets/svgs/phone-icon.svg";
import StarIcon from "@/shared/assets/svgs/star-icon.svg";
import { i18n } from "@/shared/utils/localization";
import { calculateAge, formatPhoneNumber } from "@/shared/utils/utilsFunctions";
import { useUnit } from "effector-react";
import { Image } from "expo-image";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

const EmployeePage = () => {
  const router = useRouter();
  const glob = useGlobalSearchParams();
  const [data, setEmployeesId] = useUnit([$employee, setEmployeeSelectedId]);
  const [errorImageLoading, setErrorImageLoading] = useState(false);

  useEffect(() => {
    setEmployeesId(glob.id as string);
  }, []);

  if (!data) {
    return;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.mainInfoContainer}>
        <Pressable style={styles.icon} onPress={() => router.back()}>
          {({ pressed }) => <LeftArrowIcon style={[pressed && { opacity: 0.6 }]} />}
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
            <Text
              style={{ fontWeight: "600", fontSize: 24 }}
            >{`${data.firstName} ${data.lastName}`}</Text>
            <Text style={{ color: "#97979b" }}>{data.userTag}</Text>
          </View>
          <Text style={{ textAlign: "center", fontSize: 13 }}>{data.department}</Text>
        </View>
      </View>
      <View style={styles.additionalInfoContainer}>
        <View style={styles.birthdayContainer}>
          <View style={styles.birthday}>
            <StarIcon />
            <Text style={{ fontSize: 16 }}>
              {new Date(data.birthday).toLocaleDateString(
                `${i18n.locale === "ru" ? "ru-RU" : "en-US"}`,
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            </Text>
          </View>
          <Text style={{ color: "#97979B", fontSize: 16 }}>
            {calculateAge(data.birthday, i18n.locale)}
          </Text>
        </View>
        <Pressable onPress={() => Linking.openURL(`tel:${data.phone}`)}>
          {({ pressed }) => (
            <View style={[styles.phoneContainer, pressed && { opacity: 0.6 }]}>
              <PhoneIcon />
              <Text style={{ fontSize: 16 }}>{formatPhoneNumber(data.phone)}</Text>
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
    backgroundColor: "#f7f7f8",
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
    backgroundColor: "#fff",
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
