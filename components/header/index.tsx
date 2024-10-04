// StickyHeader.js
import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const HEADER_HEIGHT = 60;

const StickyHeader = ({ scrollY }) => {
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[styles.header, { transform: [{ translateY: headerTranslate }] }]}
    >
      <Text style={styles.headerText}>Sticky Header</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Ensure the header is above other content
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default StickyHeader;
