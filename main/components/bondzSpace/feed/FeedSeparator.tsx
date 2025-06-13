import React from "react";
import { View } from "react-native";
import { Colors } from "../../../constants/Colors";

interface FeedSeparatorProps {
  className?: string;
  opacity?: number;
}

const FeedSeparator: React.FC<FeedSeparatorProps> = ({
  className = "h-px mx-4 my-4",
  opacity = 0.2,
}) => {
  return (
    <View
      className={className}
      style={{ backgroundColor: Colors.default.textSecondary, opacity }}
    />
  );
};

export default FeedSeparator;
