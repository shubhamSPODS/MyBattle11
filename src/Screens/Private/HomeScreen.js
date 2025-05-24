import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HomeHeader from '../../Components/HomeHeader'
import { BLACK, LIGHT_PURPLE, LINEAR_DARK_PURPLE, LINEAR_LIGHT_PURPLE, WHITE } from '../../Components/Colors'
import Icon from '../../Components/Icon'
import Typography, { FULL_WIDTH } from '../../Components/Typography'
import { ADD, BACK, BANNER, FANTASY_BANNER, LUDO_BANNER, REFER, REWARDS, RUMMY_BANNER, WINNERS } from '../../Components/ImageAsstes'
import LinearGradient from 'react-native-linear-gradient'
import { SEMI_BOLD } from '../../Components/AppFonts'
import { logout } from '../../Redux/Slice'
import { useDispatch } from 'react-redux'

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <HomeHeader />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <View style={{
                    width: FULL_WIDTH - 30,
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor:'red'
                }}>
                    <FlatList
                        data={[
                            { id: 0, img: ADD, text: "Add Money" },
                            { id: 1, img: REWARDS, text: "Rewards" },
                            { id: 2, img: REFER, text: "Refers" },
                            { id: 3, img: WINNERS, text: "Winners" },
                         
                        ]}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            alignSelf:"center"
                        }}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                activeOpacity={0.9} 
                                style={{ alignItems: "center", marginHorizontal: 15 }}
                                onPress={() => {
                                    if (item.id === 4) {
                                        navigation.navigate('CreateTeamScreen');
                                    } else if (item.id === 5) {
                                        navigation.navigate('CreateContestsScreen');
                                    } else if (item.id === 0) {
                                        // Handle Add Money
                                    } else if (item.id === 1) {
                                        // Handle Rewards
                                    } else if (item.id === 2) {
                                        // Handle Refers
                                    } else if (item.id === 3) {
                                        // Handle Winners
                                    }
                                }}
                            >
                                <LinearGradient
                                    colors={[LINEAR_LIGHT_PURPLE, LINEAR_DARK_PURPLE]}
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: 50,
                                        height: 50,
                                        borderRadius: 30,
                                    }}
                                >
                                    <Icon source={item.img} size={20} />
                                </LinearGradient>
                                <Typography size={12} style={{ marginTop: 5, color: '#000' }}>{item.text}</Typography>
                            </TouchableOpacity>
                        )}
                    />
                </View> */}
                <Typography color={BLACK} fontFamily={SEMI_BOLD} style={{ marginHorizontal: 30, marginVertical: 10 }}>Popular games</Typography>

                <TouchableOpacity activeOpacity={0.9} onPress={() => {
                    // navigation.navigate('ContestsScreen')
                    navigation.navigate('MyContest')

                }}>
                    <Image style={{
                        width: FULL_WIDTH - 40,
                        height: 180,
                        alignSelf: "center",
                        resizeMode: "contain",
                        borderRadius: 10
                    }}
                        source={FANTASY_BANNER}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('LudoGameMode')
                }} activeOpacity={0.9}>
                    <Image style={{
                        width: FULL_WIDTH - 40,
                        height: 180,
                        alignSelf: "center",
                        resizeMode: "contain",
                        borderRadius: 10
                    }}
                        source={LUDO_BANNER}
                    />
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>{
                     navigation.navigate('RummyGameMode')
                }} activeOpacity={0.9}>
                    <Image style={{
                        width: FULL_WIDTH - 40,
                        height: 180,
                        alignSelf: "center",
                        resizeMode: "contain",
                        borderRadius: 10
                    }}
                        source={RUMMY_BANNER}
                    />
                </TouchableOpacity>
                <View style={{ height: 50 }}></View>
            </ScrollView>

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})