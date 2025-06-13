import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../../../constants/Colors";

interface CreatePostBarProps {
  onPress: () => void;
  onCameraPress: () => void;
  onImagePress: () => void;
}

const CreatePostBar: React.FC<CreatePostBarProps> = ({
  onPress,
  onCameraPress,
  onImagePress
}) => {
  return (
    <TouchableOpacity 
      className="mx-4 my-3 p-4 rounded-2xl flex-row items-center"
      style={{ backgroundColor: Colors.default.cardBg }}
      onPress={onPress}
    >
      <View 
        className="w-10 h-10 rounded-full mr-3 items-center justify-center"
        style={{ backgroundColor: Colors.default.accent }}
      >
        <Text className="text-lg">😊</Text>
      </View>
      
      <View className="flex-1">
        <Text style={{ color: Colors.default.textSecondary }}>
          What's bringing you peace today?
        </Text>
      </View>
      
      <View className="flex-row space-x-3">
        <TouchableOpacity className="p-2" onPress={onCameraPress}>
          <Ionicons name="camera" size={20} color={Colors.default.accent} />
        </TouchableOpacity>
        <TouchableOpacity className="p-2" onPress={onImagePress}>
          <Ionicons name="images" size={20} color={Colors.default.accent} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default CreatePostBar;