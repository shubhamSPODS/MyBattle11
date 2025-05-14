import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DARK_PURPLE, GOLDEN, WHITE } from '../../../Components/Colors'
import HeaderComponent from '../../../Components/HeaderComponent'
import Typography, { FULL_WIDTH } from '../../../Components/Typography'
import Icon from '../../../Components/Icon'
import { PROFILE2, WATCH } from '../../../Components/ImageAsstes'
import { MEDIUM, REGULAR } from '../../../Components/AppFonts'
import CustomButton from '../../../Components/CustomButton'

const LudoTable = ({navigation}) => {
    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <HeaderComponent title={'Table'}  walletIcon={false}/>
            <View style={{ width: FULL_WIDTH - 40,  marginVertical: 10, alignSelf: "center" }}>
                <FlatList
                showsHorizontalScrollIndicator={false}
                    data={[
                        {
                            id:0,
                            name:'All Tabels'
                        },
                        {
                            id:1,
                            name:'1v1 Game'
                        },{
                            id:2,
                            name:'4 Players'
                        },{
                            id:3,
                            name:'Quick Join'
                        },
                    ]}
                    horizontal
                    renderItem={(({ item, index }) => {
                        return (
                            <View style={{ 
                                flex: 1, 
                                backgroundColor: GOLDEN, 
                                marginLeft: 10, 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                paddingHorizontal: 15,
                                paddingVertical: 8 ,
                                borderRadius: 30,
                            }}>
                                <Typography size={12}  color={WHITE}>{item?.name}</Typography>
                            </View>
                        )
                    })}
                />



            </View>

            <FlatList
                data={[1, 2]}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{
                            width: FULL_WIDTH - 50,
                            alignSelf: 'center',
                            elevation: 1,
                            marginVertical: 10,
                            backgroundColor: WHITE,
                            borderRadius: 5,

                        }}>
                            
                            <View style={{
                                flexDirection: 'row', justifyContent: 'space-between', marginTop: 10,
                                paddingHorizontal: 10
                            }}>

                                <View style={{ flexDirection: 'row', }}>
                                    <Icon source={PROFILE2} size={20} />
                                    <Typography fontFamily={MEDIUM} size={14}> 4 Players</Typography>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Icon source={WATCH} size={16} />
                                    <Typography fontFamily={MEDIUM} size={14}>  Quick Game</Typography>
                                </View>


                            </View>
                            <View style={{ flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between', marginTop: 10 }}>
                                <Typography fontFamily={REGULAR} size={14}> Entry Fees</Typography>
                                <Typography fontFamily={REGULAR} size={14}> Prize Pool</Typography>
                            </View>

                            <View style={{ flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between', marginTop: 10 }}>
                                <Typography fontFamily={REGULAR} size={20} color={'#10B981'}> ₹100</Typography>
                                <Typography fontFamily={REGULAR} size={20} color={'#10B981'}> ₹360</Typography>
                            </View>

                            <CustomButton title='Join Table' style={{ marginBottom: 15, left: 0, }} onPress={()=>{
                                navigation.navigate('LudoJoinTable')
                            }}/>
                        </View>
                    )
                }}
            />




        </View>
    )
}

export default LudoTable

const styles = StyleSheet.create({})