import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Typography, { FULL_WIDTH } from './Typography';
import { SEMI_BOLD } from './AppFonts';
import LinearGradient from 'react-native-linear-gradient';

const CommonButton = ({
    title,
    onPress,
    disabled = false,
    style,
    textStyle,
}) => {
    const gradientColors = ['#6306B2', '#2A034C'];

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            disabled={disabled}
            style={ { alignSelf: 'center', width: '90%' ,...style}}
        >
            <LinearGradient
                colors={disabled ? ['#ccc', '#ccc'] : gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
            >
                <Typography style={[styles.text, textStyle]}>
                    {title}
                </Typography>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default CommonButton;

export const CommonRedButton = ({
    title,
    onPress,
    disabled = false,
    style,
    textStyle,
}) => {
    const gradientColors = ['#F37272', '#C90202'];

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            disabled={disabled}
            style={ { alignSelf: 'center', width: '90%' ,...style}}
        >
            <LinearGradient
                colors={disabled ? ['#ccc', '#ccc'] : gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
            >
                <Typography style={[styles.text, textStyle]}>
                    {title}
                </Typography>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    text: {
        fontSize: 16,
        color: '#fff',
        fontFamily: SEMI_BOLD,
    },
});
