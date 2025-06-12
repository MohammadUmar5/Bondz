import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'audio' | 'file';
  uri: string;
  name?: string;
  duration?: string;
}

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  mood: string;
  media: MediaItem[];
  author: string;
}

interface JournalEntryProps {
  entry: JournalEntry;
  onMediaPress: (media: MediaItem) => void;
}

export const JournalEntryComponent: React.FC<JournalEntryProps> = ({ entry, onMediaPress }) => {
  const renderMediaItem = (item: MediaItem) => {
    switch (item.type) {
      case 'image':
        return (
          <TouchableOpacity 
            key={item.id}
            onPress={() => onMediaPress(item)}
            className="mr-3"
          >
            <Image 
              source={{ uri: item.uri }} 
              className="w-20 h-20 rounded-lg"
              style={{ backgroundColor: Colors.default.cardBg }}
            />
          </TouchableOpacity>
        );
      case 'video':
        return (
          <TouchableOpacity 
            key={item.id}
            onPress={() => onMediaPress(item)}
            className="mr-3 relative"
          >
            <Image 
              source={{ uri: item.uri }} 
              className="w-20 h-20 rounded-lg"
              style={{ backgroundColor: Colors.default.cardBg }}
            />
            <View className="absolute inset-0 items-center justify-center">
              <Ionicons name="play-circle" size={24} color="#FFFFFF" />
            </View>
            {item.duration && (
              <Text className="absolute bottom-1 right-1 text-xs text-white bg-black bg-opacity-50 px-1 rounded">
                {item.duration}
              </Text>
            )}
          </TouchableOpacity>
        );
      case 'audio':
        return (
          <TouchableOpacity 
            key={item.id}
            className="mr-3 bg-gray-100 w-20 h-20 rounded-lg items-center justify-center"
          >
            <Ionicons name="musical-notes" size={24} color={Colors.default.textSecondary} />
            <Text className="text-xs text-gray-600 mt-1">{item.duration}</Text>
          </TouchableOpacity>
        );
      case 'file':
        return (
          <TouchableOpacity 
            key={item.id}
            className="mr-3 bg-gray-100 w-20 h-20 rounded-lg items-center justify-center p-2"
          >
            <Ionicons name="document" size={20} color={Colors.default.textSecondary} />
            <Text className="text-xs text-gray-600 text-center mt-1" numberOfLines={2}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  return (
    <View className="rounded-2xl p-4 mb-4 shadow-sm" style={{ backgroundColor: Colors.default.bg }}>
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text
            className="text-lg font-semibold"
            style={{ color: Colors.default.textPrimary }}
          >
            {entry.title}
          </Text>
          <Text className="text-xs" style={{ color: Colors.default.textSecondary }}>
            {entry.timestamp} • by {entry.author}
          </Text>
        </View>
        <View className="bg-transparent bg-opacity-20 rounded-full px-3 py-1">
          <Text className="text-xs" style={{ color: '#FFF' }}>{entry.mood}</Text>
        </View>
      </View>
      
      <Text className="text-base mb-4 leading-relaxed" style={{ color: Colors.default.textPrimary }}>
        {entry.content}
      </Text>
      
      {entry.media.length > 0 && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="mb-2"
        >
          {entry.media.map(renderMediaItem)}
        </ScrollView>
      )}
    </View>
  );
};

export type { MediaItem, JournalEntry };