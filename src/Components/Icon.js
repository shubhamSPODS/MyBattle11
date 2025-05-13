import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icon = ({ source, size = 25, tintColor, style, resizeMode = 'contain' }) => {
    return (
        <Image
            source={source}
            style={[
                styles.icon,
                { width: size, height: size, tintColor: tintColor },
                style,
            ]}
            resizeMode={resizeMode}
        />
    );
};

export default Icon;

const styles = StyleSheet.create({
    icon: {
        resizeMode: 'contain',
    },
});
