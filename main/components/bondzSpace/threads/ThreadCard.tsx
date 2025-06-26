import React, { useRef } from "react";
import { Text, TouchableOpacity, View, Animated } from "react-native";
import { Image } from "expo-image";
import { Colors } from "../../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// Sample thread data type
export interface ThreadData {
  id: string;
  title: string;
  latestPost: string;
  latestImage?: string;
  contributors: Array<{
    id: string;
    avatar: string;
  }>;
  additionalCount: number;
  timeAgo: string;
  createdBy: string;
  isActive: boolean;
}

interface ThreadCardProps {
  thread: ThreadData;
  theme: string;
  onJoin: (threadId: string) => void;
  onViewContributors: (threadId: string) => void;
  onThreadPress: (threadId: string) => void;
}

const ThreadCard: React.FC<ThreadCardProps> = ({
  thread,
  theme,
  onJoin,
  onViewContributors,
  onThreadPress,
}) => {
  const accentColor = thread.isActive ? "#22B8A7" : "#7C3AED";
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleJoinPress = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1.15, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();
    onJoin(thread.id);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onThreadPress(thread.id)}
      className="mb-4 mx-4"
    >
      <View
        className="rounded-2xl p-0 shadow-sm"
        style={{
          backgroundColor: Colors.default.cardBg,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        {/* Header Row */}
        <View className="flex-row items-center justify-between mb-1">
          <View className="flex-row items-center flex-1">
            <Image
              source={{ uri: thread.contributors[0]?.avatar }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                marginRight: 12,
                backgroundColor: Colors.default.cardBg,
              }}
              contentFit="cover"
              placeholder={{ blurhash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4" }}
              transition={200}
            />

            <Text
              className="font-bold flex-1"
              style={{
                color: Colors.default.textPrimary,
                fontSize: 15,
                marginTop: -18,
              }}
              numberOfLines={1}
            >
              {thread.title}
            </Text>
          </View>
        </View>

        {/* Time and Started By */}
        <Text
          className="text-xs mb-4"
          style={{
            color: Colors.default.textSecondary,
            marginTop: -18,
            marginLeft: 52,
          }}
        >
          Started by {thread.createdBy} • {thread.timeAgo}
        </Text>

        {/* Post Snippet */}
        <Text
          className="mb-4"
          style={{ color: Colors.default.textPrimary, fontSize: 13 }}
          numberOfLines={2}
        >
          {thread.latestPost}
        </Text>

        {/* Image Preview */}
        {thread.latestImage && (
          <View className="mb-3">
            <Image
              source={{ uri: thread.latestImage }}
              style={{
                backgroundColor: Colors.default.bg,
                height: 225,
                borderRadius: 16, // Add this for rounded corners
              }}
              contentFit="cover"
            />
          </View>
        )}

        {/* Contributors Row */}
        <View className="flex-row items-center justify-between flex-wrap gap-y-2">
          {/* Avatar Chain */}
          <View className="flex-row items-center max-w-[50%] flex-shrink">
            {thread.contributors.slice(0, 4).map((contributor, index) => (
              <TouchableOpacity
                key={contributor.id}
                activeOpacity={0.8}
                style={{ marginLeft: index > 0 ? -8 : 0, zIndex: 4 - index }}
              >
                <Image
                  source={{ uri: contributor.avatar }}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                  }}
                />
              </TouchableOpacity>
            ))}
            {thread.additionalCount > 0 && (
              <View
                className="w-8 h-8 rounded-full items-center justify-center"
                style={{
                  backgroundColor: Colors.default.bg,
                  marginLeft: 4,
                }}
              >
                <Text
                  className="text-xs font-semibold"
                  style={{ color: Colors.default.textSecondary }}
                >
                  +{thread.additionalCount}
                </Text>
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View className="flex-row items-center gap-x-3 flex-wrap mt-2">
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleJoinPress}
                style={{
                  borderRadius: 999,
                  overflow: "hidden",
                  height: 36,
                  width: 90,
                }}
              >
                <LinearGradient
                  colors={["yellow", "#EC4899"]} // yellow and pink
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 999,
                    paddingHorizontal: 10,
                  }}
                >
                  <MaterialIcons
                    name="celebration"
                    size={18}
                    color="#fff"
                    style={{ marginRight: 6 }}
                  />
                  <Text
                    className="text-white text-xs font-semibold"
                    style={{ fontSize: 12 }}
                  >
                    Join
                  </Text>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    size={14}
                    color="#fff"
                    style={{ marginLeft: 4 }}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
        <View
          className="h-px mx-4 mt-5 mb-4"
          style={{
            backgroundColor: Colors.default.textSecondary,
            opacity: 0.2,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ThreadCard;
