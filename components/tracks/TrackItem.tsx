import { unknownTrackImageUri } from '@/constants/images';
import { cn } from '@/utils';
import React, { FC } from 'react';
import { Image, TouchableHighlight, View } from 'react-native';
import { Text } from '../ui/text';
import ThreeDots from '../ThreeDots';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { playTrack } from '@/store/slices/musicSlice';

interface ITrackItemProps {
  track: {
    title: string;
    artist?: string;
    image?: string;
    url: string;
    artwork?: string;
  };
}

const TrackItem: FC<ITrackItemProps> = ({ track }) => {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.music.currentTrack);
  const isActiveTrack = currentTrack?.url === track.url;

  const handlePress = () => {
    dispatch(
      playTrack({
        title: track.title,
        artist: track.artist,
        image: track.image,
        url: track.url,
      })
    );
  };

  return (
    <TouchableHighlight onPress={handlePress}>
      <View className="flex-row items-center gap-4">
        <View>
          <Image
            source={{
              uri: track.image ?? unknownTrackImageUri,
            }}
            className={cn(
              'w-[50px] h-[50px] rounded-lg',
              isActiveTrack && 'opacity-60'
            )}
          />
        </View>
        <View className=" border-b-[0.5px] border-gray-800 flex-1 py-2 flex-row justify-between items-center">
          <View className="flex-[0.9]">
            <Text
              numberOfLines={1}
              className={cn('font-semibold text-white text-lg')}
            >
              {track.title}
            </Text>
            <Text
              numberOfLines={1}
              className={cn('font-semibold max-w-[90%] text-sm text-gray-400')}
            >
              {track.artist ?? 'Unknown artist'}
            </Text>
          </View>
          <View className="flex-[0.1]">
            <ThreeDots />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default TrackItem;
