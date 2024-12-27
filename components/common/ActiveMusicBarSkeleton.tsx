import { View } from 'react-native';
import React from 'react';
import { BlurView } from 'expo-blur';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const ActiveMusicBarSkeleton = () => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withRepeat(
      withSequence(
        withTiming(0.5, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    ),
  }));

  return (
    <View className="px-2 absolute bottom-[88px] left-0 right-0 z-50">
      <BlurView
        intensity={80}
        tint="dark"
        className="h-16 rounded-2xl overflow-hidden bg-black"
      >
        <View className="flex-1 flex-row items-center justify-between p-3">
          <View className="flex-row items-center gap-2">
            <Animated.View
              style={[animatedStyle]}
              className="w-12 h-12 rounded-lg bg-gray-700"
            />
            <View className="gap-1">
              <Animated.View
                style={[animatedStyle]}
                className="w-32 h-5 rounded-md bg-gray-700"
              />
              <Animated.View
                style={[animatedStyle]}
                className="w-24 h-4 rounded-md bg-gray-700"
              />
            </View>
          </View>
          <Animated.View
            style={[animatedStyle]}
            className="w-8 h-8 rounded-full bg-gray-700"
          />
        </View>
      </BlurView>
    </View>
  );
};

export default ActiveMusicBarSkeleton;
