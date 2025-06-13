import React, { useState, useRef } from 'react';
import { View, Animated } from 'react-native';
import { Colors } from "../../../constants/Colors";
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostImage from './PostImage';
import PostActions from './PostActions';
import PostEngagement from './PostEngagement';
import CommentsModal from '../comments/CommentsModal';

interface PostUser {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  isVerified: boolean;
}

interface Post {
  id: string;
  user: PostUser;
  content: string;
  image?: string | null;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  location?: string;
}

interface SocialPostProps {
  post: Post;
}

const SocialPost: React.FC<SocialPostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  
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
  };

  const handleDoubleTab = () => {
    if (!isLiked) {
      handleLike();
    }
  };

  const handleOptionsPress = () => {
    setShowOptions(true);
  };

  const handleViewComments = () => {
    setShowComments(true);
  };

  const handleCloseComments = () => {
    setShowComments(false);
  };

  return (
    <View className="mb-6">
      <PostHeader 
        user={post.user}
        timestamp={post.timestamp}
        location={post.location}
        onOptionsPress={handleOptionsPress}
      />

      <PostContent content={post.content} />

      <PostImage 
        image={post.image}
        onDoubleTab={handleDoubleTab}
        heartAnimation={heartAnimation}
      />

      <PostActions 
        isLiked={isLiked}
        likesCount={likesCount}
        commentsCount={post.comments}
        sharesCount={post.shares}
        onLike={handleLike}
        onComments={handleViewComments}
        likeAnimation={likeAnimation}
      />

      <PostEngagement 
        likesCount={likesCount}
        commentsCount={post.comments}
        onViewComments={handleViewComments}
      />

      <CommentsModal 
        visible={showComments}
        post={post}
        onClose={handleCloseComments}
      />

      {/* Separator */}
      <View className="h-px mx-4 mt-4" style={{ backgroundColor: Colors.default.textSecondary, opacity: 0.1 }} />
    </View>
  );
};

export default SocialPost;