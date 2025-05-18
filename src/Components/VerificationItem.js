import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import Typography from './Typography';
import CommonButton from './CommonButton';
import { BLACK, DARK_PURPLE, GRAY_TEXT, GREY, LIGHT_GREY, LINEAR_LIGHT_PURPLE } from './Colors';
import { MEDIUM } from './AppFonts';

const VerificationItem = ({
  iconSource,
  title,
  description,
  buttonText,
  onButtonPress,
  isVerified = false,
}) => {
  return (
    <View style={styles.container}>
      <Icon source={iconSource} size={24} tintColor={DARK_PURPLE}  style={styles.icon} />
      <View style={styles.textContainer}>
        <Typography style={styles.title}>{title}</Typography>
        <Typography style={styles.description}>{description}</Typography>
      </View>
      {isVerified ? (
        <View style={styles.verifiedButton}>
          <Typography style={styles.verifiedText}>Verified</Typography>
        </View>
      ) : (
        <CommonButton
          title={buttonText}
          onPress={onButtonPress}
          style={styles.verifyButton}
          textStyle={styles.verifyButtonText}
        />

      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  icon: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: BLACK,
    fontFamily:MEDIUM
  },
  description: {
    fontSize: 12,
    color: GREY,
    marginTop: 4,
  },
  verifyButton: {
    width: '30%',
    paddingVertical: 0, 
    marginVertical: 0, 
  },
  verifyButtonText: {
    fontSize: 12,
  },
  verifiedButton: {
    backgroundColor: '#d4edda', 
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  verifiedText: {
    color: '#155724',
    fontSize: 12,
    fontWeight: 'bold',
  }
});

export default VerificationItem; 