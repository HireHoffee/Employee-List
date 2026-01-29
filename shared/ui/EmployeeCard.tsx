import { Employee } from "@/entities/employees/types";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const EmployeeCard = ({ id, firstName, lastName, avatarUrl, userTag, department }: Employee) => {
  return (
    <Link href={`/employee/${id}`} asChild>
      <Pressable>
        {({ pressed }) => (
          <View style={[styles.container, pressed && { opacity: 0.6 }]}>
            <Image style={styles.image} source={"https://picsum.photos/300/300"} />
            {/* <Image style={styles.image} source={avatarUrl} /> (не прогружаются аватары с бэка) */}
            <View>
              <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
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
