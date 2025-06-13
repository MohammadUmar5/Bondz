import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/Colors";
import CommentItem from "./CommentItem";
import { mockComments, Comment } from "../../../data/mockComments";

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

interface CommentsModalProps {
  visible: boolean;
  post: Post;
  onClose: () => void;
}

const CommentsModal: React.FC<CommentsModalProps> = ({
  visible,
  post,
  onClose,
}) => {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  // Use mock comments data
  const [comments] = useState<Comment[]>(mockComments);

  const handleSendComment = () => {
    if (newComment.trim()) {
      // Add comment logic here
      setNewComment("");
      setReplyingTo(null);
    }
  };

  const handleReply = (commentId: string) => {
    setReplyingTo(commentId);
  };

  const getPlaceholderText = () => {
    if (replyingTo) {
      const comment = comments.find((c) => c.id === replyingTo);
      return `Reply to ${comment?.user.displayName ?? ""}...`;
    }
    return "Add a peaceful comment...";
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      {/* Header */}

      <View className="flex-1" style={{ backgroundColor: Colors.default.bg }}>
        <View
          className="flex-row items-center justify-between px-4 py-3 border-b border-opacity-20"
          style={{ borderColor: Colors.default.textSecondary, paddingTop: 50 }}
        >
          <TouchableOpacity onPress={onClose}>
            <Ionicons
              name="close"
              size={24}
              color={Colors.default.textPrimary}
            />
          </TouchableOpacity>
          <Text
            className="text-lg font-semibold"
            style={{ color: Colors.default.textPrimary }}
          >
            Comments
          </Text>
          <View className="w-6" /> 
        </View>
        {/* Post Preview */}
        <View
          className="px-4 py-3 border-b border-opacity-10"
          style={{ borderColor: Colors.default.textSecondary }}
        >
          <View className="flex-row items-start">
            <View
              className="w-8 h-8 rounded-full mr-3 items-center justify-center"
              style={{ backgroundColor: Colors.default.accent }}
            >
              <Text className="text-sm">
                {typeof post.user.avatar === "string" ? post.user.avatar : "🙂"}
              </Text>
            </View>

            <View className="flex-1">
              <View className="flex-row items-center">
                <Text
                  className="font-semibold text-sm mr-1"
                  style={{ color: Colors.default.textPrimary }}
                >
                  {post.user.displayName}
                </Text>
                {post.user.isVerified && (
                  <Ionicons
                    name="checkmark-circle"
                    size={14}
                    color={Colors.default.accent}
                  />
                )}
              </View>

              <Text
                className="text-sm mt-1"
                style={{ color: Colors.default.textPrimary }}
                numberOfLines={2}
              >
                {post.content}
              </Text>
            </View>
          </View>
        </View>
        {/* Comments List */}
        <ScrollView
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
        >
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onReply={handleReply}
              />
            ))
          ) : (
            <View className="items-center justify-center py-12">
              <Text className="text-4xl mb-2">💬</Text>
              <Text style={{ color: Colors.default.textSecondary }}>
                No comments yet
              </Text>
              <Text
                className="text-sm mt-1"
                style={{ color: Colors.default.textSecondary }}
              >
                Be the first to share your thoughts
              </Text>
            </View>
          )}
        </ScrollView>
        {/* Reply indicator */}
        {replyingTo && (
          <View
            className="px-4 py-2 border-t border-opacity-10"
            style={{ borderColor: Colors.default.textSecondary }}
          >
            <View className="flex-row items-center justify-between">
              <Text
                className="text-sm"
                style={{ color: Colors.default.textSecondary }}
              >
                Replying to{" "}
                {comments.find((c) => c.id === replyingTo)?.user.displayName ??
                  "..."}
              </Text>
              <TouchableOpacity onPress={() => setReplyingTo(null)}>
                <Ionicons
                  name="close"
                  size={16}
                  color={Colors.default.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {/* Comment Input */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="border-t border-opacity-20"
          style={{ borderColor: Colors.default.textSecondary }}
        >
          <View className="flex-row items-center px-4 py-3">
            <View
              className="w-8 h-8 rounded-full mr-3 items-center justify-center"
              style={{ backgroundColor: Colors.default.accent }}
            >
              <Text className="text-sm">😊</Text>
            </View>

            <View className="flex-1 flex-row items-center">
              <TextInput
                value={newComment}
                onChangeText={setNewComment}
                placeholder={getPlaceholderText()}
                placeholderTextColor={Colors.default.textSecondary}
                multiline
                className="flex-1 py-2 px-3 rounded-2xl text-base"
                style={{
                  backgroundColor: Colors.default.cardBg,
                  color: Colors.default.textPrimary,
                  maxHeight: 100,
                }}
              />

              <TouchableOpacity
                onPress={handleSendComment}
                className="ml-2 p-2"
                disabled={!newComment.trim()}
              >
                <Ionicons
                  name="send"
                  size={20}
                  color={
                    newComment.trim()
                      ? Colors.default.accent
                      : Colors.default.textSecondary
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default CommentsModal;
