import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LIGHT_PURPLE, LINEAR_DARK_PURPLE, LINEAR_LIGHT_PURPLE, WHITE } from '../../Components/Colors'
import HomeHeader from '../../Components/HomeHeader'
import LinearGradient from 'react-native-linear-gradient'
import Typography, { FULL_WIDTH } from '../../Components/Typography'
import { BOLD, MEDIUM, SEMI_BOLD } from '../../Components/AppFonts'
import { ADD, HISTORY, REFER, REWARDS, WINNERS, WITHDRAW } from '../../Components/ImageAsstes'
import Icon from '../../Components/Icon'

const Wallet = () => {
  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>

      <HomeHeader />

      <ScrollView>

        <LinearGradient colors={[LINEAR_LIGHT_PURPLE, LINEAR_DARK_PURPLE]} style={{ width: FULL_WIDTH - 50, alignSelf: "center", padding: 15, backgroundColor: "red", borderRadius: 10 }}>

          <Typography color={WHITE} fontFamily={MEDIUM}>Total Balance</Typography>
          <Typography color={WHITE} fontFamily={BOLD} size={22}>₹12,500.00</Typography>
          <View style={{ width: '100%', flexDirection: "row", justifyContent: "space-between" }}>

            <View style={{ width: '32%', backgroundColor: '#6b4d94' ,borderRadius:5,padding:10}}>
              <Typography size={13} fontFamily={SEMI_BOLD} color={WHITE}>Winning Cash</Typography>
              <Typography size={12} fontFamily={MEDIUM} color={WHITE}>₹2,000</Typography>


            </View>
            <View style={{ width: '32%', backgroundColor: '#6b4d94' ,borderRadius:5,padding:10}}>
              <Typography size={13} fontFamily={SEMI_BOLD} color={WHITE}>Winning Cash</Typography>
              <Typography size={12} fontFamily={MEDIUM} color={WHITE}>₹2,000</Typography>

            </View>
            <View style={{ width: '32%', backgroundColor: '#6b4d94',borderRadius:5,padding:10}}>
              <Typography size={13} fontFamily={SEMI_BOLD} color={WHITE}>Bonus</Typography>
              <Typography size={12} fontFamily={MEDIUM} color={WHITE}>₹2,000</Typography>


            </View>

          </View>





        </LinearGradient>

 
        <View style={{marginVertical:10,alignItems:"center",alignSelf:"center"}}>
                <FlatList
                    data={[
                        { id: 0, img: ADD, text: "Add Money" ,color:"#dbeafe",iconColor:'#2563eb'},
                        { id: 2, img: WITHDRAW, text: "Withdraw",color:'#d1fae6',iconColor:"#05966a" },
                        { id: 3, img: HISTORY, text: "History",color:'#edeaff',iconColor:'#7d3ced', },
                        { id: 1, img: REWARDS, text: "Rewards",color:'#ffeed5',iconColor:'#ea580b' },

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
                            <View
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 55,
                                    height: 55,
                                    borderRadius: 30,
                                    backgroundColor:item.color
                                }}
                            >
                                <Icon source={item.img} size={20} tintColor={item?.iconColor}/>
                            </View>
                            <Typography size={12} style={{ marginTop: 5, color: '#000' }}>{item.text}</Typography>
                        </TouchableOpacity>
                    )}
                />
            </View>

      </ScrollView>

    </View>
  )
}

export default Wallet

const styles = StyleSheet.create({})