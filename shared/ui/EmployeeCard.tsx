import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

const EmployeeCard = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source="https://picsum.photos/seed/696/3000/2000" />
      <View>
        <View style={styles.info}>
          <Text style={{ fontWeight: "bold" }}>Алексей Миногаров</Text>
          <Text style={{ color: "#97979b" }}>mi</Text>
        </View>
        <Text>Analyst</Text>
      </View>
    </View>
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
  info: {
    flexDirection: "row",
    gap: 4,
  },
});

export default EmployeeCard;
