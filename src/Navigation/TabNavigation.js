import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/Private/HomeScreen';
import Typography from '../Components/Typography';
import { MEDIUM } from '../Components/AppFonts';
import { BLACK, DARK_PURPLE, LIGHT_PURPLE, WHITE } from '../Components/Colors';
import Icon from '../Components/Icon';
import { BACK, HOME, PROFILE, SETTING, WALLET } from '../Components/ImageAsstes';
import Wallet from '../Screens/Private/Wallet';
import Setting from '../Screens/Private/Setting';
import Profile from '../Screens/Private/Profile';


const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.tabContainer}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;
                const onPress = () => {
                    if (!isFocused) {
                        navigation.navigate(route.name);
                    }
                };

                let iconSource;
                switch (route.name) {
                    case 'HomeScreen':
                        iconSource = HOME;
                        break;
                    case 'Wallet':
                        iconSource = WALLET;
                        break;
                    case 'Setting':
                        iconSource = SETTING;
                        break;
                    case 'Profile':
                        iconSource = PROFILE;
                        break;
                    default:
                        iconSource = null;
                }

                const isCenter = route.name;

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={onPress}
                        style={styles.tabButton}
                    >
                        <View style={[
                            styles.iconOuterCircle,
                            isCenter && isFocused && styles.iconOuterCircleFocused
                        ]}>
                            <View style={[
                                styles.iconInnerCircle,
                                isCenter && isFocused && styles.iconInnerCircleFocused
                            ]}>
                                <Icon
                                    tintColor={isFocused ? WHITE : BLACK}
                                    source={iconSource}
                                    size={isCenter && isFocused ? 20 : 18}
                                />
                            </View>
                        </View>
                        <Typography fontFamily={MEDIUM}  size={12} style={[
                            styles.label,
                            isFocused && styles.labelFocused
                        ]}>
                            {route.name}
                        </Typography>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const TabNavigation = () => {
    return (
        <Tab.Navigator
            tabBar={props => <CustomTabBar {...props} />}
            screenOptions={{ headerShown: false }}>
            <Tab.Screen name="HomeScreen" component={HomeScreen} />
            <Tab.Screen name="Wallet" component={Wallet} />
            <Tab.Screen name="Setting" component={Setting} />
            <Tab.Screen name="Profile" component={Profile} />
            
        
        </Tab.Navigator>
    );
};

export default TabNavigation;

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        height: Platform.OS === 'ios' ? 70 : 60,
        backgroundColor: WHITE,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        bottom:Platform.OS==='ios'? 20:10,
    },
    iconOuterCircle: {
        borderRadius: 0,
        backgroundColor: 'transparent',
    },
    iconOuterCircleFocused: {
        borderRadius: 45,
        backgroundColor: WHITE,
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconInnerCircle: {
        backgroundColor: 'transparent',
        borderRadius: 0,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconInnerCircleFocused: {
        backgroundColor: DARK_PURPLE,
        borderRadius: 35,
        width: 55,
        height: 55,
    },
    label: {
        color: BLACK,
        fontSize: 10,
    },
    labelFocused: {
        color: DARK_PURPLE,
    },
});
