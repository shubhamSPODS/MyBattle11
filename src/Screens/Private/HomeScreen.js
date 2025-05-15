import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import HomeHeader from '../../Components/HomeHeader'
import { BLACK, LIGHT_PURPLE, LINEAR_DARK_PURPLE, LINEAR_LIGHT_PURPLE, WHITE } from '../../Components/Colors'
import Icon from '../../Components/Icon'
import Typography, { FULL_WIDTH } from '../../Components/Typography'
import { ADD, BACK, BANNER, FANTASY_BANNER, LUDO_BANNER, REFER, REWARDS, RUMMY_BANNER, WINNERS } from '../../Components/ImageAsstes'
import LinearGradient from 'react-native-linear-gradient'
import { SEMI_BOLD } from '../../Components/AppFonts'
import { logout } from '../../Redux/Slice'
import { useDispatch } from 'react-redux'
import { getRequest } from '../../Backend/Backend'

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const apiData =async()=>{
        try {
          const publicData = await getRequest('/public');
        
        } catch (error) {
          console.log(error,'==errror');
          
        }
       }
       useEffect(()=>{
        apiData()
       },[])
    return (

        <View style={{ flex: 1, backgroundColor: WHITE }}>

            <HomeHeader />
            <ScrollView>
                <Image
                    source={BANNER}
                    style={{ width: FULL_WIDTH - 50, alignSelf: "center", height: 180, marginTop: 10 }}
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
                                    colors={[LINEAR_LIGHT_PURPLE, LINEAR_DARK_PURPLE]}
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

                <TouchableOpacity activeOpacity={0.9} >
                    <Image style={{
                        width: FULL_WIDTH - 50,
                        height: 200,
                        alignSelf: "center",
                        resizeMode: "cover",
                    }}
                        source={FANTASY_BANNER}
                    ></Image>
                </TouchableOpacity >
                <TouchableOpacity onPress={() => {
                    navigation.navigate('LudoGameMode')
                }} activeOpacity={0.9}>
                    <Image style={{
                        width: FULL_WIDTH - 50,
                        height: 200,
                        alignSelf: "center",
                        resizeMode: "cover",
                    }}
                        source={LUDO_BANNER}
                    ></Image>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>{
                     navigation.navigate('RummyGameMode')
                }} activeOpacity={0.9}>
                    <Image style={{
                        width: FULL_WIDTH - 50,
                        height: 200,
                        alignSelf: "center",
                        resizeMode: "cover",
                    }}
                        source={RUMMY_BANNER}
                    ></Image>
                </TouchableOpacity>
                <View style={{ height: 50 }}></View>
            </ScrollView>

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})