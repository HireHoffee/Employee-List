import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const EmployeeCard = () => {
  return (
    <Link href={"/employee/12345"} asChild>
      <Pressable>
        {({ pressed }) => (
          <View style={[styles.container, pressed && { opacity: 0.6 }]}>
            <Image style={styles.image} source="https://picsum.photos/seed/696/3000/2000" />
            <View>
              <View style={{ flexDirection: "row", gap: 4 }}>
                <Text style={{ fontWeight: "600", fontSize: 16 }}>Алексей Миногаров</Text>
                <Text style={{ color: "#97979b" }}>mi</Text>
              </View>
              <Text style={{ fontSize: 13 }}>Analyst</Text>
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
