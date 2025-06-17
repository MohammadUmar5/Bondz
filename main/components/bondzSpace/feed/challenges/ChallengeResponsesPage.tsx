import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../../constants/Colors';
import { ChallengeCard } from '../../../../types/challenge';
import { ChallengeSubmission } from './ChallengeSubmissionPage';
import { ChallengePost } from './ChallengePost'; // Import ChallengePost

const { width } = Dimensions.get('window');

interface Props {
  challenge: ChallengeCard;
  userResponses: ChallengeSubmission[];
  onCreatePost: () => void;
  title?: string;
  onlyUser?: boolean;
  onClose: () => void;
  onJoinChallenge?: () => void;
}

type FilterType = 'all' | 'individual' | 'team';

// Mock data - in real app, this would come from API/database
const getMockResponses = (challengeId: number, userSubmission?: ChallengeSubmission): ChallengeSubmission[] => {
  const baseResponses = [
    {
      id: '1',
      challengeId: challengeId,
      challengeTitle: 'Finding Inner Peace',
      challengeIcon: '🧘',
      text: 'Found the most serene spot by the lake this morning. The gentle ripples and bird songs created perfect harmony. Feeling so grateful for these peaceful moments that restore my soul.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      author: {
        name: 'Sarah Chen',
        avatar: '🌸',
        username: '@sarahzen'
      },
      likes: 24,
      comments: 8,
      shares: 3,
      participationType: 'individual' as const
    },
    {
      id: '2',
      challengeId: challengeId,
      challengeTitle: 'Finding Inner Peace',
      challengeIcon: '🧘',
      text: 'Our family meditation session in the garden was incredible! Even our 5-year-old managed 10 minutes of quiet breathing. We ended with gratitude sharing - such a beautiful way to connect.',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      author: {
        name: 'The Johnson Family',
        avatar: '👨‍👩‍👧‍👦',
        username: '@johnsonpeace'
      },
      likes: 45,
      comments: 12,
      shares: 7,
      participationType: 'team' as const
    },
    {
      id: '3',
      challengeId: challengeId,
      challengeTitle: 'Finding Inner Peace',
      challengeIcon: '🧘',
      text: 'Discovered that washing dishes mindfully can be a form of meditation. Focusing on the warm water, soap bubbles, and the rhythm of cleaning brought unexpected calm to my evening routine.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      author: {
        name: 'Mike Rodriguez',
        avatar: '🎭',
        username: '@mindfulmike'
      },
      likes: 18,
      comments: 5,
      shares: 2,
      participationType: 'individual' as const
    },
    {
      id: '4',
      challengeId: challengeId,
      challengeTitle: 'Finding Inner Peace',
      challengeIcon: '🧘',
      text: 'Our book club turned into an impromptu mindfulness circle today. We shared our favorite calming quotes and did a group breathing exercise. Amazing how literature can lead to inner peace!',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      author: {
        name: 'Bookworms United',
        avatar: '📚',
        username: '@bookwormpeace'
      },
      likes: 31,
      comments: 15,
      shares: 4,
      participationType: 'team' as const
    }
  ];

  // Add user submission if provided
  if (userSubmission) {
    return [userSubmission, ...baseResponses];
  }

  return baseResponses;
};

export function ChallengeResponsesPage({ 
  challenge, 
  userResponses, 
  onCreatePost, 
  title = "Community Responses", 
  onlyUser, 
  onClose,
  onJoinChallenge
}: Props) {
  const [responses, setResponses] = useState<ChallengeSubmission[]>([]);
  const [filteredResponses, setFilteredResponses] = useState<ChallengeSubmission[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [refreshing, setRefreshing] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadResponses();
  }, [challenge.id, userResponses]);

  useEffect(() => {
    filterResponses();
  }, [responses, activeFilter]);

  const loadResponses = () => {
    if (onlyUser) {
      // For "My Responses" page, only show user's responses
      setResponses(userResponses);
    } else {
      // For community responses, get mock data and add user responses
      const mockResponses = getMockResponses(challenge.id);
      const allResponses = [...userResponses, ...mockResponses];
      setResponses(allResponses);
    }
  };

  const filterResponses = () => {
    if (activeFilter === 'all') {
      setFilteredResponses(responses);
    } else {
      setFilteredResponses(responses.filter(response => response.participationType === activeFilter));
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadResponses();
      setRefreshing(false);
    }, 1000);
  };

  const handleLike = (responseId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(responseId)) {
        newSet.delete(responseId);
      } else {
        newSet.add(responseId);
      }
      return newSet;
    });

    setResponses(prev => prev.map(response => {
      if (response.id === responseId) {
        const isLiked = likedPosts.has(responseId);
        return {
          ...response,
          likes: isLiked ? response.likes - 1 : response.likes + 1
        };
      }
      return response;
    }));
  };

  const handleComment = (responseId: string) => {
    // Handle comment logic
  };

  const handleShare = (responseId: string) => {
    // Handle share logic
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  const getFilterCount = (filter: FilterType) => {
    if (filter === 'all') return responses.length;
    return responses.filter(response => response.participationType === filter).length;
  };

  const renderFilterButton = (filter: FilterType, label: string, icon: string) => {
    const isActive = activeFilter === filter;
    const count = getFilterCount(filter);
    
    return (
      <TouchableOpacity
        onPress={() => setActiveFilter(filter)}
        className="flex-row items-center px-4 py-2 rounded-full mr-3"
        style={{
          backgroundColor: isActive ? challenge.gradient[0] : Colors.default.cardBg,
        }}
      >
        <Ionicons 
          name={icon as any} 
          size={16} 
          color={isActive ? 'white' : Colors.default.textSecondary}
          style={{ marginRight: 4 }}
        />
        <Text 
          className="font-medium"
          style={{ 
            color: isActive ? 'white' : Colors.default.textSecondary 
          }}
        >
          {label} ({count})
        </Text>
      </TouchableOpacity>
    );
  };

  // Check if user has participated
  const userHasParticipated = userResponses.length > 0;

  return (
    <View className="flex-1" style={{ backgroundColor: Colors.default.bg }}>
      {/* Header */}
      <View className=" py-3 pt-4">
        <View className="flex-row items-center justify-between mb-2">
          <TouchableOpacity onPress={onClose} className="p-2">
            <Ionicons name="arrow-back" size={24} color={Colors.default.textPrimary} />
          </TouchableOpacity>
          <Text className="text-2xl font-semibold" style={{ color: Colors.default.textPrimary }}>
            {title}
          </Text>
          <TouchableOpacity
            onPress={onCreatePost}
            className="p-2"
          >
            <Ionicons name="add" size={24} color={Colors.default.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Challenge Header */}
        <LinearGradient
          colors={[challenge.gradient[0], challenge.gradient[1]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-2xl p-4 mb-4"
        >
          <View className="flex-row items-center">
            <View 
              className="w-12 h-12 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <Text style={{ fontSize: 24 }}>{challenge.image}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white text-lg font-bold">{challenge.title}</Text>
              <Text className="text-white/90 text-sm">{challenge.subtitle}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Filters */}
        {!onlyUser && (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {renderFilterButton('all', 'All', 'grid')}
            {renderFilterButton('individual', 'Individual', 'person')}
            {renderFilterButton('team', 'Team', 'people')}
          </ScrollView>
        )}
      </View>

      {/* Responses List - Use ChallengePost components */}
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={challenge.gradient[0]}
            colors={[challenge.gradient[0]]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {(onlyUser ? userResponses : filteredResponses).length > 0 ? (
          <View className="pb-8">
            {(onlyUser ? userResponses : filteredResponses).map((response) => (
              <ChallengePost
                key={response.id}
                submission={response}
                onLike={() => handleLike(response.id)}
                onComment={() => handleComment(response.id)}
                onShare={() => handleShare(response.id)}
              />
            ))}
          </View>
        ) : (
          <View className="flex-1 items-center justify-center py-20">
            <View 
              className="w-20 h-20 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: Colors.default.textSecondary + '20' }}
            >
              <Ionicons 
                name="chatbubbles-outline" 
                size={40} 
                color={Colors.default.textSecondary}
              />
            </View>
            <Text 
              className="text-lg font-semibold mb-2"
              style={{ color: Colors.default.textPrimary }}
            >
              {onlyUser ? "No responses yet" : "No responses yet"}
            </Text>
            <Text 
              className="text-sm text-center mx-8"
              style={{ color: Colors.default.textSecondary }}
            >
              {onlyUser 
                ? "You haven't shared any responses for this challenge yet!"
                : activeFilter === 'all' 
                  ? 'Be the first to share your experience with this challenge!'
                  : `No ${activeFilter} responses yet. Try a different filter or be the first to share!`
              }
            </Text>
            {!userHasParticipated && onJoinChallenge && (
              <TouchableOpacity
                onPress={onJoinChallenge}
                className="mt-6 px-6 py-3 rounded-full"
                style={{ backgroundColor: challenge.gradient[0] }}
              >
                <Text className="text-white font-semibold">Join Challenge</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}