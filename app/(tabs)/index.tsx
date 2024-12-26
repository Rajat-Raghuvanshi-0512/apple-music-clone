import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '@/components/header/TopBar';
import { View } from 'react-native';

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View className="p-5">
        <TopBar title="Home" />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
