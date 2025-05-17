import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const Loader = ({ visible = false }) => {
  if (!visible) return null;

  return (
    <View style={styles.fullscreenOverlay}>
      <LottieView
        source={require('../assets/LottieIcons/loader.json')}
        autoPlay
        loop
        style={{ width: 300, height: 300 }}
      />
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Ensure it's on top of other content
  },
});

export default Loader;
