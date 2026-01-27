import HomePage from "@/pages/home/ui/HomePage";
import { basicStyles } from "@/shared/utils/basicStyles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView style={basicStyles}>
      <HomePage />
    </SafeAreaView>
  );
}
