import { Employee } from "@/entities/employees/types";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = Pick<Employee, "firstName" | "lastName" | "avatarUrl" | "userTag" | "department">;

const EmployeeCard = ({ firstName, lastName, avatarUrl, userTag, department }: Props) => {
  return (
    <Link href={"/employee/12345"} asChild>
      <Pressable>
        {({ pressed }) => (
          <View style={[styles.container, pressed && { opacity: 0.6 }]}>
            <Image style={styles.image} source={"https://picsum.photos/seed/696/3000/2000"} />
            {/* <Image style={styles.image} source={avatarUrl} /> (не прогружаются аватары с бэка) */}
            <View>
              <View style={{ flexDirection: "row", gap: 4 }}>
                <Text
                  style={{ fontWeight: "600", fontSize: 16 }}
                >{`${firstName} ${lastName}`}</Text>
                <Text style={{ color: "#97979b" }}>{userTag}</Text>
              </View>
              <Text style={{ fontSize: 13 }}>{department}</Text>
            </View>
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
  image: {
    width: 72,
    height: 72,
    borderRadius: 50,
  },
});

export default EmployeeCard;
