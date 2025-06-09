import { BasicWrapper } from "@/components";
import { Text, View } from "react-native";

function Echoes() {
  return (
    <View className="flex-1 items-center justify-start">
      <Text className="bg-white">Echoes</Text>
    </View>
  );
}

export default BasicWrapper(Echoes);
