import { useNetworkStatus } from "@/shared/hooks/useNetworkStatus";
import CustomErrorBoundary from "@/shared/ui/CustomErrorBoundary";
import { ConnectionFailed, ConnectionSuccess } from "@/shared/ui/InternetConnectionPopups";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { Try } from "expo-router/build/views/Try";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
    },
  },
});

export default function RootLayout() {
  const { isConnected, prevConnected, isInitialized } = useNetworkStatus();

  return (
    <Try catch={CustomErrorBoundary}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }} />
          {isConnected && isInitialized && prevConnected === false && <ConnectionSuccess />}
          {!isConnected && isInitialized && <ConnectionFailed />}
        </SafeAreaProvider>
      </QueryClientProvider>
    </Try>
  );
}
