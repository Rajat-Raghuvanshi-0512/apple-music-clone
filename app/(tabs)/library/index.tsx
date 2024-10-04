import TopBar from '@/components/header/TopBar';
import TracksList from '@/components/tracks/TracksList';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LibraryScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="px-5">
        <TouchableOpacity>
          <Text className="text-rose-500 text-right text-lg mr-1">Edit</Text>
        </TouchableOpacity>
        <View className="my-5">
          <TopBar
            title="Library"
            imageUrl="https://plus.unsplash.com/premium_photo-1673697239909-e11521d1ba94?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </View>
        <TracksList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LibraryScreen;
