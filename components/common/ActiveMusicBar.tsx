import { Platform, View } from 'react-native';
import React from 'react';
import { BlurView } from 'expo-blur';
import { Image } from '../ui/image';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../ui/text';
import { Pressable } from '../ui/pressable';
import { unknownTrackImageUri } from '@/constants/images';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { togglePlayPause, playNextTrack } from '@/store/slices/musicSlice';
import ActiveMusicBarSkeleton from './ActiveMusicBarSkeleton';
import { cn } from '@/utils';

const ActiveMusicBar = () => {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying, isLoading } = useAppSelector(
    (state) => state.music
  );

  if (!currentTrack) return null;
  if (isLoading) return <ActiveMusicBarSkeleton />;

  const handleNextTrack = () => {
    dispatch(playNextTrack());
  };

  const displayImage = currentTrack.image ?? currentTrack.artwork;

  return (
    <View
      className={cn(
        'px-2 absolute bottom-[88px] left-0 right-0 z-50',
        Platform.OS === 'android' && 'bg-black'
      )}
    >
      <BlurView
        intensity={80}
        tint="dark"
        className="h-16 rounded-2xl overflow-hidden bg-black"
      >
        <View className="flex-1 flex-row items-center justify-between p-3">
          <View className="flex-row items-center gap-2">
            <Image
              source={{
                uri: displayImage ?? unknownTrackImageUri,
              }}
              className="w-12 h-12 rounded-lg"
              alt="album-cover"
            />
            <View>
              <Text className="text-white text-base font-semibold">
                {currentTrack.title}
              </Text>
              <Text className="text-gray-400 text-sm">
                {currentTrack.artist ?? 'Unknown artist'}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-5 pr-4">
            <Pressable onPress={() => dispatch(togglePlayPause())}>
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={26}
                color="white"
              />
            </Pressable>
            <Pressable onPress={handleNextTrack}>
              <Ionicons name="play-forward" size={26} color="white" />
            </Pressable>
          </View>
        </View>
      </BlurView>
    </View>
  );
};

export default ActiveMusicBar;
