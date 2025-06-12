import React from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import { useTheme } from '../../contexts/ThemeProvider';
import { useDashboard } from '../../contexts/DashboardProvider';
import { Colors } from '../../constants/Colors';

// Import all components
import { PersonalWelcome } from './Header/PersonalWelcome';
import { MemoryCaptureHub } from './QuickActions/MemoryCaptureHub';
import { TodaysFocus } from './QuickActions/TodaysFocus';
import { RecentActivity } from './ActivityFeed/RecentActivity';
import { PeopleDashboard } from './People/PeopleDashboard';
import { ImportantReminders } from './Reminders/ImportantReminders';

export function HomeDashboard() {
  const { theme } = useTheme();
  const { loading } = useDashboard();
  const colors = Colors[theme];

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: Implement actual refresh logic
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View 
      style={{ backgroundColor: colors.bg }}
      className="flex-1"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
      >
        {/* Header Section */}
        <PersonalWelcome />

        {/* Quick Actions Dashboard */}
        <MemoryCaptureHub />
        
        {/* Today's Focus */}
        <TodaysFocus />

        {/* Recent Activity Feed */}
        <RecentActivity />

        {/* People Dashboard */}
        <PeopleDashboard />

        {/* Important Reminders */}
        <ImportantReminders />

        {/* Bottom padding for safe area */}
        <View className="h-20" />
      </ScrollView>
    </View>
  );
}