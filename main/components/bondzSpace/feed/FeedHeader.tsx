import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../../../constants/Colors";

interface FeedHeaderProps {
  onSearchPress: () => void;
  onNotificationsPress: () => void;
  onMessagesPress: () => void;
}

const FeedHeader: React.FC<FeedHeaderProps> = ({
  onSearchPress,
  onNotificationsPress,
  onMessagesPress
}) => {
  return (
    <View 
      className="flex-row items-center justify-between px-4 py-3 border-b border-opacity-20" 
      style={{ borderColor: Colors.default.textSecondary, paddingTop: 15 }}
    >
      <View className="flex-row items-center">
        <Text className="text-2xl font-bold mr-2" style={{ color: Colors.default.accent }}>
          Echoes
        </Text>
        <Text className="text-sm" style={{ color: Colors.default.textSecondary }}>✨</Text>
      </View>
      
      <View className="flex-row items-center space-x-4">
        <TouchableOpacity className="p-2" onPress={onSearchPress}>
          <Ionicons name="search" size={24} color={Colors.default.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity className="p-2" onPress={onNotificationsPress}>
          <Ionicons name="notifications-outline" size={24} color={Colors.default.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity className="p-2" onPress={onMessagesPress}>
          <Ionicons name="chatbubbles-outline" size={24} color={Colors.default.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FeedHeader;