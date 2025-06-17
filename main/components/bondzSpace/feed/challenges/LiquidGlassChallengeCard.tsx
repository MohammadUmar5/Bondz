import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChallengeCard } from '../../../../types/challenge';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.85;
const cardHeight = 180;

interface Props {
  item: ChallengeCard;
  onPress: () => void;
  isJoined?: boolean; // Add this prop
}

export function LiquidGlassChallengeCard({ item, onPress, isJoined = false }: Props) {
  // Create properly typed gradient arrays
  const mainGradientColors = [
    item.gradient[0],
    item.gradient[1],
    item.gradient[2] || item.gradient[1],
    `${item.gradient[item.gradient.length - 1]}CC`
  ] as const;

  return (
    <View
      style={{
        width: cardWidth,
        height: cardHeight,
        marginRight: 16,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        className="flex-1"
      >
        {/* Static shadow effect */}
        <View
          className="absolute inset-0 rounded-3xl"
          style={{
            shadowColor: item.gradient[0],
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 8,
          }}
        />

        {/* Main gradient background */}
        <LinearGradient
          colors={mainGradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-1 rounded-3xl overflow-hidden"
        >
          {/* Simple overlay instead of blur */}
          <View 
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          />

          {/* Content */}
          <View className="flex-1 p-5 justify-between">
            {/* Header */}
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <Text className="text-white text-xl font-bold mb-1">
                  {item.title}
                </Text>
                <Text className="text-white/90 text-sm">
                  {item.subtitle}
                </Text>
              </View>
              
              {/* Icon */}
              <View 
                className="w-12 h-12 rounded-2xl items-center justify-center ml-3"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <Text style={{ fontSize: 24 }}>{item.image}</Text>
              </View>
            </View>

            {/* Stats */}
            <View className="my-2">
              <Text className="text-white/95 text-xs font-medium">
                {item.stats}
              </Text>
            </View>

            {/* Footer */}
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-white/80 text-xs">
                  {item.participants} participants • {item.timeLeft}
                </Text>
                <Text className="text-white/70 text-xs mt-1">
                  {item.difficulty} • {item.mainTag}
                </Text>
              </View>
              
              {/* Action button - Make it clickable */}
              <TouchableOpacity
                onPress={onPress}
                className="rounded-2xl"
                style={{ 
                  backgroundColor: item.buttonBg, // Always use the original button background
                  paddingHorizontal: isJoined ? 16 : 20, // Slightly wider for "My Responses"
                  paddingVertical: 10,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                  minWidth: 98, // Ensure consistent minimum width
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 8,
                }}
              >
                <Text 
                  className="font-bold text-xs"
                  style={{ color: item.buttonTextColor }} // Always use the original button text color
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {isJoined ? 'My Responses' : item.buttonText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}