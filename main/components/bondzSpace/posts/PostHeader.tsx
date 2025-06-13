import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../../../constants/Colors";

interface PostUser {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  isVerified: boolean;
}

interface PostHeaderProps {
  user: PostUser;
  timestamp: string;
  location?: string;
  onOptionsPress: () => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({ user, timestamp, location, onOptionsPress }) => {
  return (
    <View className="flex-row items-center justify-between px-4 mb-3">
      <View className="flex-row items-center flex-1">
        <View 
          className="w-10 h-10 rounded-full mr-3 items-center justify-center"
          style={{ backgroundColor: Colors.default.accent }}
        >
          <Text className="text-lg">{user.avatar}</Text>
        </View>
        
        <View className="flex-1">
          <View className="flex-row items-center">
            <Text className="font-semibold mr-1" style={{ color: Colors.default.textPrimary }}>
              {user.displayName}
            </Text>
            {user.isVerified && (
              <Ionicons name="checkmark-circle" size={16} color={Colors.default.accent} />
            )}
          </View>
          
          <View className="flex-row items-center">
            <Text className="text-xs mr-1" style={{ color: Colors.default.textSecondary }}>
              @{user.username}
            </Text>
            <Text className="text-xs mr-1" style={{ color: Colors.default.textSecondary }}>•</Text>
            <Text className="text-xs mr-1" style={{ color: Colors.default.textSecondary }}>
              {timestamp}
            </Text>
            {location && (
              <>
                <Text className="text-xs mr-1" style={{ color: Colors.default.textSecondary }}>•</Text>
                <Ionicons name="location-outline" size={12} color={Colors.default.textSecondary} />
                <Text className="text-xs ml-1" style={{ color: Colors.default.textSecondary }}>
                  {location}
                </Text>
              </>
            )}
          </View>
        </View>
      </View>
      
      <TouchableOpacity onPress={onOptionsPress}>
        <Ionicons name="ellipsis-horizontal" size={20} color={Colors.default.textSecondary} />
      </TouchableOpacity>
    </View>
  );
};

export default PostHeader;