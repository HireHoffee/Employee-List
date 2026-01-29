import { Employee } from "@/entities/employees/types";
import { useUnit } from "effector-react";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { $sortValue } from "../store/utils";

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

  return (
    <Link href={`/employee/${id}`} asChild>
      <Pressable>
        {({ pressed }) => (
          <View
            style={[
              { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
              pressed && { opacity: 0.6 },
            ]}
          >
            <View style={styles.container}>
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
            {sortValue === "birthday" ? (
              <Text style={{ fontSize: 15 }}>
                {new Date(birthday).toLocaleDateString("ru-RU", {
                  month: "short",
                  day: "numeric",
                })}
              </Text>
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
  image: {
    width: 72,
    height: 72,
    borderRadius: 50,
  },
});

export default EmployeeCard;
