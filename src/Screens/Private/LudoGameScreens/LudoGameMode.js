import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import HeaderComponent from '../../../Components/HeaderComponent'
import Typography, { FULL_WIDTH } from '../../../Components/Typography'
import { GOLDEN, GREY, WHITE } from '../../../Components/Colors'
import Icon from '../../../Components/Icon'
import { DICE, DICE_1, DICE_2, PROFILE2 } from '../../../Components/ImageAsstes'
import { MEDIUM, SEMI_BOLD } from '../../../Components/AppFonts'
import CustomButton from '../../../Components/CustomButton'
import { useNavigation } from '@react-navigation/native'

const LudoGameMode = () => {
    const navigation = useNavigation()
    const [gameMode, setGameMode] = useState([
        {
            id: 0,
            name: 'Classic',
            description: `Goal: Standard Ludo rules apply.\nTwist: Win games to earn real.\nStrategy: Focus on capturing opponents and reaching home faster to win rewards.`,
            img: DICE,
            gameMode: 'Classic',
        },
        {
            id: 1,
            name: 'Dice',
            description: `Goal: Same as classic, but time-limited turns.\nTwist: You must roll and move quickly — each turn has a countdown.\nChallenge: It’s fast-paced, so quick thinking is key.`,
            img: DICE_1,
            gameMode: 'Timer',
        },
        {
            id: 2,
            name: 'Number',
            description: `Goal: Score as high as possible by capturing and progressing tokens.\nTwist: Your earnings are based on your score, not just winning.\nScoring: Points may be given for kills, moves, and reaching home.`,
            img: DICE_2,
            gameMode: 'Turbo',
        },
    ])

    const fadeAnims = useRef(gameMode?.map(() => new Animated.Value(0))).current
    useEffect(() => {
        const animations = fadeAnims.map((anim, index) => {
            return Animated.timing(anim, {
                toValue: 1,
                duration: 500,
                delay: index * 200,
                useNativeDriver: true,
            })
        })
        Animated.stagger(200, animations).start()
    }, [])

    const renderItem = ({ item, index }) => {
        return (
            <Animated.View
                style={[
                    styles.card,
                    {
                        opacity: fadeAnims[index],
                        transform: [{
                            translateY: fadeAnims[index].interpolate({
                                inputRange: [0, 1],
                                outputRange: [50, 0]
                            })
                        }]
                    }
                ]}
            >
                <View style={styles.cardInner}>
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={{ flex: 1, }}>
                            <Typography size={16} fontFamily={SEMI_BOLD}>{item?.name}</Typography>
                            <Typography size={13} color={GREY} fontFamily={MEDIUM}>
                                {item?.description}
                            </Typography>


                            <CustomButton style={{ left: 15 }} title='Play Now' onPress={() => {
                                navigation.navigate('LudoTable', { gameType: item?.gameMode })
                            }} />

                        </View>
                        <TouchableOpacity>
                            <Icon source={item?.img} size={35} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <HeaderComponent title='Select Game Mode' walletIcon={true} />
            <ScrollView>
                <FlatList
                    data={gameMode}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
            </ScrollView>

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
