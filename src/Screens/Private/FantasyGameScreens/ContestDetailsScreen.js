import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Image,
    Dimensions,
    useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Typography from '../../../Components/Typography';
import HeaderComponent from '../../../Components/HeaderComponent';
import {
    BLACK,
    WHITE,
    DARK_RED,
    LIGHT_GREY,
    GREY,
    GOLDEN,
    LIGHT_GREEN,
} from '../../../Components/Colors';
import { BOLD, MEDIUM, REGULAR, SEMI_BOLD } from '../../../Components/AppFonts';
import { PRIZE } from '../../../Components/ImageAsstes';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const ContestDetailsScreen = ({ route }) => {
    const navigation = useNavigation();
    const layout = useWindowDimensions();
    const { contest_category_id, shadow_contest_id, contest_type, winning_amount } = route.params;

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'winnings', title: 'Winnings' },
        { key: 'leaderboard', title: 'Leaderboard' },
        { key: 'scorecard', title: 'Scorecard' },
    ]);

    // Mock data for winnings
    const winningsData = [
        { rank: '#1', winnings: '₹500.00' },
        { rank: '#2', winnings: '₹125.00' },
        { rank: '#3', winnings: '₹100.00' },
        { rank: '#4-10', winnings: '₹45.00' },
        { rank: '#11-25', winnings: '₹29.00' },
        { rank: '#26-50', winnings: '₹19.00' },
        { rank: '#51-100', winnings: '₹13.00' },
    ];

    const renderWinningsItem = ({ item, index }) => (
        <View style={[
            styles.winningsRow,
            index % 2 === 0 ? styles.evenRow : styles.oddRow
        ]}>
            <Typography fontFamily={MEDIUM} size={14}>
                {item.rank}
            </Typography>
            <Typography fontFamily={MEDIUM} size={14}>
                {item.winnings}
            </Typography>
        </View>
    );

    // Tab content components
    const WinningsTab = () => (
        <View style={styles.winningsContainer}>
            <View style={styles.winningsHeader}>
                <Typography fontFamily={BOLD} size={14}>
                    Rank
                </Typography>
                <Typography fontFamily={BOLD} size={14}>
                    Winnings
                </Typography>
            </View>
            <FlatList
                data={winningsData}
                renderItem={renderWinningsItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.rank}
                contentContainerStyle={styles.winningsList}
            />
        </View>
    );

    const LeaderboardTab = () => (
        <View style={styles.tabContentContainer}>
            <Typography fontFamily={MEDIUM} size={16} textAlign="center" style={styles.comingSoon}>
                Leaderboard Content
            </Typography>
        </View>
    );

    const ScorecardTab = () => (
        <View style={styles.tabContentContainer}>
            <Typography fontFamily={MEDIUM} size={16} textAlign="center" style={styles.comingSoon}>
                Scorecard Content
            </Typography>
        </View>
    );

    const renderScene = SceneMap({
        winnings: WinningsTab,
        leaderboard: LeaderboardTab,
        scorecard: ScorecardTab,
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: DARK_RED }}
            style={{ backgroundColor: WHITE }}
            labelStyle={{ color: BLACK, fontFamily: MEDIUM, fontSize: 14 }}
            activeColor={DARK_RED}
            inactiveColor={BLACK}
        />
    );
    return (
        <View style={styles.container}>
            <HeaderComponent title="Contest Details" showBackIcon={true} walletIcon />
            <View style={styles.matchInfo}>
                <Typography fontFamily={BOLD} color={DARK_RED} size={22}>
                    {contest_type}
                </Typography>
            </View>

            <View style={styles.prizePool}>
                <Typography fontFamily={SEMI_BOLD} size={24} color={GOLDEN}>
                    ₹{winning_amount}
                </Typography>
                <Typography fontFamily={REGULAR} size={14} color={GREY}>
                    Prize Pool
                </Typography>

                <View style={styles.progressBarContainer}>
                    <View style={styles.progressBar}>
                        <View style={styles.progressFill} />
                    </View>
                </View>

                <Typography fontFamily={REGULAR} size={14} color={BLACK}>
                    200 spots left
                </Typography>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Typography fontFamily={BOLD} size={16}>
                        ₹500
                    </Typography>
                    <Typography fontFamily={REGULAR} size={12} color={GREY}>
                        First Prize
                    </Typography>
                </View>
                <View style={styles.divider} />
                <View style={styles.statItem}>
                    <Typography fontFamily={BOLD} size={16}>
                        50%
                    </Typography>
                    <Typography fontFamily={REGULAR} size={12} color={GREY}>
                        Win %
                    </Typography>
                </View>
                <View style={styles.divider} />
                <View style={styles.statItem}>
                    <Typography fontFamily={BOLD} size={16}>
                        25
                    </Typography>
                    <Typography fontFamily={REGULAR} size={12} color={GREY}>
                        Winners
                    </Typography>
                </View>
            </View>

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderTabBar}
                style={styles.tabView}
            />

<TouchableOpacity style={styles.joinButton}>
                <Typography fontFamily={BOLD} size={16} color={WHITE}>
                    JOIN
                </Typography>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
    },
    matchInfo: {
        alignSelf: 'center',
        marginTop: 10
    },
    prizePool: {
        alignItems: 'center',
        marginTop: 5
    },
    progressBarContainer: {
        width: '90%',
        marginVertical: 15,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#FFE0E0',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        width: '50%',
        height: '100%',
        backgroundColor: DARK_RED,
        borderRadius: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: LIGHT_GREY,
        borderTopWidth: 1,
        borderTopColor: LIGHT_GREY,
    },
    statItem: {
        alignItems: 'center',
    },
    divider: {
        width: 1,
        backgroundColor: LIGHT_GREY,
    },
    tabView: {
        flex: 1,
    },
    winningsContainer: {
        flex: 1,
        paddingHorizontal: 15,
    },
    winningsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#F9E5B7',
        marginTop:10
    },
    winningsList: {
        paddingBottom: 20,
    },
    winningsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    evenRow: {
        backgroundColor: WHITE,
    },
    oddRow: {
        backgroundColor: '#FFE0E0',
    },
    joinButton: {
        backgroundColor: DARK_RED,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
        borderRadius: 5,
    },
    tabContentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    comingSoon: {
        marginTop: 20,
    },
});

export default ContestDetailsScreen; 