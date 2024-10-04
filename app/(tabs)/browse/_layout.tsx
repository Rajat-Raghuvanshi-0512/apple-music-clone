import { StackScreenWithSearchBar } from '@/constants/layout';
import { Stack } from 'expo-router';

import React from 'react';
import { View } from 'react-native';

const BrowseScreenLayout = () => {
  return (
    <View className="flex-1">
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: 'Browse',
            ...StackScreenWithSearchBar,
          }}
        />
      </Stack>
    </View>
  );
};

export default BrowseScreenLayout;
