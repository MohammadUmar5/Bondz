// components/TabBar.tsx
import { useTheme } from "@/contexts/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
  home: "home-outline",
  echoes: "albums-outline",
  memories: "images-outline",
  profile: "person-outline",
};

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { theme } = useTheme();
  return (
    <View className="flex-row items-center justify-center absolute w-full bottom-0 right-0 mb-12">
      <BlurView
        intensity={50}
        tint={theme === "cyber" ? "dark" : "light"}
        style={styles.glassContainer}
      >
        <View className="flex-row w-full py-4 rounded-[120px]">
          {/* <View className="absolute w-24 h-full rounded-[120px] bg-white"></View> */}
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.title || route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              if (!isFocused) {
                navigation.navigate(route.name as never);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                activeOpacity={0.8}
                accessibilityState={isFocused ? { selected: true } : {}}
                onPress={onPress}
                className="flex-1 flex-row items-center justify-center gap-2"
              >
                <Ionicons
                  name={icons[route.name] || "ellipse-outline"}
                  size={24}
                  color={isFocused ? "#fff" : "#9CA3AF"}
                  style={{
                    marginLeft: isFocused && route.name === "home" ? 12 : 0,
                  }}
                />
                <Text
                  style={{
                    color: isFocused ? "#fff" : "#9CA3AF",
                    display: isFocused ? "flex" : "none",
                    fontSize: 14,
                    marginRight: isFocused && route.name === "profile" ? 12 : 0,
                  }}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    paddingBottom: 16,
    paddingTop: 8,
    justifyContent: "space-around",
  },
  glassContainer: {
    position: "absolute",
    bottom: 20,
    left: "5%",
    width: "90%",
    borderRadius: 120,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
});
