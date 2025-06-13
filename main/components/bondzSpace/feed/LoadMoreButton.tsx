import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Colors } from "../../../constants/Colors";

interface LoadMoreButtonProps {
  onPress: () => void;
  isLoading?: boolean;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onPress, isLoading = false }) => {
  return (
    <TouchableOpacity 
      className="mx-4 my-6 p-4 rounded-2xl items-center"
      style={{ backgroundColor: Colors.default.cardBg }}
      onPress={onPress}
      disabled={isLoading}
    >
      <Text style={{ color: Colors.default.textSecondary }}>
        {isLoading ? '⌛ Loading...' : '🔄 Load more peaceful moments'}
      </Text>
    </TouchableOpacity>
  );
};

export default LoadMoreButton;