import React from 'react';
import { View } from 'react-native';

export function AnimatedBackground() {
  return (
    <View className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      {/* Static floating circles */}
      <View
        className="absolute w-32 h-32 rounded-full"
        style={{
          backgroundColor: 'rgba(255, 107, 157, 0.1)',
          top: '10%',
          left: '80%',
        }}
      />
      
      <View
        className="absolute w-24 h-24 rounded-full"
        style={{
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          top: '60%',
          left: '10%',
        }}
      />
      
      <View
        className="absolute w-20 h-20 rounded-full"
        style={{
          backgroundColor: 'rgba(52, 211, 153, 0.1)',
          top: '30%',
          left: '20%',
        }}
      />
    </View>
  );
}