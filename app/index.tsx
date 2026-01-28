import HomePage from "@/pages/home/ui/HomePage";
import { $error } from "@/shared/store/errors";
import ErrorPage from "@/shared/ui/CustomErrorBoundary";
import { basicStyles } from "@/shared/utils/basicStyles";
import { useUnit } from "effector-react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const error = useUnit($error);

  return <SafeAreaView style={basicStyles}>{error ? <ErrorPage /> : <HomePage />}</SafeAreaView>;
}
