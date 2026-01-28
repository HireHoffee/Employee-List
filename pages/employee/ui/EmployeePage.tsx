import LeftArrowIcon from "@/shared/assets/svgs/left-arrow-icon.svg";
import PhoneIcon from "@/shared/assets/svgs/phone-icon.svg";
import StarIcon from "@/shared/assets/svgs/star-icon.svg";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const EmployeePage = () => {
  const router = useRouter();

  return (
    <View>
      <View style={styles.mainInfoContainer}>
        <Pressable style={styles.icon} onPress={() => router.push("/")}>
          {({ pressed }) => <LeftArrowIcon style={[pressed && { opacity: 0.6 }]} />}
        </Pressable>
        <Image style={styles.image} source="https://picsum.photos/seed/696/3000/2000" />
        <View style={{ gap: 12 }}>
          <View style={styles.info}>
            <Text style={{ fontWeight: "600", fontSize: 24 }}>Алексей Миногаров</Text>
            <Text style={{ color: "#97979b" }}>mi</Text>
          </View>
          <Text style={{ textAlign: "center", fontSize: 13 }}>Analyst</Text>
        </View>
      </View>
      <View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
        <View style={styles.birthdayContainer}>
          <View style={styles.birthday}>
            <StarIcon />
            <Text style={{ fontSize: 16 }}>5 июня 1996</Text>
          </View>
          <Text style={{ color: "#97979B", fontSize: 16 }}>24 года</Text>
        </View>
        <View style={styles.phoneContainer}>
          <PhoneIcon />
          <Text style={{ fontSize: 16 }}>+7 (999) 900 90 90</Text>
        </View>
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
