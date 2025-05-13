import React from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import { BLACK, WHITE } from './Colors';
import { BOLD, REGULAR } from './AppFonts';

const Typography = ({ 
  children, 
  style, 
  color = `${BLACK}`, 
  fontFamily=`${REGULAR}`,
  textAlign,
  size=15,
  textDecorationLine,
  onPress,
  ...props 
}) => {
  return (
    <Text
      style={[ {textDecorationLine:textDecorationLine, fontFamily:fontFamily, color, fontSize:size, textAlign: textAlign }, style]}
      {...props}
      onPress={onPress}
    >
      {children}
    </Text>
  );
};



export default Typography;


export const FULL_WIDTH = Dimensions.get('screen').width
export const FULL_HEIGHT = Dimensions.get('screen').height

