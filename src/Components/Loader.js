import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';
import Typography from './Typography';
import { WHITE, GOLDEN } from './Colors';
import { MEDIUM, SEMI_BOLD } from './AppFonts';

const Loader = ({ visible = false, textAppear = false }) => {
  const [dots, setDots] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const animationRef = useRef(null);

  useEffect(() => {
    if (visible) {
      // Reset animations to initial state
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);

      // Start fade in animation
      const animation = Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.elastic(1),
          useNativeDriver: true,
        })
      ]);

      animationRef.current = animation;
      animation.start();

      // Animate dots
      let count = 0;
      const interval = setInterval(() => {
        count = (count + 1) % 4;
        setDots('.'.repeat(count));
      }, 500);

      return () => {
        clearInterval(interval);
        if (animationRef.current) {
          animationRef.current.stop();
        }
      };
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.fullscreenOverlay}>
      <Animated.View style={[
        styles.contentContainer,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }
      ]}>
        <LottieView
          source={require('../assets/LottieIcons/loader.json')}
          autoPlay
          loop
          style={styles.lottieAnimation}
          onError={(error) => console.error('Lottie animation error:', error)}
        />
        {textAppear && (
          <>
            <View style={styles.textContainer}>
              <Typography size={30} fontFamily={SEMI_BOLD} color={GOLDEN} style={styles.mainText}>
                Finding Match
              </Typography>
              <Typography size={30} fontFamily={SEMI_BOLD} color={GOLDEN} style={styles.dotsText}>
                {dots}
              </Typography>
            </View>
            <Typography size={12} color={WHITE} fontFamily={MEDIUM}>
              Get ready for an epic battle!
            </Typography>
          </>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullscreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieAnimation: {
    width: 300,
    height: 300,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  mainText: {
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  dotsText: {
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subText: {
    marginTop: 10,
    opacity: 0.8,
  }
});

export default Loader;
