import { Stack } from 'expo-router';

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const LibraryScreenLayout = () => {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="playlist" />
      </Stack>
    </SafeAreaProvider>
  );
};

export default LibraryScreenLayout;
