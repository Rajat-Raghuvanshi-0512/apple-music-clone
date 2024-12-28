import React, { useState } from "react";
import { View } from "react-native";
import { Image } from "../ui/image";
import { Text } from "../ui/text";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { unknownTrackImageUri } from "@/constants/images";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "../ui/pressable";
import { togglePlayPause } from "@/store/slices/musicSlice";
import Slider from "@react-native-community/slider";
import TrackPlayer, { useProgress } from 'react-native-track-player';

const PlayerScreen = () => {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying } = useAppSelector((state) => state.music);
  const progress = useProgress();
  
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
    <View className="flex-1 bg-neutral-800">
      {/* Album Art */}
      <View className="px-6 mt-8 items-center justify-center">
        <Image
          source={{ uri: displayImage ?? unknownTrackImageUri }}
          className="w-full h-80 aspect-square rounded-lg"
          alt="album-cover"
        />
      </View>
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 pt-14 pb-4">
        <View>
          <Text className="text-white text-xl font-semibold">
            {currentTrack.title}
          </Text>
          <Text className="text-gray-400 text-lg">
            {currentTrack.artist ?? "Unknown artist"}
          </Text>
        </View>
        <MaterialIcons name="more-horiz" size={24} color="white" />
      </View>

      {/* Controls */}
      <View className="px-4 mt-8">
        {/* Progress Bar */}
        <Slider
          minimumValue={0}
          maximumValue={progress.duration}
          value={isSeeking ? seekPosition : progress.position}
          minimumTrackTintColor="#fff"
          maximumTrackTintColor="#4b5563"
          thumbTintColor="#fff"
          onSlidingStart={() => {
            setIsSeeking(true);
            setSeekPosition(progress.position);
          }}
          onValueChange={(value) => {
            setSeekPosition(value);
          }}
          onSlidingComplete={async (value) => {
            await TrackPlayer.seekTo(value);
            setIsSeeking(false);
          }}
        />
        <View className="mb-2">
          <View className="flex-row justify-between px-1">
            <Text className="text-gray-400">{formatTime(progress.position)}</Text>
            <Text className="text-gray-400">
              {formatTime(progress.duration - progress.position)}
            </Text>
          </View>
        </View>

        {/* Playback Controls */}
        <View className="flex-row items-center justify-center gap-16 mt-6">
          <Pressable>
            <Ionicons name="play-skip-back" size={35} color="white" />
          </Pressable>
          <Pressable onPress={() => dispatch(togglePlayPause())}>
            <Ionicons
              name={isPlaying ? "pause-circle" : "play-circle"}
              size={70}
              color="white"
            />
          </Pressable>
          <Pressable>
            <Ionicons name="play-skip-forward" size={35} color="white" />
          </Pressable>
        </View>

        {/* Bottom Controls */}
        <View className="flex-row justify-between items-center my-8 px-4">
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
