import { Link } from "expo-router";
import { Text, View } from "react-native";

const HomePage = () => {
  return (
    <View>
      <Text>Home Page</Text>
      <Text>{"\n"}</Text>
      <Link href={"/employee/123"}>Перейти к сотрудникам</Link>
    </View>
  );
};

export default HomePage;
