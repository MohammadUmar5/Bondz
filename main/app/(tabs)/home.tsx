import { useAuth } from "@/contexts/AuthProvider";
import { Text, View } from "react-native";

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <View className="bg-blue-700 flex-1 items-center justify-center">
      {isLoggedIn ? (
        <Text className="bg-white">LoggedIn</Text>
      ) : (
        <Text className="bg-white">LoggedOut</Text>
      )}
    </View>
  );
}
