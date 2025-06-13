import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/Colors";

interface CommentUser {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  isVerified: boolean;
}

interface Comment {
  id: string;
  user: CommentUser;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

interface CommentItemProps {
  comment: Comment;
  isReply?: boolean;
  onReply?: (commentId: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  isReply = false,
  onReply,
}) => {
  const [isLiked, setIsLiked] = useState(comment.isLiked);
  const [likesCount, setLikesCount] = useState(comment.likes);
  const [showReplies, setShowReplies] = useState(false);

  const likeAnimation = useRef(new Animated.Value(1)).current;

  const handleLike = () => {
    // Animate the like button
    Animated.sequence([
      Animated.timing(likeAnimation, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(likeAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleReply = () => {
    if (onReply) {
      onReply(comment.id);
    }
  };

  return (
    <View className={`${isReply ? "ml-12" : ""}`}>
      <View className="flex-row py-3">
        {/* Avatar */}
        <View
          className="w-8 h-8 rounded-full mr-3 items-center justify-center"
          style={{ backgroundColor: Colors.default.accent }}
        >
          <Text className="text-sm">{comment.user.avatar}</Text>
        </View>

        {/* Comment Content */}
        <View className="flex-1">
          {/* User Info & Content */}
          <View
            className="px-3 py-2 rounded-2xl"
            style={{ backgroundColor: Colors.default.cardBg }}
          >
            <View className="flex-row items-center mb-1">
              <Text
                className="font-semibold text-sm mr-1"
                style={{ color: Colors.default.textPrimary }}
              >
                {comment.user.displayName}
              </Text>
              {comment.user.isVerified && (
                <Ionicons
                  name="checkmark-circle"
                  size={12}
                  color={Colors.default.accent}
                />
              )}
            </View>

            <Text style={{ color: Colors.default.textPrimary }}>
              {comment.content}
            </Text>
          </View>

          {/* Comment Actions */}
          <View className="flex-row items-center mt-1 ml-3">
            <Text
              className="text-xs mr-4"
              style={{ color: Colors.default.textSecondary }}
            >
              {comment.timestamp}
            </Text>

            <TouchableOpacity
              onPress={handleLike}
              className="flex-row items-center mr-4"
            >
              <Animated.View style={{ transform: [{ scale: likeAnimation }] }}>
                <Ionicons
                  name={isLiked ? "heart" : "heart-outline"}
                  size={14}
                  color={isLiked ? "#ff3040" : Colors.default.textSecondary}
                />
              </Animated.View>
              {likesCount > 0 && (
                <Text
                  className="text-xs ml-1"
                  style={{ color: Colors.default.textSecondary }}
                >
                  {likesCount}
                </Text>
              )}
            </TouchableOpacity>

            {!isReply && (
              <TouchableOpacity onPress={handleReply}>
                <Text
                  className="text-xs font-medium"
                  style={{ color: Colors.default.textSecondary }}
                >
                  Reply
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Replies */}
          {!isReply && comment.replies && comment.replies.length > 0 && (
            <View className="mt-2">
              {!showReplies ? (
                <TouchableOpacity onPress={() => setShowReplies(true)}>
                  <Text
                    className="text-xs font-medium ml-3"
                    style={{ color: Colors.default.accent }}
                  >
                    ── View {comment.replies.length}{" "}
                    {comment.replies.length === 1 ? "reply" : "replies"}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View>
                  <TouchableOpacity onPress={() => setShowReplies(false)}>
                    <Text
                      className="text-xs font-medium ml-3 mb-2"
                      style={{ color: Colors.default.accent }}
                    >
                      ── Hide replies
                    </Text>
                  </TouchableOpacity>

                  {comment.replies.map((reply) => (
                    <CommentItem
                      key={reply.id}
                      comment={reply}
                      isReply={true}
                    />
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default CommentItem;
