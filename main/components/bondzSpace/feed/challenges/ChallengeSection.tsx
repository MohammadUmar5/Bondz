import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { ChallengeCarousel } from './ChallengeCarousel';
import { challengeCards } from '../../../../data/challengeCards';
import { ChallengeCard } from '../../../../types/challenge';
import { Colors } from '../../../../constants/Colors';

const { width } = Dimensions.get('window');

interface Props {
  onChallengePress: (challenge: ChallengeCard) => void;
  joinedChallenges: number[];
  onSeeMyResponses: (challenge: ChallengeCard) => void;
}

export function ChallengeSection({ 
  onChallengePress, 
  joinedChallenges, 
  onSeeMyResponses 
}: Props) {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  const handleChallengePress = () => {
    const currentChallenge = challengeCards[currentChallengeIndex];
    const isJoined = joinedChallenges.includes(currentChallenge.id);
    
    if (isJoined) {
      onSeeMyResponses(currentChallenge);
    } else {
      onChallengePress(currentChallenge);
    }
  };

  return (
    <View className="mb-6">
      {/* Section title */}
      <View className="px-4 mb-4">
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

      {/* Challenge carousel */}
      <ChallengeCarousel
        challengeCards={challengeCards}
        currentChallengeIndex={currentChallengeIndex}
        onChallengePress={handleChallengePress}
        onIndexChange={setCurrentChallengeIndex}
        joinedChallenges={joinedChallenges}
      />
    </View>
  );
}