import React from 'react';
import { Pressable } from '../ui/pressable';
import { Text } from '../ui/text';
import { useRouter } from 'expo-router';
import Animated from 'react-native-reanimated';

const PlaylistCard = ({
  id,
  name,
  image,
  creator,
}: {
  id: string;
  name: string;
  image: string;
  creator: string;
}) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: '/(tabs)/library/playlist/[id]',
          params: { id, name, image, creator },
        });
      }}
      className="flex-1"
    >
      <Animated.Image
        sharedTransitionTag={`playlist-${id}`}
        className="rounded-xl w-full object-contain h-52"
        source={{
          uri: image,
        }}
        alt="image"
      />
      <Text className="font-semibold mt-1">{name}</Text>
      <Text className="text-gray-500">{creator}</Text>
    </Pressable>
  );
};

export default PlaylistCard;
