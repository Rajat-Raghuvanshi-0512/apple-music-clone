import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue } from 'react-native-reanimated';
import Header from '@/components/header';
import ThreeDots from '@/components/ThreeDots';
import BackButton from '@/components/ui/back-button';
import TracksList from '@/components/tracks/TracksList';
import { ActionButton } from '@/components/buttons/action-button';

const PlaylistScreen = () => {
  const { name, image, creator, id } = useLocalSearchParams<{
    id: string;
    name: string;
    image: string;
    creator: string;
  }>();
  const scrollY = useSharedValue(0);

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Playlist Header */}
      <Header
        scrollY={scrollY}
        title={name}
        leftComponent={<BackButton iconColor="#f43f5e" />}
        rightComponent={<ThreeDots dotClassName="bg-rose-500" />}
      />
      <ScrollView
        onScroll={(event) => {
          scrollY.value = event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={56}
        contentContainerClassName="pb-[110px]"
      >
        <View className="p-4 items-center">
          <Animated.Image
            sharedTransitionTag={`playlist-${id}`}
            source={{
              uri: image,
            }}
            alt="Playlist cover"
            className="w-[70%] h-72 rounded-xl self-center "
          />

          <View className="mt-4">
            <Text className="text-2xl font-bold text-center">{name}</Text>
            <Text className="text-rose-500 text-xl font-semibold mt-1 text-center">
              {creator}
            </Text>
          </View>
        </View>
        <View className="px-4 flex-row gap-4 mb-6">
          <View className="flex-1">
            <ActionButton
              label="Play"
              onPress={() => {
                // Add your play logic here
              }}
            />
          </View>
          <View className="flex-1">
            <ActionButton
              label="Shuffle"
              icon="shuffle"
              onPress={() => {
                // Add your shuffle logic here
              }}
            />
          </View>
        </View>
        <View className="px-4">
          <TracksList />
          <Text className="text-gray-400 py-3">23 songs,1 hour 11 mins</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlaylistScreen;
