import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ChallengeCard } from '../../../../types/challenge';
import { Colors } from '../../../../constants/Colors';

const { width } = Dimensions.get('window');

interface Props {
  challenge: ChallengeCard;
  onSubmit: (submission: ChallengeSubmission) => void;
  onClose: () => void;
}

export interface ChallengeSubmission {
  id: string;
  challengeId: number;
  challengeTitle: string;
  challengeIcon: string;
  text: string;
  image?: string;
  timestamp: Date;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  likes: number;
  comments: number;
  shares: number;
}

export function ChallengeSubmissionPage({ challenge, onSubmit, onClose }: Props) {
  const [text, setText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission needed', 'Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission needed', 'Camera permission is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!text.trim() && !selectedImage) {
      Alert.alert('Empty post', 'Please add some text or an image to share your moment.');
      return;
    }

    setIsSubmitting(true);

    try {
      const submission: ChallengeSubmission = {
        id: Date.now().toString(),
        challengeId: challenge.id,
        challengeTitle: challenge.title,
        challengeIcon: challenge.image,
        text: text.trim(),
        image: selectedImage || undefined,
        timestamp: new Date(),
        author: {
          name: 'You',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
          username: '@you'
        },
        likes: 0,
        comments: 0,
        shares: 0
      };

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSubmit(submission);
      Alert.alert('Success!', 'Your moment has been shared with the community! ✨');
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to submit your post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1" 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ backgroundColor: Colors.default.bg }}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 pt-12">
        <TouchableOpacity onPress={onClose} className="p-2">
          <Ionicons name="close" size={24} color={Colors.default.textPrimary} />
        </TouchableOpacity>
        <Text className="text-lg font-semibold" style={{ color: Colors.default.textPrimary }}>
          Share Your Moment
        </Text>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isSubmitting}
          className="px-4 py-2 rounded-full"
          style={{ 
            backgroundColor: challenge.gradient[0],
            opacity: isSubmitting ? 0.6 : 1
          }}
        >
          <Text className="text-white font-semibold">
            {isSubmitting ? 'Sharing...' : 'Share'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Challenge Info */}
        <View className="mx-4 mb-6">
          <LinearGradient
            colors={[challenge.gradient[0], challenge.gradient[1]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-2xl p-4"
          >
            <View className="flex-row items-center">
              <View 
                className="w-12 h-12 rounded-xl items-center justify-center mr-3"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <Text style={{ fontSize: 24 }}>{challenge.image}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white text-lg font-bold">{challenge.title}</Text>
                <Text className="text-white/90 text-sm">{challenge.subtitle}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Content Input */}
        <View className="mx-4 mb-6">
          <Text 
            className="text-base font-medium mb-3"
            style={{ color: Colors.default.textPrimary }}
          >
            Share your experience
          </Text>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Tell the community about your peaceful moment..."
            placeholderTextColor={Colors.default.textSecondary}
            multiline
            textAlignVertical="top"
            className="p-4 rounded-2xl text-base"
            style={{
              backgroundColor: Colors.default.cardBg,
              color: Colors.default.textPrimary,
              minHeight: 120,
              maxHeight: 200
            }}
          />
        </View>

        {/* Image Preview */}
        {selectedImage && (
          <View className="mx-4 mb-6">
            <View className="relative">
              <Image
                source={{ uri: selectedImage }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={() => setSelectedImage(null)}
                className="absolute top-2 right-2 w-8 h-8 rounded-full items-center justify-center"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              >
                <Ionicons name="close" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Media Options */}
        <View className="mx-4 mb-6">
          <Text 
            className="text-base font-medium mb-3"
            style={{ color: Colors.default.textPrimary }}
          >
            Add a photo (optional)
          </Text>
          <View className="flex-row space-x-3">
            <TouchableOpacity
              onPress={takePhoto}
              className="flex-1 flex-row items-center justify-center p-4 rounded-2xl"
              style={{ backgroundColor: Colors.default.cardBg }}
            >
              <Ionicons 
                name="camera" 
                size={20} 
                color={Colors.default.textPrimary} 
                style={{ marginRight: 8 }}
              />
              <Text style={{ color: Colors.default.textPrimary }}>Camera</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={pickImage}
              className="flex-1 flex-row items-center justify-center p-4 rounded-2xl"
              style={{ backgroundColor: Colors.default.cardBg }}
            >
              <Ionicons 
                name="images" 
                size={20} 
                color={Colors.default.textPrimary}
                style={{ marginRight: 8 }}
              />
              <Text style={{ color: Colors.default.textPrimary }}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tips */}
        <View className="mx-4 mb-8">
          <View 
            className="p-4 rounded-2xl"
            style={{ backgroundColor: `${challenge.gradient[0]}20` }}
          >
            <Text 
              className="text-sm font-medium mb-2"
              style={{ color: challenge.gradient[0] }}
            >
              💡 Tips for a great post:
            </Text>
            <Text 
              className="text-sm"
              style={{ color: Colors.default.textSecondary }}
            >
              • Share what made this moment special{'\n'}
              • Include how it made you feel{'\n'}
              • Inspire others to find their peace
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}