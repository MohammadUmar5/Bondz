import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDashboard } from '../../../contexts/DashboardProvider';
import { useTheme } from '../../../contexts/ThemeProvider';
import { Colors } from '../../../constants/Colors';

export function TodaysFocus() {
  const { memories, people, getRecentMemories } = useDashboard();
  const { theme } = useTheme();
  const colors = Colors[theme];

  // Get a random memory for "Memory of the Day"
  const memoryOfTheDay = memories.length > 0 
    ? memories[Math.floor(Math.random() * memories.length)]
    : null;

  // Find someone to connect with (someone not interacted with recently)
  const personToConnectWith = people
    .sort((a, b) => a.lastInteraction.getTime() - b.lastInteraction.getTime())[0];

  const challengePrompts = [
    "Send a voice message to someone you care about",
    "Share a childhood memory with a family member",
    "Take a photo of something that reminds you of a friend",
    "Write down three things you're grateful for today",
    "Call someone you haven't spoken to in a while",
  ];

  const dailyChallenge = challengePrompts[Math.floor(Math.random() * challengePrompts.length)];

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <View className="px-6 mb-6">
      <Text 
        style={{ color: colors.textPrimary }}
        className="text-xl font-bold mb-4"
      >
        Today's Focus 🎯
      </Text>

      {/* Memory of the Day */}
      {memoryOfTheDay && (
        <TouchableOpacity
          style={{ backgroundColor: colors.cardBg }}
          className="rounded-xl p-4 mb-3 border border-gray-800"
          activeOpacity={0.7}
        >
          <View className="flex-row items-center mb-2">
            <Text className="text-lg mr-2">🌟</Text>
            <Text 
              style={{ color: colors.textPrimary }}
              className="text-sm font-semibold"
            >
              Memory of the Day
            </Text>
          </View>
          <Text 
            style={{ color: colors.textPrimary }}
            className="text-base font-medium mb-1"
          >
            {memoryOfTheDay.title}
          </Text>
          <Text 
            style={{ color: colors.textSecondary }}
            className="text-sm mb-2"
          >
            {memoryOfTheDay.description}
          </Text>
          <Text 
            style={{ color: colors.textSecondary }}
            className="text-xs"
          >
            From {formatTimeAgo(memoryOfTheDay.date)}
          </Text>
        </TouchableOpacity>
      )}

      {/* Person to Connect With */}
      {personToConnectWith && (
        <TouchableOpacity
          style={{ backgroundColor: colors.cardBg }}
          className="rounded-xl p-4 mb-3 border border-gray-800"
          activeOpacity={0.7}
        >
          <View className="flex-row items-center mb-2">
            <Text className="text-lg mr-2">💝</Text>
            <Text 
              style={{ color: colors.textPrimary }}
              className="text-sm font-semibold"
            >
              Reconnect Today
            </Text>
          </View>
          <Text 
            style={{ color: colors.textPrimary }}
            className="text-base font-medium mb-1"
          >
            {personToConnectWith.name}
          </Text>
          <Text 
            style={{ color: colors.textSecondary }}
            className="text-sm mb-2"
          >
            Your {personToConnectWith.relationship.toLowerCase()} • {personToConnectWith.totalMemories} memories together
          </Text>
          <Text 
            style={{ color: colors.textSecondary }}
            className="text-xs"
          >
            Last connected {formatTimeAgo(personToConnectWith.lastInteraction)}
          </Text>
        </TouchableOpacity>
      )}

      {/* Daily Challenge */}
      <View
        style={{ backgroundColor: colors.cardBg }}
        className="rounded-xl p-4 border border-gray-800"
      >
        <View className="flex-row items-center mb-2">
          <Text className="text-lg mr-2">🚀</Text>
          <Text 
            style={{ color: colors.textPrimary }}
            className="text-sm font-semibold"
          >
            Today's Challenge
          </Text>
        </View>
        <Text 
          style={{ color: colors.textSecondary }}
          className="text-sm"
        >
          {dailyChallenge}
        </Text>
      </View>
    </View>
  );
}