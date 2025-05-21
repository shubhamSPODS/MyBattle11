import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Platform, StatusBar } from 'react-native';
import { BACK, BELL, LOGO, MYBATTLE11, USER_IMG, WALLET } from './ImageAsstes';
import Icon from './Icon';
import Typography from './Typography';
import { MEDIUM, REGULAR } from './AppFonts';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/Slice';
import { DARK_PURPLE, LINEAR_DARK_PURPLE, LINEAR_LIGHT_PURPLE, WHITE } from './Colors';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeHeader = ({ user }) => {
    const disptach = useDispatch()
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={WHITE}
                translucent={true}
            />
            <View style={styles.container}>
                <Icon
                    size={40}
                    source={LOGO}
                />
                <Image
                    source={MYBATTLE11}
                    style={styles.logoImage}
                />
               
                <LinearGradient
                    colors={[LINEAR_LIGHT_PURPLE, LINEAR_DARK_PURPLE]}
                    start={{x: 1, y: 0}}
                    end={{x: 0, y: 1}}
                    style={styles.walletContainer}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {}}>
                        <View style={styles.walletContent}>
                            <View style={styles.walletIconContainer}>
                                <Image
                                    style={styles.walletIcon}
                                    resizeMode="contain"
                                    source={WALLET}
                                />
                            </View>
                            <View>
                                <Typography
                                    style={styles.walletText}
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
        </SafeAreaView>
    );
};

export default HomeHeader;

const styles = StyleSheet.create({
    safeArea: {
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: WHITE,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ?10: 0,
        paddingBottom: 10,
        elevation: 0.5,
    },
    logoImage: {
        width: 100,
        height: 60,
        resizeMode: "contain",
        marginLeft: 30,
    },
    walletContainer: {
        borderRadius: 59,
        flexDirection: 'row',
        marginTop: 2,
        width: 90,
        borderWidth: 0.6,
        borderColor: DARK_PURPLE,
        marginLeft: 10,
    },
    walletContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    walletIconContainer: {
        height: 28,
        width: 28,
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 0.6,
        borderColor: DARK_PURPLE,
    },
    walletIcon: {
        height: 20,
        width: 20,
    },
    walletText: {
        marginTop: -1,
        left: 5,
    },
});
