import React from "react";
import { View, Text } from "react-native";
import { useDashboard } from "../../../contexts/DashboardProvider";
import { useAuth } from "../../../contexts/AuthProvider";
import { useTheme } from "../../../contexts/ThemeProvider";
import { Colors } from "../../../constants/Colors";

export function PersonalWelcome() {
  const { stats } = useDashboard();
  const { user } = useAuth();
  const { theme } = useTheme();
  const colors = Colors[theme];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const getFormattedDate = () => {
    return new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const motivationalQuotes = [
    "Every moment shared is a treasure stored forever.",
    "Relationships are the threads that weave the fabric of life.",
    "Today's memories become tomorrow's smiles.",
    "The best gifts in life are the people we love.",
    "Small moments, big memories.",
  ];

  const randomQuote =
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  const userName =
    user?.displayName ||
    (user?.email ? user.email.replace(/@gmail\.com$/, "") : "Friend");

  return (
    <View className="px-6 pt-4 pb-2">
      {/* Main Greeting */}
      <View className="mb-4">
        <Text
          style={{ color: colors.textPrimary }}
          className="text-2xl font-bold"
        >
          {getGreeting()}, {userName}! 👋
        </Text>
        <Text style={{ color: colors.textSecondary }} className="text-sm mt-1">
          {getFormattedDate()}
        </Text>
      </View>

      {/* Quick Stats */}
      <View
        style={{ backgroundColor: colors.cardBg }}
        className="rounded-2xl p-4 mb-4 border border-gray-800"
      >
        <Text
          style={{ color: colors.textPrimary }}
          className="text-base font-semibold mb-3"
        >
          Your Bondz Summary
        </Text>

        <View className="flex-row justify-between">
          <View className="items-center">
            <Text
              style={{ color: colors.accent }}
              className="text-2xl font-bold"
            >
              {stats.totalMemories}
            </Text>
            <Text style={{ color: colors.textSecondary }} className="text-xs">
              Memories
            </Text>
          </View>

          <View className="items-center">
            <Text
              style={{ color: colors.accent }}
              className="text-2xl font-bold"
            >
              {stats.totalPeople}
            </Text>
            <Text style={{ color: colors.textSecondary }} className="text-xs">
              Loved Ones
            </Text>
          </View>

          <View className="items-center">
            <Text
              style={{ color: colors.accent }}
              className="text-2xl font-bold"
            >
              {stats.memoriesThisMonth}
            </Text>
            <Text style={{ color: colors.textSecondary }} className="text-xs">
              This Month
            </Text>
          </View>

          <View className="items-center">
            <Text
              style={{ color: colors.accent }}
              className="text-2xl font-bold"
            >
              {stats.upcomingReminders}
            </Text>
            <Text style={{ color: colors.textSecondary }} className="text-xs">
              Reminders
            </Text>
          </View>
        </View>
      </View>

      {/* Quote */}
      <View className="flex-row justify-end items-center">
        <View className="flex-1">
          <Text
            style={{ color: colors.textSecondary }}
            className="text-xs italic text-right"
          >
            "{randomQuote}"
          </Text>
        </View>
      </View>
    </View>
  );
}
