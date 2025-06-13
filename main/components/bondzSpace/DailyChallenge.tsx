import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../../constants/Colors";

interface Challenge {
  id: string;
  title: string;
  emoji: string;
  description: string;
  tags: string[];
}

interface ChallengeEntry {
  id: string;
  userId: string;
  username: string;
  content: string;
  type: 'text' | 'image' | 'audio';
  tags: string[];
  reactions: { [key: string]: number };
  timestamp: Date;
}

const DailyChallenge: React.FC = () => {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>({
    id: '1',
    title: 'One moment of peace',
    emoji: '🕊️',
    description: 'Today, share something that made you smile 😊',
    tags: ['#Nature', '#Friendship', '#Peace']
  });

  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [showFeedModal, setShowFeedModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [userEntry, setUserEntry] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [hasParticipated, setHasParticipated] = useState(false);
  const [participantCount, setParticipantCount] = useState(245);
  const [timeLeft, setTimeLeft] = useState('12:34:56');
  const [bounceAnim] = useState(new Animated.Value(1));

  // Mock challenge entries
  const [challengeEntries] = useState<ChallengeEntry[]>([
    {
      id: '1',
      userId: '1',
      username: 'Sarah_M',
      content: 'Watching the sunrise from my balcony this morning filled me with such peace ✨',
      type: 'text',
      tags: ['#Nature', '#Peace'],
      reactions: { '❤️': 24, '😊': 15, '🔥': 8 },
      timestamp: new Date()
    },
    {
      id: '2',
      userId: '2',
      username: 'Alex_K',
      content: 'My dog surprised me with cuddles when I was feeling down 🐕',
      type: 'text',  
      tags: ['#Friendship', '#Peace'],
      reactions: { '❤️': 31, '😢': 5, '💡': 12 },
      timestamp: new Date()
    },
    {
      id: '3',
      userId: '3',
      username: 'Maya_R',
      content: 'Found this quiet spot in the park where time seems to stop',
      type: 'image',
      tags: ['#Nature'],
      reactions: { '❤️': 18, '🔥': 22, '💡': 7 },
      timestamp: new Date()
    }
  ]);

  useEffect(() => {
    // Bounce animation for new day highlight
    const bounceAnimation = () => {
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1.1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    };

    const interval = setInterval(bounceAnimation, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleJoinChallenge = () => {
    setShowChallengeModal(true);
  };

  const handleSubmitEntry = () => {
    if (userEntry.trim()) {
      setHasParticipated(true);
      setParticipantCount(prev => prev + 1);
      setShowChallengeModal(false);
      // Show success feedback
      setTimeout(() => setShowFeedModal(true), 500);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const renderDailyChallengeBanner = () => (
    <Animated.View 
      className="mx-4 mb-6 p-4 rounded-2xl"
      style={[{ backgroundColor: Colors.default.cardBg }, { transform: [{ scale: bounceAnim }] }]}>
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <Text className="text-2xl mr-2">{currentChallenge.emoji}</Text>
          <View>
            <Text className="text-xs opacity-60" style={{ color: Colors.default.textSecondary }}>
              📅 Today's Global Challenge
            </Text>
            <Text className="text-lg font-bold" style={{ color: Colors.default.textPrimary }}>
              {currentChallenge.title}
            </Text>
          </View>
        </View>
        <View className="items-end">
          <Text className="text-xs opacity-60" style={{ color: Colors.default.textSecondary }}>
            Ends in
          </Text>
          <Text className="text-sm font-mono" style={{ color: Colors.default.accent }}>
            {timeLeft}
          </Text>
        </View>
      </View>
      
      <TouchableOpacity
        onPress={handleJoinChallenge}
        className="py-3 px-6 rounded-xl"
        style={{ backgroundColor: Colors.default.accent }}
        disabled={hasParticipated}
      >
        <Text className="text-center font-semibold text-white">
          {hasParticipated ? '✅ Participated Today' : '🔘 Join Now'}
        </Text>
      </TouchableOpacity>
      
      {hasParticipated && (
        <TouchableOpacity
          onPress={() => setShowFeedModal(true)}
          className="mt-2 py-2"
        >
          <Text className="text-center text-sm" style={{ color: Colors.default.accent }}>
            View Today's Gallery →
          </Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );

  const renderChallengeModal = () => (
    <Modal visible={showChallengeModal} animationType="slide" presentationStyle="pageSheet">
      <View className="flex-1" style={{ backgroundColor: Colors.default.bg }}>
        <View className="flex-row items-center justify-between p-4 border-b border-gray-700">
          <TouchableOpacity onPress={() => setShowChallengeModal(false)}>
            <Ionicons name="close" size={24} color={Colors.default.textPrimary} />
          </TouchableOpacity>
          <Text className="text-lg font-semibold" style={{ color: Colors.default.textPrimary }}>
            Daily Challenge
          </Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView className="flex-1 p-4">
          <View className="items-center mb-6">
            <Text className="text-3xl mb-2">{currentChallenge.emoji}</Text>
            <Text className="text-xl text-center font-semibold mb-2" style={{ color: Colors.default.textPrimary }}>
              {currentChallenge.description}
            </Text>
            <Text className="text-sm text-center mb-4" style={{ color: Colors.default.textSecondary }}>
              You're Challenge #{participantCount} today!
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-sm font-medium mb-3" style={{ color: Colors.default.textPrimary }}>
              Share your moment:
            </Text>
            
            <View className="flex-row mb-4 space-x-3">
              <TouchableOpacity className="flex-1 py-3 px-4 rounded-xl border border-gray-600 flex-row items-center justify-center">
                <Ionicons name="camera" size={20} color={Colors.default.textSecondary} />
                <Text className="ml-2 text-sm" style={{ color: Colors.default.textSecondary }}>📸 Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 py-3 px-4 rounded-xl border border-gray-600 flex-row items-center justify-center">
                <Ionicons name="mic" size={20} color={Colors.default.textSecondary} />
                <Text className="ml-2 text-sm" style={{ color: Colors.default.textSecondary }}>🎤 Audio</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              className="p-4 rounded-xl border border-gray-600 min-h-[100px]"
              style={{ 
                backgroundColor: Colors.default.cardBg,
                color: Colors.default.textPrimary,
                textAlignVertical: 'top'
              }}
              placeholder="📝 Write your thought..."
              placeholderTextColor={Colors.default.textSecondary}
              multiline
              value={userEntry}
              onChangeText={setUserEntry}
            />
          </View>

          <View className="mb-6">
            <Text className="text-sm font-medium mb-3" style={{ color: Colors.default.textPrimary }}>
              Optional tags:
            </Text>
            <View className="flex-row flex-wrap">
              {currentChallenge.tags.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  onPress={() => toggleTag(tag)}
                  className={`mr-2 mb-2 py-2 px-3 rounded-full ${
                    selectedTags.includes(tag) ? 'opacity-100' : 'opacity-60'
                  }`}
                  style={{ 
                    backgroundColor: selectedTags.includes(tag) 
                      ? Colors.default.accent 
                      : Colors.default.cardBg 
                  }}
                >
                  <Text 
                    className="text-sm"
                    style={{ 
                      color: selectedTags.includes(tag) 
                        ? 'white' 
                        : Colors.default.textSecondary 
                    }}
                  >
                    {tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSubmitEntry}
            className="py-4 rounded-xl mb-4"
            style={{ backgroundColor: Colors.default.accent }}
            disabled={!userEntry.trim()}
          >
            <Text className="text-center font-semibold text-white text-lg">
              🔘 Post Entry
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );

  const renderFeedModal = () => (
    <Modal visible={showFeedModal} animationType="slide">
      <View className="flex-1" style={{ backgroundColor: Colors.default.bg }}>
        <View className="flex-row items-center justify-between p-4 border-b border-gray-700">
          <TouchableOpacity onPress={() => setShowFeedModal(false)}>
            <Ionicons name="close" size={24} color={Colors.default.textPrimary} />
          </TouchableOpacity>
          <Text className="text-lg font-semibold" style={{ color: Colors.default.textPrimary }}>
            Today's Gallery
          </Text>
          <TouchableOpacity onPress={() => setShowLeaderboard(true)}>
            <Text style={{ color: Colors.default.accent }}>🏆</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1">
          <View className="p-4">
            <Text className="text-sm mb-4" style={{ color: Colors.default.textSecondary }}>
              🌍 {challengeEntries.length} global submissions today
            </Text>
            
            {challengeEntries.map((entry) => (
              <View 
                key={entry.id}
                className="mb-4 p-4 rounded-xl"
                style={{ backgroundColor: Colors.default.cardBg }}
              >
                <View className="flex-row items-center mb-3">
                  <View className="w-8 h-8 rounded-full mr-3" style={{ backgroundColor: Colors.default.accent }} />
                  <Text className="font-medium" style={{ color: Colors.default.textPrimary }}>
                    {entry.username}
                  </Text>
                </View>
                
                <Text className="mb-3" style={{ color: Colors.default.textPrimary }}>
                  {entry.content}
                </Text>
                
                <View className="flex-row flex-wrap mb-2">
                  {entry.tags.map((tag) => (
                    <Text 
                      key={tag}
                      className="text-xs mr-2 mb-1"
                      style={{ color: Colors.default.accent }}
                    >
                      {tag}
                    </Text>
                  ))}
                </View>
                
                <View className="flex-row items-center justify-between">
                  <View className="flex-row">
                    {Object.entries(entry.reactions).map(([emoji, count]) => (
                      <TouchableOpacity 
                        key={emoji}
                        className="flex-row items-center mr-4"
                      >
                        <Text className="mr-1">{emoji}</Text>
                        <Text className="text-xs" style={{ color: Colors.default.textSecondary }}>
                          {count}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <TouchableOpacity>
                    <Ionicons name="chatbubble-outline" size={16} color={Colors.default.textSecondary} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  return (
    <View>
      {renderDailyChallengeBanner()}
      {renderChallengeModal()}
      {renderFeedModal()}
    </View>
  );
};

export default DailyChallenge;