import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { BLACK, DARK_PURPLE, GREY, WHITE } from '../../../Components/Colors'
import HeaderComponent from '../../../Components/HeaderComponent'
import Typography, { FULL_WIDTH } from '../../../Components/Typography'
import { MEDIUM, REGULAR, SEMI_BOLD } from '../../../Components/AppFonts'
import CustomButton from '../../../Components/CustomButton'
import Icon from '../../../Components/Icon'
import { BELL, USER_IMG, WALLET, WATCH, HOME, PROFILE, SECURE, POOL, PRIZE } from '../../../Components/ImageAsstes'
import { useNavigation } from '@react-navigation/native'

const gameData = [
    {
        id: '1',
        title: 'Points Rummy',
        description: 'Quick single-round game with instant results',
        priceRange: '₹2 - ₹10,000',
        players: '2-6 Players',
        icon: PRIZE 
    },
    {
        id: '2',
        title: 'Pool Rummy',
        description: 'Multiple rounds until one winner emerges',
        priceRange: '₹50 - ₹1,000',
        players: '2-6 Players',
        icon: POOL
    },
    {
        id: '3',
        title: 'Deals Rummy',
        description: 'Fixed number of deals with cumulative scores',
        priceRange: '₹25 - ₹500',
        players: '2-4 Players',
        icon: SECURE
    }
]

const GameModeCard = ({ title, description, priceRange, players, icon }) => {
    const navigation = useNavigation()

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View>
                    <Typography size={18} fontFamily={SEMI_BOLD}>{title}</Typography>
                    <Typography size={14} color={GREY} fontFamily={REGULAR} style={{ marginTop: 4 }}>
                        {description}
                    </Typography>
                </View>
                <Icon source={icon} size={24} tintColor={DARK_PURPLE} />
            </View>

            <View style={styles.cardInfo}>
                <Typography size={14} color={GREY} fontFamily={MEDIUM}>
                    {priceRange}
                </Typography>
                <Typography size={14} color={GREY} fontFamily={MEDIUM}>
                    {players}
                </Typography>
            </View>

            <CustomButton
                title="Play Now"
                style={styles.playButton}
                onPress={() => {
                }}
            />
        </View>
    )
}



const RummyGameModes = () => {
    const navigation = useNavigation()

    const renderGameCard = ({ item }) => (
        <GameModeCard
            title={item.title}
            description={item.description}
            priceRange={item.priceRange}
            players={item.players}
            icon={item.icon}
        />
    )

    const renderFooter = () => (
        <CustomButton
            title="⚡ Quick Join Random Table"
            style={styles.quickJoinButton}
            onPress={() => {
                navigation.navigate('RummyPoolTables')
            }}
        />
    )

    return (
        <View style={styles.container}>
          <HeaderComponent title={'Select Game Mode'}/>

            <FlatList
                data={gameData}
                renderItem={renderGameCard}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={renderFooter}
            />


        </View>
    )
}

export default RummyGameModes

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: WHITE,
        elevation: 2,
        shadowColor: BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userInfo: {
        marginLeft: 8,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    card: {
        backgroundColor: WHITE,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        marginBottom: 16,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        padding: 8,
    },
    playButton: {
        backgroundColor: DARK_PURPLE,
        marginTop: 8,
    },


    quickJoinButton: {
        backgroundColor: DARK_PURPLE,
        marginVertical: 16,
        
    },
})