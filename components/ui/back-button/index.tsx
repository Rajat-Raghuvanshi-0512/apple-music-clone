import React from 'react';
import { Pressable } from '../pressable';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/utils';

const BackButton = ({
  className,
  iconColor = 'black',
}: {
  className?: string;
  iconColor?: string;
}) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.back()}
      className={cn('w-8 h-8 items-center justify-center', className)}
    >
      <Ionicons name="chevron-back" size={24} color={iconColor} />
    </Pressable>
  );
};

export default BackButton;
