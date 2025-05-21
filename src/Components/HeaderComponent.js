import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import Icon from './Icon';
import { BACK, WALLET } from './ImageAsstes';
import Typography from './Typography';
import { BLACK, WHITE } from './Colors';
import { BOLD, SEMI_BOLD } from './AppFonts';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HeaderComponent = ({ title, onWalletPress, walletIcon, style }) => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={WHITE}
        translucent={true}
      />
      <View style={[styles.container, { ...style }]}>
        <View style={styles.side}>
          <TouchableOpacity 
            onPress={() => {
              navigation.goBack()
            }}
            style={styles.backButton}
          >
            <Icon source={BACK} size={40} color={BLACK} />
          </TouchableOpacity>
        </View>

        <Typography style={styles.title}>{title}</Typography>

        <View style={styles.side}>
          {walletIcon && (
            <TouchableOpacity 
              onPress={onWalletPress}
              style={styles.walletButton}
            >
              <Icon source={WALLET} resizeMode='contain' size={40} color="#000" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: WHITE,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 10: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  side: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    padding: 5,
  },
  walletButton: {
    padding: 5,
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: BLACK,
    textAlign: 'center',
    fontFamily: SEMI_BOLD,
  },
});
