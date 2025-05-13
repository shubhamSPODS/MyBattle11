import { View, TextInput, StyleSheet, Text } from 'react-native';
import React from 'react';
import { GREY, LIGHT_GREY, WHITE } from './Colors';
import Typography from './Typography';
import { MEDIUM } from './AppFonts';

const CustomTextInput = ({
  heading = '',
  label,
  onBlur,
  ref,
  value,
  onChangeText,
  placeholder,
  labelStyle,
  inputStyle,
  containerStyle,
  onFocus,
  isPhoneNumber = false,
}) => {
  return (
    <>
      {label &&
        <Typography
          fontFamily={MEDIUM}
          size={13}
          color={GREY}
          style={{ marginLeft: 20, ...labelStyle }}
        >
          {heading}
        </Typography>
      }
      <View style={[styles.searchContainer, containerStyle]}>
        {isPhoneNumber && (
          <View style={styles.prefixContainer}>
            <Text style={styles.prefixText}>+91</Text>
          </View>
        )}
        <TextInput
          ref={ref}
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={GREY}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          keyboardType={isPhoneNumber ? 'number-pad' : 'default'}
          maxLength={isPhoneNumber ? 10 : undefined}
        />
      </View>
    </>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: LIGHT_GREY,
  },
  prefixContainer: {
    borderRightWidth: 1,
    borderColor: LIGHT_GREY,
    paddingRight: 10,
    marginRight: 10,
  },
  prefixText: {
    fontSize: 14,
    color: GREY,
  },
  input: {
    fontSize: 13,
    flex: 1,
  },
});
