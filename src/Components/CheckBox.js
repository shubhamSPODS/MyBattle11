import React from 'react';
import {StyleSheet, TouchableOpacity, View, Animated} from 'react-native';
import Icon from './Icon';
import { CHECK } from './ImageAsstes';
import { BLACK, DARK_PURPLE, WHITE } from './Colors';

const Checkbox = ({onPress, value, disabled, type, CheckBoxStyle}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      style={styles.container}>
      <View style={[styles.checkbox, value && styles.checkedBox, CheckBoxStyle]}>
        {value && (
          <Icon 
            source={CHECK}
            size={12}
            resizeMode='contain'
            tintColor={WHITE}
            style={styles.checkboxTick}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: DARK_PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  checkedBox: {
    backgroundColor: DARK_PURPLE,
    borderColor: DARK_PURPLE,
  },
  checkboxTick: {
    width: '80%',
    height: '80%',
  }
});
