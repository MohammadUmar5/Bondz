import { BasicWrapper } from "@/components";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthProvider";
import { useTheme } from "@/contexts/ThemeProvider";
import { DashboardProvider } from "@/contexts/DashboardProvider";
import { Text, View } from "react-native";
import { HomeDashboard } from "@/components/home/HomeDashboard";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Home() {
  const { isLoggedIn } = useAuth();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ 
        backgroundColor: Colors[theme].bg,
        flex: 1,
        paddingTop: 0, // Remove any top padding
      }}
    >
      {isLoggedIn ? (
        <DashboardProvider>
          <HomeDashboard />
        </DashboardProvider>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text 
            style={{ color: Colors[theme].textPrimary }}
            className="text-xl font-semibold"
          >
            Please log in to access your Bondz
          </Text>
        </View>
      )}
    </View>
  );
}

export default BasicWrapper(Home);