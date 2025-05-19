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
        title: 'Points',
        description: `Quick & rewarding \n\nHow it works: Each point has a fixed value. Win by declaring first — earn chips based on opponents’ total points.`,
        priceRange: '₹2 - ₹10,000',
        players: '2-6 Players',
        icon: PRIZE 
    },
    {
        id: '2',
        title: 'Deals',
        description: `Fixed deals, big stakes \n\nHow it works: Play a set number of deals. The player with the most chips at the end wins.`,
        priceRange: '₹50 - ₹1,000',
        players: '2-6 Players',
        icon: POOL
    },
    {
        id: '3',
        title: '101 Pool',
        description: `Fast knockout mode \n\nHow it works: Players are out once they cross 101 points. Last player remaining wins the game.`,
        priceRange: '₹25 - ₹500',
        players: '2-4 Players',
        icon: SECURE
    },
    {
        id: '4',
        title: '201 Pool',
        description: `Longer, strategic play \n\nHow it works: Similar to 101, but elimination is after 201 points. Stay below the limit to win`,
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


            <CustomButton
                title="Play Now"
                style={styles.playButton}
                onPress={() => {
                    navigation.navigate('GameTable', { 
                        gameType:  'Rummy',
                        gameMode: title 
                    })
                }}
            />
        </View>
    )
}



const RummyGameModes = () => {
    const navigation = useNavigation()

    const renderGameCard = ({ item }) => (
        <GameModeCard
            title={item?.title}
            description={item.description}
            priceRange={item.priceRange}
            players={item.players}
            icon={item.icon}
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
        width:FULL_WIDTH-50,
        left:0
    },


    quickJoinButton: {
        backgroundColor: DARK_PURPLE,
        marginVertical: 16,
        
    },
})