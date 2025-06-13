import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Share
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../../../constants/Colors';
import { ChallengeSubmission } from './ChallengeSubmissionPage';
import PostHeader from '../../posts/PostHeader';
import PostContent from '../../posts/PostContent';
import PostImage from '../../posts/PostImage';
import PostActions from '../../posts/PostActions';
import PostEngagement from '../../posts/PostEngagement';

interface Props {
  submission: ChallengeSubmission;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

export function ChallengePost({ submission, onLike, onComment, onShare }: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(submission.likes);
  
  const likeAnimation = useRef(new Animated.Value(1)).current;
  const heartAnimation = useRef(new Animated.Value(0)).current;

  const handleLike = () => {
    // Animate the like button
    Animated.sequence([
      Animated.timing(likeAnimation, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(likeAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Show floating heart if liking
    if (!isLiked) {
      Animated.sequence([
        Animated.timing(heartAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(heartAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }

    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.();
  };

  const handleDoubleTab = () => {
    if (!isLiked) {
      handleLike();
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this ${submission.challengeTitle} moment: ${submission.text}`,
      });
      onShare?.();
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleOptionsPress = () => {
    // Handle options press
  };

  const handleViewComments = () => {
    onComment?.();
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  // Convert submission to post format for components
  const postUser = {
    id: submission.author.username,
    username: submission.author.username.replace('@', ''),
    displayName: submission.author.name,
    avatar: '🌟', // Using emoji like regular posts
    isVerified: false
  };

  return (
    <View className="mb-6">
      {/* Challenge Badge - positioned above the post */}
      <View className="px-4 mb-2">
        <LinearGradient
          colors={['#FF6B9D', '#8B5CF6']} // Default gradient, could be dynamic
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="px-3 py-1 rounded-full flex-row items-center self-start"
        >
          <Text style={{ fontSize: 12, marginRight: 4 }}>{submission.challengeIcon}</Text>
          <Text className="text-white text-xs font-semibold">
            {submission.challengeTitle}
          </Text>
        </LinearGradient>
      </View>

      {/* Use the same components as SocialPost */}
      <PostHeader 
        user={postUser}
        timestamp={formatTimeAgo(submission.timestamp)}
        onOptionsPress={handleOptionsPress}
      />

      <PostContent content={submission.text} />

      <PostImage 
        image={submission.image}
        onDoubleTab={handleDoubleTab}
        heartAnimation={heartAnimation}
      />

      <PostActions 
        isLiked={isLiked}
        likesCount={likesCount}
        commentsCount={submission.comments}
        sharesCount={submission.shares}
        onLike={handleLike}
        onComments={handleViewComments}
        likeAnimation={likeAnimation}
      />

      <PostEngagement 
        likesCount={likesCount}
        commentsCount={submission.comments}
        onViewComments={handleViewComments}
      />

      {/* Separator - same as SocialPost */}
      <View className="h-px mx-4 mt-4" style={{ backgroundColor: Colors.default.textSecondary, opacity: 0.1 }} />
    </View>
  );
}