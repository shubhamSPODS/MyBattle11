import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HomeHeader from '../../Components/HomeHeader'
import { BLACK, LIGHT_PURPLE, WHITE } from '../../Components/Colors'
import Icon from '../../Components/Icon'
import Typography, { FULL_WIDTH } from '../../Components/Typography'
import { ADD, BACK, BANNER, FANTASY_BANNER, LUDO_BANNER, REFER, REWARDS, RUMMY_BANNER, WINNERS } from '../../Components/ImageAsstes'
import LinearGradient from 'react-native-linear-gradient'
import { SEMI_BOLD } from '../../Components/AppFonts'
import { logout } from '../../Redux/Slice'
import { useDispatch } from 'react-redux'

const HomeScreen = () => {
    const dispatch = useDispatch();
    return (

        <View style={{ flex: 1, backgroundColor: WHITE }}>

            <HomeHeader />
         <ScrollView>
            <Image
                source={BANNER}
                style={{ width: FULL_WIDTH - 50, alignSelf: "center", height: 180, }}
            />
            <View>
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
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                    }}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity activeOpacity={0.9} style={{ alignItems: "center", marginHorizontal: 15 }}
                            onPress={() => {
                                dispatch(logout());

                            }}
                        >
                            <LinearGradient
                                colors={['#6412AB', '#461276']}
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 60,
                                    height: 60,
                                    borderRadius: 30,
                                }}
                            >
                                <Icon source={item.img} size={24} />
                            </LinearGradient>
                            <Typography size={13} style={{ marginTop: 5, color: '#000' }}>{item.text}</Typography>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <Typography color={BLACK} fontFamily={SEMI_BOLD} style={{ marginHorizontal: 20, marginVertical: 15 }}>Popular games</Typography>


            <Image style={{
                width: FULL_WIDTH - 50,
                height: 200,
                alignSelf: "center",
                resizeMode: "cover",
            }}
                source={FANTASY_BANNER}
            ></Image>

            <Image style={{
                width: FULL_WIDTH - 50,
                height: 200,
                alignSelf: "center",
                resizeMode: "cover",
            }}
                source={LUDO_BANNER}
            ></Image>

             <Image style={{
                width: FULL_WIDTH - 50,
                height: 200,
                alignSelf: "center",
                resizeMode: "cover",
            }}
                source={RUMMY_BANNER}
            ></Image>
            <View style={{height:50}}></View>
            </ScrollView>

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})