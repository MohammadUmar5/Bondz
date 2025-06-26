import React from "react";
import { View, TouchableOpacity, Animated, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/Colors";

interface PostActionsProps {
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  onLike: () => void;
  onComments: () => void;
  likeAnimation: Animated.Value;
}

const PostActions: React.FC<PostActionsProps> = ({
  isLiked,
  likesCount,
  commentsCount,
  sharesCount,
  onLike,
  onComments,
  likeAnimation,
}) => {
  return (
    <View className="flex-row items-center justify-between px-4 mt-3">
      <View className="flex-row items-center space-x-4">
        <TouchableOpacity onPress={onLike} className="flex-row items-center">
          <Animated.View style={{ transform: [{ scale: likeAnimation }] }}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={24}
              color={isLiked ? "#ff3040" : Colors.default.textPrimary}
            />
          </Animated.View>
          <Text
            className="ml-1 mr-2 font-medium"
            style={{ color: Colors.default.textPrimary }}
          >
            {likesCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onComments}
          className="flex-row items-center"
        >
          <Ionicons
            name="chatbubble-outline"
            size={22}
            color={Colors.default.textPrimary}
          />
          <Text
            className="ml-1 mr-2 font-medium"
            style={{ color: Colors.default.textPrimary }}
          >
            {commentsCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center">
          <Ionicons
            name="arrow-redo-outline"
            size={22}
            color={Colors.default.textPrimary}
          />
          <Text
            className="ml-1 font-medium"
            style={{ color: Colors.default.textPrimary }}
          >
            {sharesCount}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Ionicons
          name="bookmark-outline"
          size={22}
          color={Colors.default.textPrimary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PostActions;
