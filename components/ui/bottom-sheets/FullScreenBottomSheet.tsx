import React, { useCallback, useEffect } from 'react';
import {
  Dimensions,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  GestureEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT;
const THRESHOLD = 0.3;

interface BottomSheetProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  backgroundImage?: string;
}

type ContextType = {
  startY: number;
};

const FullScreenBottomSheet: React.FC<BottomSheetProps> = ({
  children,
  isOpen,
  onClose,
  backgroundImage = 'https://f4.bcbits.com/img/a3736661212_65',
}) => {
  const translateY = useSharedValue(0);
  const active = useSharedValue(false);

  const scrollTo = useCallback((destination: number) => {
    'worklet';
    active.value = destination !== 0;
    translateY.value = withSpring(destination, {
      damping: 50,
      stiffness: 300,
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollTo(MAX_TRANSLATE_Y);
    } else {
      scrollTo(0);
    }
  }, [isOpen, scrollTo]);

  const gestureHandler = useAnimatedGestureHandler<
    GestureEvent<PanGestureHandlerEventPayload>,
    ContextType
  >({
    onStart: (_, context) => {
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateY.value = Math.max(
        context.startY + event.translationY,
        MAX_TRANSLATE_Y
      );
    },
    onEnd: (event) => {
      const shouldClose =
        event.velocityY > 20 ||
        (translateY.value > MAX_TRANSLATE_Y * (1 - THRESHOLD) &&
          event.velocityY > -20);

      if (shouldClose) {
        scrollTo(0);
        runOnJS(onClose)();
      } else {
        scrollTo(MAX_TRANSLATE_Y);
      }
    },
  });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolate.CLAMP
    );

    return {
      borderRadius,
      transform: [{ translateY: translateY.value }],
    };
  });

  const rBackdropStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateY.value,
        [0, MAX_TRANSLATE_Y],
        [0, 0.5],
        Extrapolate.CLAMP
      ),
    };
  });

  return (
    <>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          className="absolute inset-0 bg-black z-50"
          style={rBackdropStyle}
        />
      </TouchableWithoutFeedback>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          className="absolute w-full z-50 rounded-t-[60px] overflow-hidden"
          style={[
            { height: SCREEN_HEIGHT, top: SCREEN_HEIGHT },
            rBottomSheetStyle,
          ]}
        >
          <View className="absolute inset-0 w-full h-full bg-black"></View>
          <Image
            source={{ uri: backgroundImage }}
            className="absolute inset-0 w-full h-full opacity-60"
            blurRadius={20}
          />
          <View className="items-center pt-16 my-2.5">
            <View className="w-12 h-1.5 bg-gray-200 rounded-full" />
          </View>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default FullScreenBottomSheet;
