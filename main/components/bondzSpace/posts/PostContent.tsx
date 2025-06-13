import React from "react";
import { View, Text } from "react-native";
import { Colors } from "../../../constants/Colors";

interface PostContentProps {
  content: string;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
  return (
    <View className="px-4 mb-3">
      <Text style={{ color: Colors.default.textPrimary }}>{content}</Text>
    </View>
  );
};

export default PostContent;
