import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from './Icon';
import { BACK, WALLET } from './ImageAsstes';
import Typography from './Typography';
import { BLACK } from './Colors';
import { BOLD, SEMI_BOLD } from './AppFonts';
import { useNavigation } from '@react-navigation/native';

const HeaderComponent = ({ title, onWalletPress,walletIcon }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.side}>
        <TouchableOpacity onPress={() => {
          navigation.goBack()
        }}>
          <Icon source={BACK} size={40} color={BLACK} />
        </TouchableOpacity>
      </View>

      <Typography style={styles.title}>{title}</Typography>

      <View style={styles.side}>
      {walletIcon &&  <TouchableOpacity onPress={onWalletPress}>
          <Icon source={WALLET} resizeMode='contain' size={40} color="#000" />
        </TouchableOpacity>}
      </View>
    </View>
  );
};

export default HeaderComponent;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  side: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    top: 10
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: BLACK,
    textAlign: 'center',
    top: 10,
    fontFamily: SEMI_BOLD
  },
});
