import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { BACK, BELL, LOGO, MYBATTLE11, USER_IMG, WALLET } from './ImageAsstes';
import Icon from './Icon';
import Typography from './Typography';
import { MEDIUM, REGULAR } from './AppFonts';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/Slice';
import { DARK_PURPLE, LINEAR_DARK_PURPLE, LINEAR_LIGHT_PURPLE, WHITE } from './Colors';
import LinearGradient from 'react-native-linear-gradient';

const HomeHeader = ({ user }) => {
    const disptach = useDispatch()
    return (
        <View style={styles.container}>

                <Icon
                    size={40}
                    source={LOGO}
                />
            <Image
                source={MYBATTLE11}
                style={{ width:100,height:60,resizeMode:"contain" , marginLeft: 30,}}
            />
           
            <LinearGradient
              colors={[LINEAR_LIGHT_PURPLE, LINEAR_DARK_PURPLE]}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 1}}
              style={{
                borderRadius: 59,
                flexDirection: 'row',
                marginTop: 2,
                // height: 30,
                width: 90,
                borderWidth: 0.6,
                borderColor: DARK_PURPLE,
                marginLeft: 10,
              }}>
            <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    height: 28,
                    width: 28,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    borderWidth: 0.6,
                    borderColor: DARK_PURPLE,
                  }}>
                  <Image
                    style={{height: 20, width: 20}}
                    resizeMode="contain"
                    source={WALLET}
                  />
                </View>
                <View>
                  <Typography
                    style={{marginTop: -1,left:5 }}
                    size={12}
                    fontFamily={MEDIUM}
                    color={WHITE}>
                    ₹ 1000
                  </Typography>
                </View>
              </View>
              </TouchableOpacity>
              </LinearGradient>
              

        </View>
    );
};

export default HomeHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        elevation:0.5,
    },
    userInfo: {
        flexDirection: 'row',
    },

    name: {
        fontWeight: '600',
        color: '#000',
    },
    userId: {
        fontSize: 12,
        color: '#888',
    },
    logo: {
        fontWeight: 'bold',
        color: '#8C28F1',
        fontSize: 16,
    },
    icons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
