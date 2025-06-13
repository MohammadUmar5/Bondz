import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedBackground } from './AnimatedBackground';
import { ChallengeCarousel } from './ChallengeCarousel';
import { challengeCards } from '../../../../data/challengeCards';
import { ChallengeCard } from '../../../../types/challenge';
import { Colors } from '../../../../constants/Colors';

const { width } = Dimensions.get('window');

interface Props {
  onChallengePress: (challenge: ChallengeCard) => void;
}

export function ChallengeSection({ onChallengePress }: Props) {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  const handleChallengePress = () => {
    const currentChallenge = challengeCards[currentChallengeIndex];
    onChallengePress(currentChallenge);
  };

  const currentChallenge = challengeCards[currentChallengeIndex];

  return (
    <View className="relative mb-6">
      {/* Dynamic background based on current challenge */}
      <LinearGradient
        colors={[
          `${currentChallenge.gradient[0]}20`,
          `${currentChallenge.gradient[1]}15`,
          'transparent'
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0"
        style={{ height: 280 }}
      />

      {/* Animated background elements */}
      <AnimatedBackground />

      {/* Content */}
      <View className="relative z-10 pt-4">
        {/* Section title */}
        <View className="px-4 mb-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text 
                className="text-2xl font-bold"
                style={{ color: Colors.default.textPrimary }}
              >
                Daily Challenges
              </Text>
              <Text 
                className="text-sm mt-1"
                style={{ color: Colors.default.textSecondary }}
              >
                Join the community and share your moments ✨
              </Text>
            </View>
        
          </View>
        </View>

        {/* Challenge carousel */}
        <ChallengeCarousel
          challengeCards={challengeCards}
          currentChallengeIndex={currentChallengeIndex}
          onChallengePress={handleChallengePress}
          onIndexChange={setCurrentChallengeIndex}
        />
      </View>
    </View>
  );
}