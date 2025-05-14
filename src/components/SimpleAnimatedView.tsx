import React, { useEffect, useRef } from 'react';
import { Animated, ViewProps, StyleSheet } from 'react-native';

type AnimationType = 'fadeIn' | 'slideInUp' | 'slideInLeft' | 'slideInRight';

interface SimpleAnimatedViewProps extends ViewProps {
  animation: AnimationType;
  duration?: number;
  delay?: number;
  children: React.ReactNode;
}

const SimpleAnimatedView = ({
  animation,
  duration = 500,
  delay = 0,
  children,
  style,
  ...props
}: SimpleAnimatedViewProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(30)).current;
  const translateXAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Configuration de l'animation selon le type
    if (animation === 'slideInLeft') {
      translateXAnim.setValue(-100);
    }
    
    if (animation === 'slideInRight') {
      translateXAnim.setValue(100);
    }

    // Animation avec délai
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
      animation === 'slideInUp'
        ? Animated.timing(translateYAnim, {
            toValue: 0,
            duration,
            delay,
            useNativeDriver: true,
          })
        : Animated.timing(translateYAnim, { toValue: 0, duration: 0, useNativeDriver: true }),
      ['slideInLeft', 'slideInRight'].includes(animation)
        ? Animated.timing(translateXAnim, {
            toValue: 0,
            duration,
            delay,
            useNativeDriver: true,
          })
        : Animated.timing(translateXAnim, { toValue: 0, duration: 0, useNativeDriver: true }),
    ]).start();
  }, []);

  // Création du style animé
  const animatedStyle = {
    opacity: fadeAnim,
    transform: [
      { translateY: animation === 'slideInUp' ? translateYAnim : 0 },
      { translateX: ['slideInLeft', 'slideInRight'].includes(animation) ? translateXAnim : 0 },
    ],
  };

  return (
    <Animated.View style={[animatedStyle, style]} {...props}>
      {children}
    </Animated.View>
  );
};

export default SimpleAnimatedView; 