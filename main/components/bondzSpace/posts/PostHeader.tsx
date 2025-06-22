import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
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

const PostHeader: React.FC<PostHeaderProps> = ({
  user,
  timestamp,
  location,
  onOptionsPress,
}) => {
  return (
    <View className="flex-row items-center justify-between px-4 mb-3">
      <View className="flex-row items-center flex-1">
        <Image
          source={{ uri: user.avatar }}
          style={{ 
            width: 40, 
            height: 40, 
            borderRadius: 20, 
            marginRight: 12,
            backgroundColor: Colors.default.cardBg 
          }}
          contentFit="cover"
          placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
          transition={200}
        />

        <View className="flex-1">
          <View className="flex-row items-center">
            <Text
              className="font-semibold mr-1"
              style={{ color: Colors.default.textPrimary }}
            >
              {user.displayName}
            </Text>
            {user.isVerified && (
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={Colors.default.accent}
              />
            )}
          </View>

          <View className="flex-row items-center">
            <Text
              className="text-xs mr-1"
              style={{ color: Colors.default.textSecondary }}
            >
              @{user.username}
            </Text>
            <Text
              className="text-xs mr-1"
              style={{ color: Colors.default.textSecondary }}
            >
              •
            </Text>
            <Text
              className="text-xs mr-1"
              style={{ color: Colors.default.textSecondary }}
            >
              {timestamp}
            </Text>
            {location && (
              <>
                <Text
                  className="text-xs mr-1"
                  style={{ color: Colors.default.textSecondary }}
                >
                  •
                </Text>
                <Ionicons
                  name="location-outline"
                  size={12}
                  color={Colors.default.textSecondary}
                />
                <Text
                  className="text-xs ml-1"
                  style={{ color: Colors.default.textSecondary }}
                >
                  {location}
                </Text>
              </>
            )}
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={onOptionsPress}>
        <Ionicons
          name="ellipsis-horizontal"
          size={20}
          color={Colors.default.textSecondary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PostHeader;