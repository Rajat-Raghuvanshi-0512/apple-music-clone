import TopBar from '@/components/header/TopBar';
import ListItem from '@/components/ListItem';
import PlaylistCard from '@/components/playlist/PlaylistCard';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import React from 'react';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import library from '@/assets/data/library.json';

const LibraryScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-5"
        className="px-5"
      >
        <TouchableOpacity>
          <Text className="text-rose-500 text-right text-lg mr-1">Edit</Text>
        </TouchableOpacity>
        <Box className="my-5">
          <TopBar
            title="Library"
            imageUrl="https://plus.unsplash.com/premium_photo-1673697239909-e11521d1ba94?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </Box>
        <Box className="mb-5">
          <ListItem name="Playlists" icon="my-library-music" />
          <ListItem name="Downloaded" icon="download" />
        </Box>
        <Text className="font-semibold py-3" size="2xl">
          Recently Added
        </Text>

        <FlatList
          data={library}
          renderItem={({ item }) => (
            <PlaylistCard
              id={item.url}
              name={item.title}
              image={
                item.artwork ??
                'https://plus.unsplash.com/premium_photo-1673697239909-e11521d1ba94?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
              creator={item.artist ?? 'Unknown artist'}
            />
          )}
          keyExtractor={(item) => item.url}
          numColumns={2}
          columnWrapperClassName="gap-4"
          contentContainerClassName="gap-4"
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LibraryScreen;
