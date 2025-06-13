import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../../constants/Colors";

interface LeaderboardEntry {
  id: string;
  username: string;
  rank: number;
  totalReactions: number;
  entryPreview: string;
  badges: string[];
  streak: number;
  region: string;
}

interface ChallengeLeaderboardProps {
  visible: boolean;
  onClose: () => void;
}

const ChallengeLeaderboard: React.FC<ChallengeLeaderboardProps> = ({ visible, onClose }) => {
  const [activeTab, setActiveTab] = useState<'global' | 'region' | 'picks'>('global');
  const [showBadgeDetails, setShowBadgeDetails] = useState(false);
  const [confettiAnim] = useState(new Animated.Value(0));

  // Mock leaderboard data
  const globalLeaderboard: LeaderboardEntry[] = [
    {
      id: '1',
      username: 'Sarah_M',
      rank: 1,
      totalReactions: 247,
      entryPreview: 'Watching the sunrise from my balcony...',
      badges: ['🥇', '🎖️', '🔥'],
      streak: 15,
      region: 'North America'
    },
    {
      id: '2', 
      username: 'Alex_K',
      rank: 2,
      totalReactions: 189,
      entryPreview: 'My dog surprised me with cuddles...',
      badges: ['🥈', '🎨'],
      streak: 8,
      region: 'Europe'
    },
    {
      id: '3',
      username: 'Maya_R', 
      rank: 3,
      totalReactions: 156,
      entryPreview: 'Found this quiet spot in the park...',
      badges: ['🥉', '🔍'],
      streak: 22,
      region: 'Asia'
    },
    {
      id: '4',
      username: 'Jordan_P',
      rank: 4,
      totalReactions: 134,
      entryPreview: 'Coffee shop moment of zen...',
      badges: ['🎖️'],
      streak: 5,
      region: 'Asia'
    },
    {
      id: '5',
      username: 'Emma_L',
      rank: 5, 
      totalReactions: 128,
      entryPreview: 'Garden meditation session...',
      badges: ['🔍', '🎨'],
      streak: 12,
      region: 'Europe'
    }
  ];

  const regionLeaderboard = globalLeaderboard.filter(entry => entry.region === 'Asia');
  
  const picksOfDay = globalLeaderboard.slice(1, 4);

  const badgeDescriptions: { [key: string]: string } = {
    '🥇': 'Daily Top 3 - Gold',
    '🥈': 'Daily Top 3 - Silver', 
    '🥉': 'Daily Top 3 - Bronze',
    '🎖️': 'Consistency Streak',
    '🔍': 'Hidden Gem',
    '🎨': 'Creativity Spark',
    '🔥': 'Most Reacted'
  };

  const getCurrentLeaderboard = () => {
    switch (activeTab) {
      case 'region':
        return regionLeaderboard;
      case 'picks':
        return picksOfDay;
      default:
        return globalLeaderboard;
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'region':
        return '🌎 My Region';
      case 'picks':
        return '🧠 Picks of the Day';
      default:
        return '🔝 Global';
    }
  };

  const renderTabButton = (tab: 'global' | 'region' | 'picks', icon: string, label: string) => (
    <TouchableOpacity
      onPress={() => setActiveTab(tab)}
      className={`flex-1 py-3 px-4 rounded-lg ${activeTab === tab ? 'opacity-100' : 'opacity-60'}`}
      style={{ 
        backgroundColor: activeTab === tab ? Colors.default.accent : Colors.default.cardBg 
      }}
    >
      <Text 
        className="text-center text-sm font-medium"
        style={{ color: activeTab === tab ? 'white' : Colors.default.textSecondary }}
      >
        {icon} {label}
      </Text>
    </TouchableOpacity>
  );

  const renderLeaderboardEntry = (entry: LeaderboardEntry, index: number) => (
    <View 
      key={entry.id}
      className="flex-row items-center p-4 mb-3 rounded-xl"
      style={{ backgroundColor: Colors.default.cardBg }}
    >
      {/* Rank */}
      <View className="w-8 h-8 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: entry.rank <= 3 ? Colors.default.accent : Colors.default.bg }}>
        <Text 
          className="font-bold text-sm"
          style={{ color: entry.rank <= 3 ? 'white' : Colors.default.textPrimary }}
        >
          {entry.rank}
        </Text>
      </View>

      {/* Avatar */}
      <View 
        className="w-10 h-10 rounded-full mr-3"
        style={{ backgroundColor: Colors.default.accent }}
      />

      {/* User Info */}
      <View className="flex-1">
        <View className="flex-row items-center mb-1">
          <Text className="font-semibold mr-2" style={{ color: Colors.default.textPrimary }}>
            {entry.username}
          </Text>
          <View className="flex-row">
            {entry.badges.map((badge, badgeIndex) => (
              <TouchableOpacity 
                key={badgeIndex}
                onPress={() => setShowBadgeDetails(true)}
                className="mr-1"
              >
                <Text className="text-sm">{badge}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <Text 
          className="text-xs mb-1"
          style={{ color: Colors.default.textSecondary }}
          numberOfLines={1}
        >
          {entry.entryPreview}
        </Text>
        
        <View className="flex-row items-center">
          <Text className="text-xs mr-3" style={{ color: Colors.default.textSecondary }}>
            🔥 {entry.totalReactions} reactions
          </Text>
          <Text className="text-xs" style={{ color: Colors.default.textSecondary }}>
            📅 {entry.streak} day streak
          </Text>
        </View>
      </View>

      {/* Trophy for top 3 */}
      {entry.rank <= 3 && (
        <View className="ml-2">
          <Text className="text-2xl">
            {entry.rank === 1 ? '🏆' : entry.rank === 2 ? '🥈' : '🥉'}
          </Text>
        </View>
      )}
    </View>
  );

  const renderBadgeModal = () => (
    <Modal 
      visible={showBadgeDetails} 
      transparent 
      animationType="fade"
      onRequestClose={() => setShowBadgeDetails(false)}
    >
      <View className="flex-1 items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
        <View 
          className="w-80 p-6 rounded-2xl"
          style={{ backgroundColor: Colors.default.cardBg }}
        >
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold" style={{ color: Colors.default.textPrimary }}>
              🏆 Badges & Trophies
            </Text>
            <TouchableOpacity onPress={() => setShowBadgeDetails(false)}>
              <Ionicons name="close" size={24} color={Colors.default.textSecondary} />
            </TouchableOpacity>
          </View>
          
          <ScrollView className="max-h-60">
            {Object.entries(badgeDescriptions).map(([badge, description]) => (
              <View key={badge} className="flex-row items-center py-3 border-b border-gray-700">
                <Text className="text-2xl mr-3">{badge}</Text>
                <View className="flex-1">
                  <Text className="font-medium" style={{ color: Colors.default.textPrimary }}>
                    {description}
                  </Text>
                  <Text className="text-xs mt-1" style={{ color: Colors.default.textSecondary }}>
                    {badge === '🥇' ? 'Top daily performer' :
                     badge === '🎖️' ? '7+ day participation streak' :
                     badge === '🔍' ? 'High quality, low view content' :
                     badge === '🎨' ? 'Unique and creative entries' :
                     'Achievement unlocked'}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <Modal visible={visible} animationType="slide">
      <View className="flex-1" style={{ backgroundColor: Colors.default.bg }}>
        {/* Header */}
        <View className="flex-row items-center justify-between p-4 border-b border-gray-700">
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="arrow-back" size={24} color={Colors.default.textPrimary} />
          </TouchableOpacity>
          <Text className="text-lg font-semibold" style={{ color: Colors.default.textPrimary }}>
            🏆 Leaderboard
          </Text>
          <TouchableOpacity onPress={() => setShowBadgeDetails(true)}>
            <Ionicons name="help-circle-outline" size={24} color={Colors.default.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View className="flex-row p-4 space-x-2">
          {renderTabButton('global', '🔝', 'Global')}
          {renderTabButton('region', '🌎', 'Region')}  
          {renderTabButton('picks', '🧠', 'Picks')}
        </View>

        {/* Leaderboard Content */}
        <ScrollView className="flex-1 px-4">
          <View className="mb-4">
            <Text className="text-xl font-bold mb-2" style={{ color: Colors.default.textPrimary }}>
              {getTabTitle()}
            </Text>
            <Text className="text-sm mb-4" style={{ color: Colors.default.textSecondary }}>
              {activeTab === 'picks' ? 
                'Curated selections from today\'s challenges' :
                `Top ${getCurrentLeaderboard().length} participants ${activeTab === 'region' ? 'in your region' : 'worldwide'}`
              }
            </Text>
          </View>

          {getCurrentLeaderboard().map((entry, index) => renderLeaderboardEntry(entry, index))}

          {/* Achievement Section */}
          <View className="mt-6 mb-8">
            <Text className="text-lg font-bold mb-3" style={{ color: Colors.default.textPrimary }}>
              🎯 Your Progress
            </Text>
            <View 
              className="p-4 rounded-xl"
              style={{ backgroundColor: Colors.default.cardBg }}
            >
              <View className="flex-row items-center justify-between mb-3">
                <Text style={{ color: Colors.default.textPrimary }}>Current Streak</Text>
                <Text className="font-bold" style={{ color: Colors.default.accent }}>3 days 🔥</Text>
              </View>
              <View className="flex-row items-center justify-between mb-3">
                <Text style={{ color: Colors.default.textPrimary }}>Total Reactions</Text>
                <Text className="font-bold" style={{ color: Colors.default.accent }}>47 ❤️</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text style={{ color: Colors.default.textPrimary }}>Badges Earned</Text>
                <View className="flex-row">
                  <Text className="mr-1">🎖️</Text>
                  <Text style={{ color: Colors.default.accent }}>2</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {renderBadgeModal()}
      </View>
    </Modal>
  );
};

export default ChallengeLeaderboard;