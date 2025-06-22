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
      {/* Remove the Challenge Badge section completely */}

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

      {/* Separator - same as SocialPost */}
      <View className="h-px mx-3 mt-6" style={{ backgroundColor: Colors.default.textSecondary, opacity: 0.2 }} />
    </View>
  );
}