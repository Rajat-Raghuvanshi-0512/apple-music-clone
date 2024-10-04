import { unknownTrackImageUri } from '@/constants/images';
import { cn } from '@/utils';
import React, { FC } from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import ThreeDots from '../ThreeDots';

interface ITrackItemProps {
  track: {
    title: string;
    artist?: string;
    image?: string;
  };
}

const TrackItem: FC<ITrackItemProps> = ({ track }) => {
  const isActiveTrack = false;
  return (
    <TouchableHighlight>
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
              className={cn(
                'font-semibold text-white text-lg',
                isActiveTrack && ''
              )}
            >
              {track.title}
            </Text>
            <Text
              numberOfLines={1}
              className={cn(
                'font-semibold max-w-[90%] text-sm text-gray-400 border-b border-gray-500',
                isActiveTrack && ''
              )}
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
