import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useDashboard } from '../../../contexts/DashboardProvider';
import { useTheme } from '../../../contexts/ThemeProvider';
import { Colors } from '../../../constants/Colors';

export function PeopleDashboard() {
  const { people, getPeopleByInteraction } = useDashboard();
  const { theme } = useTheme();
  const colors = Colors[theme];

  const sortedPeople = getPeopleByInteraction();

  const getInteractionIndicator = (lastInteraction: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastInteraction.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 3) return { color: '#10B981', intensity: 'high' }; // Green - Recent
    if (diffDays <= 7) return { color: '#F59E0B', intensity: 'medium' }; // Yellow - Moderate
    return { color: '#EF4444', intensity: 'low' }; // Red - Needs attention
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatLastInteraction = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1d';
    if (diffDays < 7) return `${diffDays}d`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w`;
    return `${Math.floor(diffDays / 30)}m`;
  };

  return (
    <View className="px-6 mb-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text 
          style={{ color: colors.textPrimary }}
          className="text-xl font-bold"
        >
          Your Bondz 👥
        </Text>
        <TouchableOpacity>
          <Text 
            style={{ color: colors.accent }}
            className="text-sm font-medium"
          >
            Add Person
          </Text>
        </TouchableOpacity>
      </View>

      {/* Close Connections Grid */}
      <View className="mb-4">
        <Text 
          style={{ color: colors.textSecondary }}
          className="text-sm font-medium mb-3"
        >
          Close Connections
        </Text>
        
        <View className="flex-row flex-wrap">
          {sortedPeople.slice(0, 6).map((person) => {
            const indicator = getInteractionIndicator(person.lastInteraction);
            
            return (
              <TouchableOpacity
                key={person.id}
                style={{ backgroundColor: colors.cardBg }}
                className="rounded-2xl p-4 mr-3 mb-3 items-center border border-gray-800"
                activeOpacity={0.7}
              >
                {/* Avatar with interaction indicator */}
                <View className="relative mb-2">
                  <View
                    style={{ backgroundColor: colors.accent + '30' }}
                    className="w-12 h-12 rounded-full items-center justify-center"
                  >
                    <Text 
                      style={{ color: colors.accent }}
                      className="text-lg font-bold"
                    >
                      {getInitials(person.name)}
                    </Text>
                  </View>
                  
                  {/* Interaction indicator dot */}
                  <View
                    style={{
                      backgroundColor: indicator.color,
                      borderColor: colors.cardBg,
                      borderWidth: 2,
                      position: 'absolute',
                      top: -4,
                      right: -4,
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                    }}
                  />
                </View>
                
                <Text 
                  style={{ color: colors.textPrimary }}
                  className="text-sm font-medium text-center"
                  numberOfLines={1}
                >
                  {person.name}
                </Text>
                
                <Text 
                  style={{ color: colors.textSecondary }}
                  className="text-xs text-center mt-1"
                >
                  {formatLastInteraction(person.lastInteraction)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Relationship Overview */}
      <View
        style={{ backgroundColor: colors.cardBg }}
        className="rounded-xl p-4 border border-gray-800"
      >
        <Text 
          style={{ color: colors.textPrimary }}
          className="text-base font-semibold mb-3"
        >
          Relationship Overview
        </Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {sortedPeople.map((person) => {
            const indicator = getInteractionIndicator(person.lastInteraction);
            
            return (
              <TouchableOpacity
                key={person.id}
                className="mr-4 items-center"
                activeOpacity={0.7}
              >
                <View className="relative mb-2">
                  <View
                    style={{ backgroundColor: colors.accent + '20' }}
                    className="w-16 h-16 rounded-full items-center justify-center"
                  >
                    <Text 
                      style={{ color: colors.accent }}
                      className="text-xl font-bold"
                    >
                      {getInitials(person.name)}
                    </Text>
                  </View>
                  
                  <View
                    style={{
                      backgroundColor: indicator.color,
                      borderColor: colors.cardBg,
                      borderWidth: 2,
                      position: 'absolute',
                      top: -4,
                      right: -4,
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                    }}
                  />
                </View>
                
                <Text 
                  style={{ color: colors.textPrimary }}
                  className="text-sm font-medium text-center"
                  numberOfLines={1}
                >
                  {person.name}
                </Text>
                
                <Text 
                  style={{ color: colors.textSecondary }}
                  className="text-xs text-center"
                >
                  {person.relationship}
                </Text>
                
                <Text 
                  style={{ color: colors.textSecondary }}
                  className="text-xs text-center"
                >
                  {person.totalMemories} memories
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Missing Someone Section */}
      {people.some(p => {
        const diffTime = Math.abs(new Date().getTime() - p.lastInteraction.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 7;
      }) && (
        <View
          style={{ backgroundColor: colors.cardBg }}
          className="rounded-xl p-4 mt-3 border border-gray-800"
        >
          <View className="flex-row items-center mb-2">
            <Text className="text-lg mr-2">💭</Text>
            <Text 
              style={{ color: colors.textPrimary }}
              className="text-base font-semibold"
            >
              Missing Someone?
            </Text>
          </View>
          
          <Text 
            style={{ color: colors.textSecondary }}
            className="text-sm mb-3"
          >
            These people might appreciate hearing from you:
          </Text>
          
          <View className="flex-row flex-wrap">
            {people
              .filter(p => {
                const diffTime = Math.abs(new Date().getTime() - p.lastInteraction.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays > 7;
              })
              .slice(0, 3)
              .map((person) => (
                <TouchableOpacity
                  key={person.id}
                  style={{ backgroundColor: colors.accent + '10' }}
                  className="rounded-full px-3 py-2 mr-2 mb-2 flex-row items-center"
                  activeOpacity={0.7}
                >
                  <Text 
                    style={{ color: colors.accent }}
                    className="text-sm font-medium"
                  >
                    {person.name}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      )}
    </View>
  );
}