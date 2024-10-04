// TopBar.tsx
import React from 'react';
import { View, Text, Image } from 'react-native';

interface TopBarProps {
  title: string;
  imageUrl: string;
}

const TopBar: React.FC<TopBarProps> = ({ title, imageUrl }) => {
  return (
    <View className="flex-row justify-between items-center">
      {/* Left Side: Title */}
      <Text className="text-white text-4xl font-bold">{title}</Text>

      {/* Right Side: Image */}
      <Image source={{ uri: imageUrl }} className="w-10 h-10 rounded-full" />
    </View>
  );
};

export default TopBar;
