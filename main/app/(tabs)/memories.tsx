import { BasicWrapper } from "@/components";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeProvider";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import ThreadCard from "@/components/bondzSpace/threads/ThreadCard";
import { sampleThreads } from "@/components/bondzSpace/threads/threadData";

function Memories() {
  const { theme } = useTheme();
  const router = useRouter();

  const handleJoinThread = (threadId: string) => {
    console.log("Joining thread:", threadId);
    // Implement join thread logic
  };

  const handleViewContributors = (threadId: string) => {
    console.log("Viewing contributors for thread:", threadId);
    // Implement view contributors logic
  };

  const handleThreadPress = (threadId: string) => {
    console.log("Opening thread:", threadId);
    // Navigate to thread detail page
    // router.push(`/threads/${threadId}`);
  };

  const handleCreateThread = () => {
    console.log("Creating new thread");
  };

  return (
    <View className="flex-1" style={{ backgroundColor: Colors.default.bg }}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-2 pb-4">
        <Text
          className="text-2xl font-bold"
          style={{ color: Colors.default.textPrimary }}
        >
          Threads
        </Text>
        <TouchableOpacity activeOpacity={0.6} onPress={handleCreateThread}>
          <MaterialIcons
            name="add-box"
            size={24}
            color={Colors[theme].textPrimary}
          />
        </TouchableOpacity>
      </View>

      {/* Thread Cards */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {sampleThreads.map((thread) => (
          <ThreadCard
            key={thread.id}
            thread={thread}
            theme={theme}
            onJoin={handleJoinThread}
            onViewContributors={handleViewContributors}
            onThreadPress={handleThreadPress}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default BasicWrapper(Memories);
