import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthProvider';
import { Colors } from '../../constants/Colors';
import AchievementsModal from './AchievementsModal';
import EditProfileModal from './EditProfileModal';

const { width } = Dimensions.get('window');

// Mock user data - will be replaced with real user data
const initialUserData = {
  username: "alexjohnson",
  bio: "Mobile Developer | React Native Enthusiast | Coffee Lover ☕\nBuilding the future, one app at a time 🚀",
  location: "San Francisco, CA",
  website: "alexjohnson.dev",
  following: 1247,
  followers: 3521,
  isVerified: true,
  coverImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=300&fit=crop",
  profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  achievementsCount: 8 // Number of earned achievements
};

const ProfileHeader = () => {
  const { user } = useAuth();
  const [showAchievements, setShowAchievements] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  
  // Use real user name or fallback to mock data
  const displayName = user?.displayName || user?.email?.split('@')[0] || userData.username;
  const username = user?.email?.split('@')[0] || userData.username;

  const handleSaveProfile = (updatedData: any) => {
    setUserData(prevData => ({
      ...prevData,
      ...updatedData
    }));
  };

  return (
    <View style={{ backgroundColor: Colors.default.bg }}>
      {/* Cover Photo - Reduced height from 160 to 120 */}
      <View style={{ position: 'relative', height: 120 }}>
        <Image
          source={{ uri: userData.coverImage }}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
          }}
        />
        
        {/* Edit Profile Button */}
        <TouchableOpacity 
          style={{ 
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: 'rgba(0,0,0,0.4)',
            borderRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 8
          }}
          onPress={() => setShowEditProfile(true)}
        >
          <Text style={{ fontWeight: '600', fontSize: 10, color: 'white' }}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Info Section */}
    <View style={{ paddingHorizontal: 8, paddingBottom: 16 }}>
      {/* Profile Picture - Adjusted margin for new banner height */}
      <View style={{ position: 'relative', marginTop: -35, marginBottom: -3 }}>
        <View style={{ 
        width: 70, 
        height: 70, 
        borderRadius: 50, 
        borderWidth: 4,
        borderColor: Colors.default.bg,
        backgroundColor: Colors.default.bg
        }}>
        <Image
          source={{ uri: user?.photoURL || userData.profileImage }}
          style={{ width: '100%', height: '100%', borderRadius: 50 }}
          contentFit="cover"
        />
        </View>
      </View>

      {/* Name, Username and Achievements Icon */}
      <View style={{ marginBottom: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: -8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginRight: 8, color: 'white' }}>
            {userData.username}
          </Text>
          {userData.isVerified && (
            <Ionicons name="checkmark-circle" size={17} color="#1DA1F2" />
          )}
        </View>
        
        {/* Achievements Icon - Now positioned next to username */}
        <TouchableOpacity 
          style={{ 
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'rgba(255, 215, 0, 0.2)',
            borderWidth: 2,
            borderColor: '#FFD700',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#FFD700',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 8,
            elevation: 8
          }}
          onPress={() => setShowAchievements(true)}
        >
          <Ionicons name="trophy" size={18} color="#FFD700" />
          {/* Achievement count badge */}
          <View style={{
            position: 'absolute',
            top: -6,
            right: -6,
            backgroundColor: '#FF4444',
            width: 18,
            height: 18,
            borderRadius: 9,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{ color: 'white', fontSize: 9, fontWeight: 'bold' }}>
            {userData.achievementsCount}
            </Text>
          </View>
        </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 13, color: 'white', opacity: 0.7 }}>@{username}</Text>
      </View>

      {/* Bio */}
      <Text style={{ fontSize: 12, lineHeight: 20, marginBottom: 5, color: 'white' }}>
        {userData.bio}
      </Text>

      {/* Location, Website, Join Date */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 }}>
        {userData.location && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 8 }}>
            <Ionicons name="location-outline" size={16} color="white" />
            <Text style={{ fontSize: 10, marginLeft: 4, color: 'white', opacity: 0.7 }}>{userData.location}</Text>
          </View>
        )}
        
        {userData.website && (
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 8 }}>
            <Feather name="link" size={16} color="white" />
            <Text style={{ fontSize: 10, marginLeft: 4, color: Colors.default.accent }}>{userData.website}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Bondz only - Removed Following */}
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{ marginLeft: 4 }}>
        <Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>{userData.followers.toLocaleString()}</Text>
          <Text style={{ fontSize: 12, fontWeight: 'normal', color: 'gray', opacity: 0.7 }}> Bondz</Text>
        </Text>
        </TouchableOpacity>
      </View>
    </View>

      {/* Achievements Modal */}
      <AchievementsModal 
        visible={showAchievements}
        onClose={() => setShowAchievements(false)}
      />

      {/* Edit Profile Modal */}
      <EditProfileModal
        visible={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        userData={userData}
        onSave={handleSaveProfile}
      />
    </View>
  );
};

export default ProfileHeader;