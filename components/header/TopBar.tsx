// TopBar.tsx
import { cn } from '@/utils';
import React from 'react';
import { View, Text, Image } from 'react-native';

interface TopBarProps {
  title: string;
  imageUrl?: string;
  containerClassName?: string;
}

const TopBar: React.FC<TopBarProps> = ({
  title,
  imageUrl,
  containerClassName,
}) => {
  return (
    <View
      className={cn(
        'flex-row justify-between items-center',
        containerClassName
      )}
    >
      {/* Left Side: Title */}
      <Text className="text-white text-4xl font-bold">{title}</Text>

      {/* Right Side: Image */}
      {imageUrl && (
        <Image source={{ uri: imageUrl }} className="w-10 h-10 rounded-full" />
      )}
    </View>
  );
};

export default TopBar;
