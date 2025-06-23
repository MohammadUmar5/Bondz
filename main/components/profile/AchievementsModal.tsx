import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, Dimensions } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const { width, height } = Dimensions.get('window');

interface Achievement {
  id: string;
  type: string;
  title: string;
  subtext: string;
  date: string;
  icon: string;
  color: string;
  isEarned: boolean;
  linkedPost?: {
    id: string;
    title: string;
  };
}

interface AchievementsModalProps {
  visible: boolean;
  onClose: () => void;
}

// Mock achievements data - only earned achievements
const earnedAchievements: Achievement[] = [
  {
    id: '1',
    type: 'challenge_winner',
    title: 'Challenge Champion',
    subtext: 'Completed 30-Day Fitness Challenge',
    date: 'February 15, 2025',
    icon: 'trophy',
    color: '#FFD700',
    isEarned: true,
    linkedPost: { id: '2', title: '30-Day Fitness Challenge' }
  },
  {
    id: '2',
    type: 'streak_master',
    title: '30-Day Streak Master',
    subtext: 'Maintained daily activity for 30 consecutive days',
    date: 'February 10, 2025',
    icon: 'flame',
    color: '#FF4500',
    isEarned: true
  },
  {
    id: '3',
    type: 'top_performer',
    title: 'Top 10 in Global Challenge',
    subtext: 'Among top voted posts in Feb \'25 Challenge',
    date: 'February 5, 2025',
    icon: 'medal',
    color: '#8B5CF6',
    isEarned: true,
    linkedPost: { id: '3', title: 'Beautiful sunset post' }
  },
  {
    id: '4',
    type: 'community_star',
    title: 'Community Star',
    subtext: 'Received 1000+ likes across all posts',
    date: 'January 28, 2025',
    icon: 'star',
    color: '#F59E0B',
    isEarned: true
  },
  {
    id: '5',
    type: 'code_master',
    title: 'Code Master',
    subtext: 'Completed 50 coding challenges',
    date: 'January 20, 2025',
    icon: 'code-slash',
    color: '#10B981',
    isEarned: true,
    linkedPost: { id: '4', title: 'Code Daily Challenge' }
  },
  {
    id: '6',
    type: 'early_bird',
    title: 'Early Bird',
    subtext: 'First 100 users to join the platform',
    date: 'March 15, 2021',
    icon: 'sunny',
    color: '#F97316',
    isEarned: true
  },
  {
    id: '7',
    type: 'consistency_king',
    title: 'Consistency King',
    subtext: 'Posted every day for 7 consecutive days',
    date: 'January 15, 2025',
    icon: 'checkmark-circle',
    color: '#06B6D4',
    isEarned: true
  },
  {
    id: '8',
    type: 'mentor',
    title: 'Mentor',
    subtext: 'Helped 10+ users complete their challenges',
    date: 'December 20, 2024',
    icon: 'school',
    color: '#8B5CF6',
    isEarned: true
  }
];

const AchievementsModal: React.FC<AchievementsModalProps> = ({ visible, onClose }) => {
  const renderAchievementCard = (achievement: Achievement) => (
    <View 
      key={achievement.id} 
      style={{
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        marginHorizontal: 8,
        backgroundColor: Colors.default.cardBg,
        borderWidth: 1,
        borderColor: achievement.color,
        shadowColor: achievement.color,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        {/* Icon */}
        <View 
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 16,
            backgroundColor: `${achievement.color}20`
          }}
        >
          <Ionicons 
            name={achievement.icon as any} 
            size={32} 
            color={achievement.color} 
          />
        </View>

        {/* Content */}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4, color: 'white' }}>
            {achievement.title}
          </Text>
          <Text style={{ fontSize: 14, marginBottom: 8, color: '#D1D5DB' }}>
            {achievement.subtext}
          </Text>
          <Text style={{ fontSize: 12, color: '#9CA3AF' }}>
            Earned on {achievement.date}
          </Text>
          
          {/* Linked Post */}
          {achievement.linkedPost && (
            <TouchableOpacity style={{ marginTop: 8 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="link" size={12} color={achievement.color} />
                <Text style={{ fontSize: 12, marginLeft: 4, color: achievement.color }}>
                  View related post: {achievement.linkedPost.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: Colors.default.bg }}>
        {/* Header */}
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: 16, 
          borderBottomWidth: 1,
          borderBottomColor: Colors.default.tabBarBorderColor 
        }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
            🏆 Your Achievements
          </Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Achievement Count */}
        <View style={{ 
          paddingHorizontal: 16, 
          paddingVertical: 12, 
          backgroundColor: Colors.default.cardBg,
          marginHorizontal: 16,
          marginTop: 16,
          borderRadius: 8,
          borderLeftWidth: 4,
          borderLeftColor: '#FFD700'
        }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>
            Total Achievements Earned
          </Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FFD700', marginTop: 4 }}>
            {earnedAchievements.length}
          </Text>
        </View>

        <ScrollView 
          style={{ flex: 1 }} 
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {earnedAchievements.map(renderAchievementCard)}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default AchievementsModal;