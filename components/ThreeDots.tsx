// ThreeDots.tsx
import React from 'react';
import { View } from 'react-native';

const ThreeDots: React.FC = () => {
  return (
    <View className="flex-row gap-x-1 items-center">
      {/* Each dot */}
      <View className="w-1 h-1 bg-gray-200 rounded-full" />
      <View className="w-1 h-1 bg-gray-200 rounded-full" />
      <View className="w-1 h-1 bg-gray-200 rounded-full" />
    </View>
  );
};

export default ThreeDots;
