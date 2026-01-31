import HomePage from "@/pages/home/ui/HomePage";
import { useTheme } from "@/shared/hooks/useTheme";
import { $error } from "@/shared/store/errors";
import ErrorPage from "@/shared/ui/CustomErrorBoundary";
import { basicStyles } from "@/shared/utils/basicStyles";
import { useUnit } from "effector-react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const error = useUnit($error);
  const { changeStyles } = useTheme();

  return (
    <SafeAreaView style={[basicStyles, changeStyles([["backgroundColor", "background"]])]}>
      {error ? <ErrorPage /> : <HomePage />}
    </SafeAreaView>
  );
}
