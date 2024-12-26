// ThreeDots.tsx
import { cn } from '@/utils';
import React from 'react';
import { View } from 'react-native';

const ThreeDots: React.FC<{ className?: string; dotClassName?: string }> = ({
  className,
  dotClassName = 'bg-gray-200',
}) => {
  return (
    <View className={cn('flex-row gap-x-1 items-center', className)}>
      {/* Each dot */}
      <View className={cn('w-1 h-1 rounded-full ', dotClassName)} />
      <View className={cn('w-1 h-1 rounded-full ', dotClassName)} />
      <View className={cn('w-1 h-1 rounded-full ', dotClassName)} />
    </View>
  );
};

export default ThreeDots;
