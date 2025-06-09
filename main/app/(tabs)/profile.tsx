import { BasicWrapper } from "@/components";
import { Text, View } from "react-native";

function Profile() {
  return (
    <View className="flex-1 items-center justify-start">
      <Text className="bg-white">Profile</Text>
    </View>
  );
}

export default BasicWrapper(Profile);
