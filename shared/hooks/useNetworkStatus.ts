import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

export const useNetworkStatus = () => {
  const [status, setStatus] = useState<{
    isConnected: boolean | null;
    prevConnected: boolean | null;
  }>({
    isConnected: null,
    prevConnected: null,
  });

  useEffect(() => {
    const handleConnectionChange = (state: NetInfoState) => {
      setStatus((currentStatus) => ({
        isConnected: state.isConnected,
        prevConnected: currentStatus.isConnected,
      }));
    };

    const unsubscribe = NetInfo.addEventListener(handleConnectionChange);
    NetInfo.fetch().then(handleConnectionChange);

    return () => unsubscribe();
  }, []);

  return {
    isConnected: status.isConnected,
    prevConnected: status.prevConnected,
    isInitialized: status.isConnected !== null,
  };
};
