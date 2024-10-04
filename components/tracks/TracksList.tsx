import React from 'react';
import { FlatList } from 'react-native';
import data from '@/assets/data/library.json';
import TrackItem from './TrackItem';

const TracksList = () => {
  return (
    <FlatList
      data={data}
      scrollEnabled={false}
      renderItem={({ item }) => (
        <TrackItem
          track={{
            title: item.title,
            artist: item.artist,
            image: item.artwork,
          }}
          key={item.artwork}
        />
      )}
    />
  );
};

export default TracksList;
