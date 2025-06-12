import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useDashboard } from '../../../contexts/DashboardProvider';
import { useTheme } from '../../../contexts/ThemeProvider';
import { Colors } from '../../../constants/Colors';

export function RecentActivity() {
  const { getRecentMemories, people } = useDashboard();
  const { theme } = useTheme();
  const colors = Colors[theme];

  const recentMemories = getRecentMemories(5);

  const getPersonNames = (personIds: string[]) => {
    return personIds
      .map(id => people.find(p => p.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  const getMemoryIcon = (type: string) => {
    switch (type) {
      case 'photo': return '📸';
      case 'voice': return '🎙️';
      case 'text': return '✍️';
      default: return '💭';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  };

  return (
    <View className="px-6 mb-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text 
          style={{ color: colors.textPrimary }}
          className="text-xl font-bold"
        >
          Recent Memories 📱
        </Text>
        <TouchableOpacity>
          <Text 
            style={{ color: colors.accent }}
            className="text-sm font-medium"
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>

      {recentMemories.length === 0 ? (
        <View 
          style={{ backgroundColor: colors.cardBg }}
          className="rounded-xl p-6 items-center border border-gray-800"
        >
          <Text className="text-4xl mb-2">🌟</Text>
          <Text 
            style={{ color: colors.textPrimary }}
            className="text-base font-medium mb-1"
          >
            Start Your Journey
          </Text>
          <Text 
            style={{ color: colors.textSecondary }}
            className="text-sm text-center"
          >
            Create your first memory to see it here
          </Text>
        </View>
      ) : (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="mb-2"
        >
          {recentMemories.map((memory, index) => (
            <TouchableOpacity
              key={memory.id}
              style={{ backgroundColor: colors.cardBg }}
              className={`rounded-xl p-4 w-64 border border-gray-800 ${
                index !== recentMemories.length - 1 ? 'mr-3' : ''
              }`}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center mb-2">
                <Text className="text-lg mr-2">{getMemoryIcon(memory.type)}</Text>
                <Text 
                  style={{ color: colors.textSecondary }}
                  className="text-xs"
                >
                  {formatDate(memory.date)}
                </Text>
              </View>
              
              <Text 
                style={{ color: colors.textPrimary }}
                className="text-base font-semibold mb-1"
                numberOfLines={1}
              >
                {memory.title}
              </Text>
              
              <Text 
                style={{ color: colors.textSecondary }}
                className="text-sm mb-3"
                numberOfLines={2}
              >
                {memory.description}
              </Text>
              
              {memory.personIds.length > 0 && (
                <View className="flex-row items-center">
                  <Text className="text-sm mr-1">👥</Text>
                  <Text 
                    style={{ color: colors.textSecondary }}
                    className="text-xs"
                    numberOfLines={1}
                  >
                    with {getPersonNames(memory.personIds)}
                  </Text>
                </View>
              )}
              
              {memory.tags.length > 0 && (
                <View className="flex-row flex-wrap mt-2">
                  {memory.tags.slice(0, 2).map((tag, tagIndex) => (
                    <View
                      key={tagIndex}
                      style={{ backgroundColor: colors.accent + '20' }}
                      className="rounded-full px-2 py-1 mr-1 mb-1"
                    >
                      <Text 
                        style={{ color: colors.accent }}
                        className="text-xs"
                      >
                        #{tag}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}