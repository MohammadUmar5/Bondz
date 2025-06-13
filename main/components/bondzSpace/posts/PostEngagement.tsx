import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../../constants/Colors";

interface PostEngagementProps {
  likesCount: number;
  commentsCount: number;
  onViewComments: () => void;
}

const PostEngagement: React.FC<PostEngagementProps> = ({
  likesCount,
  commentsCount,
  onViewComments,
}) => {
  return (
    <View>
      {/* Engagement Summary */}
      {likesCount > 0 && (
        <TouchableOpacity className="px-4 mt-2">
          <Text style={{ color: Colors.default.textSecondary }}>
            Liked by{" "}
            <Text
              style={{ color: Colors.default.textPrimary, fontWeight: "bold" }}
            >
              jenny_peace
            </Text>{" "}
            and{" "}
            <Text
              style={{ color: Colors.default.textPrimary, fontWeight: "bold" }}
            >
              {likesCount - 1} others
            </Text>
          </Text>
        </TouchableOpacity>
      )}

      {/* View Comments */}
      {commentsCount > 0 && (
        <TouchableOpacity className="px-4 mt-1" onPress={onViewComments}>
          <Text style={{ color: Colors.default.textSecondary }}>
            View all {commentsCount} comments
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PostEngagement;
