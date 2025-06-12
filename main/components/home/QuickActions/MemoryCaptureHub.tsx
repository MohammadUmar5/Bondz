import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../../../contexts/ThemeProvider';
import { Colors } from '../../../constants/Colors';

export function MemoryCaptureHub() {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const handleCaptureAction = (type: string) => {
    // TODO: Implement actual capture functionality
    Alert.alert('Coming Soon', `${type} capture will be implemented next!`);
  };

  const memoryPrompts = [
    "What made you smile today?",
    "Who did you think about recently?",
    "What's a small joy from this week?",
    "Share a moment of gratitude",
    "Record a voice message for someone special",
  ];

  const randomPrompt = memoryPrompts[Math.floor(Math.random() * memoryPrompts.length)];

  return (
    <View className="px-6 mb-6">
      <Text 
        style={{ color: colors.textPrimary }}
        className="text-xl font-bold mb-4"
      >
        Capture This Moment ✨
      </Text>

      {/* Main Add Memory Button */}
      <TouchableOpacity
        style={{ backgroundColor: colors.accent }}
        className="rounded-2xl p-6 mb-4 items-center"
        onPress={() => handleCaptureAction('New Memory')}
        activeOpacity={0.8}
      >
        <View className="flex-row items-center mb-2">
          <Text className="text-4xl mr-3">📸</Text>
          <Text className="text-white text-xl font-bold">Add Memory</Text>
        </View>
        <Text className="text-white/80 text-sm text-center">
          Capture photos, record voices, or write stories
        </Text>
      </TouchableOpacity>

      {/* Quick Action Buttons */}
      <View className="flex-row justify-between mb-4">
        <TouchableOpacity
          style={{ backgroundColor: colors.cardBg }}
          className="flex-1 rounded-xl p-4 mr-2 items-center border border-gray-800"
          onPress={() => handleCaptureAction('Photo')}
          activeOpacity={0.7}
        >
          <Text className="text-2xl mb-1">📷</Text>
          <Text 
            style={{ color: colors.textPrimary }}
            className="text-sm font-medium"
          >
            Photo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ backgroundColor: colors.cardBg }}
          className="flex-1 rounded-xl p-4 mx-1 items-center border border-gray-800"
          onPress={() => handleCaptureAction('Voice Note')}
          activeOpacity={0.7}
        >
          <Text className="text-2xl mb-1">🎙️</Text>
          <Text 
            style={{ color: colors.textPrimary }}
            className="text-sm font-medium"
          >
            Voice
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ backgroundColor: colors.cardBg }}
          className="flex-1 rounded-xl p-4 ml-2 items-center border border-gray-800"
          onPress={() => handleCaptureAction('Story')}
          activeOpacity={0.7}
        >
          <Text className="text-2xl mb-1">✍️</Text>
          <Text 
            style={{ color: colors.textPrimary }}
            className="text-sm font-medium"
          >
            Story
          </Text>
        </TouchableOpacity>
      </View>

      {/* Memory Prompt */}
      <View 
        style={{ backgroundColor: colors.cardBg }}
        className="rounded-xl p-4 border border-gray-800"
      >
        <View className="flex-row items-center mb-2">
          <Text className="text-lg mr-2">💭</Text>
          <Text 
            style={{ color: colors.textPrimary }}
            className="text-sm font-semibold"
          >
            Memory Prompt
          </Text>
        </View>
        <Text 
          style={{ color: colors.textSecondary }}
          className="text-sm"
        >
          {randomPrompt}
        </Text>
      </View>
    </View>
  );
}