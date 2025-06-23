import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import SocialPost from '../bondzSpace/posts/SocialPost';

const { width } = Dimensions.get('window');

// Updated mock posts data with different avatar URLs to test
const mockPosts = [
  {
    id: "1",
    user: {
      id: "1",
      username: "alexjohnson", 
      displayName: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      isVerified: true
    },
    content: "Just shipped a new feature! React Native development is getting more exciting every day 🚀 #ReactNative #MobileDev",
    timestamp: "2h",
    likes: 47,
    comments: 8,
    shares: 12,
    isLiked: false,
    image: null,
    location: "San Francisco, CA"
  },
  {
    id: "3",
    user: {
      id: "2",
      username: "alexjohnson",
      displayName: "Alex Johnson", 
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      isVerified: true
    },
    content: "Beautiful sunset from my office window. Sometimes you need to take a moment to appreciate the small things ✨",
    timestamp: "5h",
    likes: 156,
    comments: 15,
    shares: 23,
    isLiked: true,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    location: "San Francisco, CA"
  },
  {
    id: "5",
    user: {
      id: "3",
      username: "alexjohnson",
      displayName: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg", 
      isVerified: true
    },
    content: "Working on something exciting today! Can't wait to share it with you all. The React Native community is amazing 💙",
    timestamp: "1d",
    likes: 89,
    comments: 7,
    shares: 12,
    isLiked: false,
    image: null,
    location: "San Francisco, CA"
  }
];

// Mock challenges data (keeping existing format)
const mockChallenges = [
  {
    id: 2,
    type: 'challenge',
    title: "30-Day Fitness Challenge",
    content: "Completed day 15 of the fitness challenge! Feeling stronger every day 💪",
    timestamp: "4h",
    likes: 23,
    retweets: 5,
    replies: 12,
    hasImage: true,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    challengeStatus: "In Progress",
    progress: 50,
    reward: "🏅 Consistency Badge"
  },
  {
    id: 4,
    type: 'challenge',
    title: "Code Daily Challenge",
    content: "Day 7 of coding every day! Today I built a new component for my React Native app 👨‍💻",
    timestamp: "1d",
    likes: 89,
    retweets: 34,
    replies: 12,
    hasImage: false,
    challengeStatus: "Completed",
    progress: 100,
    reward: "🏆 Code Champion"
  },
  {
    id: 6,
    type: 'challenge',
    title: "Reading Challenge",
    content: "Finished my 5th book this month! Currently reading 'Clean Code' by Robert Martin. Highly recommended for developers!",
    timestamp: "2d",
    likes: 45,
    retweets: 8,
    replies: 6,
    hasImage: true,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    challengeStatus: "In Progress",
    progress: 83,
    reward: "📚 Bookworm Badge"
  }
];

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState('posts');

  // Use SocialPost component directly for posts
  const renderPost = (item: any) => {
    return <SocialPost key={item.id} post={item} />;
  };

  const renderChallenge = (item: any) => (
    <View key={item.id} style={{ 
      backgroundColor: Colors.default.cardBg,
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: Colors.default.tabBarBorderColor,
      marginHorizontal: 4,
      marginVertical: 2,
      borderRadius: 8
    }}>
      {/* Challenge Header */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: 12, 
        padding: 12, 
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.05)'
      }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <Text style={{ fontWeight: '600', marginLeft: 8, fontSize: 12, color: '#FFFFFF' }}>{item.title}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 11, marginRight: 12, color: '#D1D5DB' }}>
              Status: <Text style={{ color: item.challengeStatus === 'Completed' ? '#10B981' : Colors.default.accent }}>{item.challengeStatus}</Text>
            </Text>
            <Text style={{ fontSize: 11, color: '#D1D5DB' }}>
              Progress: {item.progress}%
            </Text>
          </View>
        </View>
        {item.reward && (
          <View style={{ marginLeft: 8 }}>
            <Text style={{ fontSize: 11, color: Colors.default.accent }}>{item.reward}</Text>
          </View>
        )}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <Text style={{ fontSize: 12, color: '#9CA3AF' }}>{item.timestamp}</Text>
      </View>
      
      <Text style={{ fontSize: 12, lineHeight: 18, marginBottom: 12, color: '#FFFFFF' }}>
        {item.content}
      </Text>
      
      {item.hasImage && item.image && (
        <View style={{ marginBottom: 12, borderRadius: 12, overflow: 'hidden' }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: '100%', height: 200 }}
            contentFit="cover"
          />
        </View>
      )}
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', maxWidth: 320 }}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Feather name="message-circle" size={16} color="white" />
          <Text style={{ fontSize: 12, marginLeft: 4, color: 'white', opacity: 0.7 }}>{item.replies}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Feather name="repeat" size={16} color="white" />
          <Text style={{ fontSize: 12, marginLeft: 4, color: 'white', opacity: 0.7 }}>{item.retweets}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Feather name="heart" size={16} color="white" />
          <Text style={{ fontSize: 12, marginLeft: 4, color: 'white', opacity: 0.7 }}>{item.likes}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity>
          <Feather name="share" size={16} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ backgroundColor: Colors.default.bg }}>
      {/* Tab Navigation */}
      <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.default.tabBarBorderColor }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 0,
              paddingVertical: 16,
              flex: 1,
              position: 'relative'
            }}
            onPress={() => setActiveTab('posts')}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ 
                fontSize: 12,
                fontWeight: '600',
                color: activeTab === 'posts' ? Colors.default.accent : 'white'
              }}>
                Posts
              </Text>
              <Text style={{ 
                fontSize: 12, 
                marginLeft: 4,
                color: activeTab === 'posts' ? Colors.default.accent : 'white'
              }}>
                {mockPosts.length}
              </Text>
            </View>
            {/* Shorter underline bar */}
            {activeTab === 'posts' && (
              <View style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                marginLeft: -20,
                width: 40,
                height: 2,
                backgroundColor: Colors.default.accent
              }} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              paddingHorizontal: 0,
              paddingVertical: 16,
              flex: 1,
              position: 'relative'
            }}
            onPress={() => setActiveTab('challenges')}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ 
                fontSize: 12,
                fontWeight: '600',
                color: activeTab === 'challenges' ? Colors.default.accent : 'white'
              }}>
                Challenges
              </Text>
              <Text style={{ 
                fontSize: 12,
                marginLeft: 4,
                color: activeTab === 'challenges' ? Colors.default.accent : 'white'
              }}>
                {mockChallenges.length}
              </Text>
            </View>
            {/* Shorter underline bar */}
            {activeTab === 'challenges' && (
              <View style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                marginLeft: -25,
                width: 50,
                height: 2,
                backgroundColor: Colors.default.accent
              }} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Content with margin top */}
      <View style={{ paddingBottom: 20, paddingTop: 16, marginTop: 12 }}>
        {activeTab === 'posts' && mockPosts.map(renderPost)}
        {activeTab === 'challenges' && mockChallenges.map(renderChallenge)}
      </View>
    </View>
  );
};

export default ProfileTabs;