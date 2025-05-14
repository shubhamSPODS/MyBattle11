import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HeaderComponent from '../../../Components/HeaderComponent'
import Typography, { FULL_WIDTH } from '../../../Components/Typography'
import { GOLDEN, GREY,  WHITE } from '../../../Components/Colors'
import Icon from '../../../Components/Icon'
import { PROFILE2 } from '../../../Components/ImageAsstes'
import { MEDIUM, SEMI_BOLD } from '../../../Components/AppFonts'
import CustomButton from '../../../Components/CustomButton'
import { useNavigation } from '@react-navigation/native'

const LudoGameMode = () => {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <HeaderComponent title='Select Game Mode'  walletIcon={true}/>
            <ScrollView>
            <FlatList
                data={[1,2,3 ]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.card}>
                            <View style={styles.cardInner}>
                                <View style={{ width: '100%', flexDirection: 'row' }}>
                                    <View style={{ flex: 1, }}>
                                        <Typography size={16} fontFamily={SEMI_BOLD}>1v1 Battle</Typography>
                                        <Typography size={13} color={GREY} fontFamily={MEDIUM}>
                                            Challenge one player head-to-head
                                        </Typography>
                                        <Typography size={12} fontFamily={MEDIUM}>
                                            Entry from ₹10
                                        </Typography>
                                      
                                       <CustomButton title='Play Now' onPress={()=>{
                                              navigation.navigate('LudoTable')
                                       }}/>

                                    </View>
                                    <TouchableOpacity>
                                        <Icon source={PROFILE2} size={25} />
                                    </TouchableOpacity>
                                </View>

                            </View>


                        </View>
                    )
                }}
            />


            </ScrollView>
            <CustomButton 
        title="Join Table Now"
        style={styles.joinButton}
      />
        </View>
    )
}

export default LudoGameMode

const styles = StyleSheet.create({
    card: {
        width: FULL_WIDTH - 50,
        alignSelf: 'center',
        elevation: 1,
        marginVertical: 15,
        borderRadius: 10,
      
    },
    cardInner: {
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: WHITE,
        justifyContent: 'space-between',
    },
    joinButton: {
        position: 'absolute',
        bottom: 16,
        backgroundColor: GOLDEN,
        width: FULL_WIDTH - 32,
    },
})
