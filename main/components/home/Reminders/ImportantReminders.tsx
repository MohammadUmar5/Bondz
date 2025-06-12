import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDashboard } from '../../../contexts/DashboardProvider';
import { useTheme } from '../../../contexts/ThemeProvider';
import { Colors } from '../../../constants/Colors';

export function ImportantReminders() {
  const { getUpcomingReminders, people, updateReminder } = useDashboard();
  const { theme } = useTheme();
  const colors = Colors[theme];

  const upcomingReminders = getUpcomingReminders(5);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return colors.textSecondary;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔥';
      case 'medium': return '⚡';
      case 'low': return '💡';
      default: return '📝';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'birthday': return '🎂';
      case 'anniversary': return '💕';
      case 'custom': return '📌';
      default: return '📝';
    }
  };

  const formatReminderDate = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    if (diffDays < 30) return `In ${Math.floor(diffDays / 7)} weeks`;
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  };

  const getPersonName = (personId: string) => {
    return people.find(p => p.id === personId)?.name || 'Someone';
  };

  const handleCompleteReminder = (reminderId: string) => {
    updateReminder(reminderId, { isCompleted: true });
  };

  if (upcomingReminders.length === 0) {
    return (
      <View className="px-6 mb-6">
        <Text 
          style={{ color: colors.textPrimary }}
          className="text-xl font-bold mb-4"
        >
          Reminders 🔔
        </Text>
        
        <View 
          style={{ backgroundColor: colors.cardBg }}
          className="rounded-xl p-6 items-center border border-gray-800"
        >
          <Text className="text-4xl mb-2">✅</Text>
          <Text 
            style={{ color: colors.textPrimary }}
            className="text-base font-medium mb-1"
          >
            All Caught Up!
          </Text>
          <Text 
            style={{ color: colors.textSecondary }}
            className="text-sm text-center"
          >
            No upcoming reminders. You're doing great!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="px-6 mb-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text 
          style={{ color: colors.textPrimary }}
          className="text-xl font-bold"
        >
          Important Reminders 🔔
        </Text>
        <TouchableOpacity>
          <Text 
            style={{ color: colors.accent }}
            className="text-sm font-medium"
          >
            Add Reminder
          </Text>
        </TouchableOpacity>
      </View>

      {upcomingReminders.map((reminder) => (
        <TouchableOpacity
          key={reminder.id}
          style={{ backgroundColor: colors.cardBg }}
          className="rounded-xl p-4 mb-3 border border-gray-800"
          activeOpacity={0.7}
        >
          <View className="flex-row items-start justify-between">
            <View className="flex-1">
              {/* Header with type and priority */}
              <View className="flex-row items-center mb-2">
                <Text className="text-lg mr-2">{getTypeIcon(reminder.type)}</Text>
                <Text 
                  style={{ color: getPriorityColor(reminder.priority) }}
                  className="text-xs font-medium mr-2"
                >
                  {getPriorityIcon(reminder.priority)} {reminder.priority.toUpperCase()}
                </Text>
                <Text 
                  style={{ color: colors.textSecondary }}
                  className="text-xs"
                >
                  {formatReminderDate(reminder.date)}
                </Text>
              </View>

              {/* Title and description */}
              <Text 
                style={{ color: colors.textPrimary }}
                className="text-base font-semibold mb-1"
              >
                {reminder.title}
              </Text>
              
              {reminder.description && (
                <Text 
                  style={{ color: colors.textSecondary }}
                  className="text-sm mb-2"
                >
                  {reminder.description}
                </Text>
              )}

              {/* Person reference */}
              {reminder.personId && (
                <View className="flex-row items-center">
                  <Text className="text-sm mr-1">👤</Text>
                  <Text 
                    style={{ color: colors.textSecondary }}
                    className="text-xs"
                  >
                    for {getPersonName(reminder.personId)}
                  </Text>
                </View>
              )}
            </View>

            {/* Complete button */}
            <TouchableOpacity
              style={{ backgroundColor: colors.accent + '20' }}
              className="rounded-full p-2 ml-3"
              onPress={() => handleCompleteReminder(reminder.id)}
              activeOpacity={0.7}
            >
              <Text 
                style={{ color: colors.accent }}
                className="text-xs font-medium"
              >
                ✓
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}

      {/* Quick Add Reminder */}
      <TouchableOpacity
        style={{ backgroundColor: colors.cardBg }}
        className="rounded-xl p-4 border border-gray-800 border-dashed items-center"
        activeOpacity={0.7}
      >
        <View className="flex-row items-center">
          <Text className="text-lg mr-2">➕</Text>
          <Text 
            style={{ color: colors.textSecondary }}
            className="text-sm"
          >
            Add a new reminder
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}