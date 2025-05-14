import React, { useEffect } from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

type AnimationType = 'fadeIn' | 'slideInUp' | 'slideInLeft' | 'slideInRight';

interface AnimatedViewProps extends ViewProps {
  animation: AnimationType;
  duration?: number;
  delay?: number;
  children: React.ReactNode;
}

const AnimatedView = ({
  animation,
  duration = 500,
  delay = 0,
  children,
  style,
  ...props
}: AnimatedViewProps) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);
  const translateX = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration,
        easing: Easing.out(Easing.quad),
      })
    );

    if (animation === 'slideInUp') {
      translateY.value = withDelay(
        delay,
        withTiming(0, {
          duration,
          easing: Easing.out(Easing.quad),
        })
      );
    }

    if (animation === 'slideInLeft') {
      translateX.value = -100;
      translateX.value = withDelay(
        delay,
        withTiming(0, {
          duration,
          easing: Easing.out(Easing.quad),
        })
      );
    }

    if (animation === 'slideInRight') {
      translateX.value = 100;
      translateX.value = withDelay(
        delay,
        withTiming(0, {
          duration,
          easing: Easing.out(Easing.quad),
        })
      );
    }
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: animation === 'slideInUp' ? translateY.value : 0 },
        { translateX: ['slideInLeft', 'slideInRight'].includes(animation) ? translateX.value : 0 },
      ],
    };
  });

  return (
    <Animated.View style={[animatedStyle, style]} {...props}>
      {children}
    </Animated.View>
  );
};

export default AnimatedView; 