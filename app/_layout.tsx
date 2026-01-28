import CustomErrorBoundary from "@/shared/ui/CustomErrorBoundary";
import { Stack } from "expo-router";
import { Try } from "expo-router/build/views/Try";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <Try catch={CustomErrorBoundary}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </Try>
  );
}
