import { BasicWrapper } from "@/components";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthProvider";
import { useTheme } from "@/contexts/ThemeProvider";
import { Text, View } from "react-native";

function Home() {
  const { isLoggedIn } = useAuth();
  const { theme } = useTheme();

  return (
    <View
      style={{ backgroundColor: Colors[theme].bg }}
      className="flex-1 items-center justify-center"
    >
      {isLoggedIn ? (
        <Text className="bg-white">LoggedIn</Text>
      ) : (
        <Text className="bg-white">LoggedOut</Text>
      )}
    </View>
  );
}

export default BasicWrapper(Home);
