import { StackScreenWithSearchBar } from '@/constants/layout';
import { Stack } from 'expo-router';

import React from 'react';

const LibraryScreenLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default LibraryScreenLayout;
