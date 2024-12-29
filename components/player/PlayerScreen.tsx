import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Image } from '../ui/image';
import { Text } from '../ui/text';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { unknownTrackImageUri } from '@/constants/images';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Pressable } from '../ui/pressable';
import {
  togglePlayPause,
  playNextTrack,
  playPreviousTrack,
} from '@/store/slices/musicSlice';
import Slider from '@react-native-community/slider';

const PlayerScreen = () => {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying } = useAppSelector((state) => state.music);

  // Handle slider interaction
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekPosition, setSeekPosition] = useState(0);

  // Format time helper function
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) return null;

  const displayImage = currentTrack.image ?? currentTrack.artwork;

  return (
    <View className="flex-1 ">
      {/* Album Art */}
      <View className="px-6 mt-8 items-center justify-center">
        <Image
          source={{ uri: displayImage ?? unknownTrackImageUri }}
          className={`w-full h-[370px] aspect-square rounded-lg transition-all duration-500 ${
            isPlaying ? 'scale-100' : 'scale-75'
          }`}
          alt="album-cover"
        />
      </View>
      {/* Header */}
      <View className="flex-row justify-between items-center px-10 pt-14 pb-4">
        <View>
          <Text numberOfLines={1} className="text-white text-2xl font-semibold">
            {currentTrack.title}
          </Text>
          <Text numberOfLines={1} className="text-gray-300 text-lg font-medium">
            {currentTrack.artist ?? 'Unknown artist'}
          </Text>
        </View>
        <View className="gap-5 flex-row">
          <View className="bg-gray-400/40 rounded-full p-1">
            <MaterialIcons name="star-border" size={20} color="white" />
          </View>
          <View className="bg-gray-400/40 rounded-full p-1">
            <MaterialIcons name="more-horiz" size={20} color="white" />
          </View>
        </View>
      </View>

      {/* Controls */}
      <View className="px-4 mt-8">
        {/* Progress Bar */}
        <Slider
          minimumValue={0}
          maximumValue={100}
          value={isSeeking ? seekPosition : 0}
          minimumTrackTintColor="#fff"
          maximumTrackTintColor="#4b5563"
          thumbTintColor="#fff"
          onSlidingStart={() => {
            setIsSeeking(true);
            setSeekPosition(0);
          }}
        />
        <View className="mb-2">
          <View className="flex-row justify-between px-1">
            <Text className="text-gray-400">{formatTime(0)}</Text>
            <Text className="text-gray-400">{formatTime(100)}</Text>
          </View>
        </View>

        {/* Playback Controls */}
        <View className="flex-row items-center justify-center gap-16 mt-6">
          <TouchableOpacity onPress={() => dispatch(playPreviousTrack())}>
            <Ionicons name="play-back" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(togglePlayPause())}>
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={50}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(playNextTrack())}>
            <Ionicons name="play-forward" size={40} color="white" />
          </TouchableOpacity>
        </View>
        {/* Volume Control */}
        <View className="px-4 mt-8 flex-row justify-between">
          <Ionicons name="volume-off" size={20} color="white" />
          <Slider
            minimumValue={0}
            maximumValue={100}
            value={isSeeking ? seekPosition : 0}
            minimumTrackTintColor="#fff"
            maximumTrackTintColor="#4b5563"
            thumbTintColor="#fff"
            onSlidingStart={() => {
              setIsSeeking(true);
              setSeekPosition(0);
            }}
          />
          <Ionicons name="volume-high" size={20} color="white" />
        </View>

        {/* Bottom Controls */}
        <View className="flex-row justify-between items-center my-8 px-20 bottom-0">
          <Pressable>
            <Ionicons name="chatbubble-outline" size={24} color="white" />
          </Pressable>
          <Pressable>
            <Ionicons name="radio-outline" size={24} color="white" />
          </Pressable>
          <Pressable>
            <Ionicons name="list-outline" size={24} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default PlayerScreen;
