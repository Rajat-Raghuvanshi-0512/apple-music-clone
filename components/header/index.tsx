import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  Extrapolation,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

const HEADER_HEIGHT = 50;
const SCROLL_THRESHOLD = 40;

interface HeaderProps {
  scrollY: SharedValue<number>;
  title: string;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
}

const Header = ({
  scrollY,
  title,
  leftComponent,
  rightComponent,
}: HeaderProps) => {
  const titleAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, SCROLL_THRESHOLD], [0, 1], {
      extrapolateLeft: Extrapolation.CLAMP,
      extrapolateRight: Extrapolation.CLAMP,
    });

    return {
      opacity,
    };
  });

  // Create a separate animated style for the blur view
  const blurViewStyle = {
    height: HEADER_HEIGHT + 100,
    position: 'absolute' as const,
    top: -100,
    backgroundColor: 'rgba(10,10,10,0.2)',
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[StyleSheet.absoluteFillObject, titleAnimatedStyle]}
      >
        <BlurView
          intensity={70}
          tint="systemUltraThinMaterialDark"
          style={[StyleSheet.absoluteFillObject, blurViewStyle]}
        />
      </Animated.View>
      <View style={styles.content}>
        <View style={styles.left}>{leftComponent}</View>
        <Animated.Text
          style={[styles.title, titleAnimatedStyle]}
          numberOfLines={1}
        >
          {title}
        </Animated.Text>
        <View style={styles.right}>{rightComponent}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  left: {
    width: 40,
    justifyContent: 'center',
  },
  right: {
    width: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
});

export default Header;
