import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Image } from 'react-native';
import { Colors } from "../../../constants/Colors";

interface PostImageProps {
  image?: string | null;
  onDoubleTab: () => void;
  heartAnimation: Animated.Value;
}

const PostImage: React.FC<PostImageProps> = ({ image, onDoubleTab, heartAnimation }) => {
  if (!image) return null;
  
  return (
    <View className="px-4">
      <TouchableOpacity
        onPress={onDoubleTab}
        activeOpacity={0.9}
        className="relative"
      >
        <View 
          className="w-full h-64 rounded-xl mt-3 overflow-hidden"
          style={{ backgroundColor: Colors.default.cardBg }}
        >
          <Image
            source={{ uri: image }}
            className="w-full h-full"
            style={{ 
              resizeMode: 'cover',
              borderRadius: 12
            }}
            onError={() => {
              console.log('Failed to load image:', image);
            }}
          />
          
          {/* Floating heart animation */}
          <Animated.View
            className="absolute top-1/2 left-1/2"
            style={{
              opacity: heartAnimation,
              marginLeft: -20,
              marginTop: -20,
              transform: [
                {
                  scale: heartAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1.5],
                  }),
                },
                {
                  translateY: heartAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -30],
                  }),
                },
              ],
            }}
          >
            <Text className="text-4xl">❤️</Text>
          </Animated.View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PostImage;