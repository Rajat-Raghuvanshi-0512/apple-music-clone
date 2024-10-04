import { StackScreenWithSearchBar } from '@/constants/layout';
import { Stack } from 'expo-router';

import React from 'react';
import { View } from 'react-native';

const RadioScreenLayout = () => {
  return (
    <View className="flex-1">
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: 'Radio',
            ...StackScreenWithSearchBar,
          }}
        />
      </Stack>
    </View>
  );
};

export default RadioScreenLayout;
