import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { BACK, BELL, MYBATTLE11, USER_IMG, WALLET } from './ImageAsstes';
import Icon from './Icon';
import Typography from './Typography';
import { MEDIUM, REGULAR } from './AppFonts';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/Slice';

const HomeHeader = ({ user }) => {
    const disptach = useDispatch()
    return (
        <View style={styles.container}>

            <View style={{ marginLeft: 10, flexDirection: "row", alignItems: "center" }}>
                <Icon
                    size={50}
                    source={USER_IMG}
                />
                <View style={{ marginLeft: 5 }}>
                    <Text style={{ fontFamily: MEDIUM, fontSize: 12 }}>Jhon Doe</Text>
                    <Text style={{ fontFamily: REGULAR, fontSize: 10 }}>ID: #1234</Text>
                </View>
            </View>

            <Icon
                size={100}
                source={MYBATTLE11}
                style={{ top: 5 }}
            />
            <View style={styles.icons}>
                <TouchableOpacity onPress={(() => {
                 
                })}>
                    <Icon source={BELL} size={35} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 10 }}>
                    <Icon source={WALLET} size={35} />
                </TouchableOpacity>
            </View>

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
