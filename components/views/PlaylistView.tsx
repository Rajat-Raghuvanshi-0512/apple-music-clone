import { FlatList } from 'react-native';
import React from 'react';
import PlaylistCard from '../playlist/PlaylistCard';

const PlaylistView = () => {
  return (
    <FlatList data={[1, 2, 3, 4]} renderItem={({ item }) => <PlaylistCard />} />
  );
};

export default PlaylistView;
