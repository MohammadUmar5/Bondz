import React, { useRef } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { LiquidGlassChallengeCard } from './LiquidGlassChallengeCard';
import { ChallengeCard } from '../../../../types/challenge';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.85;

interface Props {
  challengeCards: ChallengeCard[];
  currentChallengeIndex: number;
  onChallengePress: () => void;
  onIndexChange: (index: number) => void;
  joinedChallenges: number[];
}

export function ChallengeCarousel({ 
  challengeCards, 
  currentChallengeIndex, 
  onChallengePress, 
  onIndexChange,
  joinedChallenges
}: Props) {
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      onIndexChange(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const renderChallengeCard = ({ item }: { item: ChallengeCard }) => {
    const isJoined = joinedChallenges.includes(item.id);
    return (
      <LiquidGlassChallengeCard 
        item={item} 
        onPress={onChallengePress}
        isJoined={isJoined}
      />
    );
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={challengeCards}
        renderItem={renderChallengeCard}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        snapToInterval={cardWidth + 16}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: cardWidth + 16,
          offset: (cardWidth + 16) * index,
          index,
        })}
      />

      {/* Simple pagination dots */}
      <View className="flex-row justify-center mt-4 space-x-2">
        {challengeCards.map((_, index) => (
          <View
            key={index}
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: index === currentChallengeIndex 
                ? '#FFFFFF' 
                : 'rgba(255, 255, 255, 0.3)',
              width: index === currentChallengeIndex ? 10 : 8,
              height: index === currentChallengeIndex ? 10 : 8,
            }}
          />
        ))}
      </View>
    </View>
  );
}