import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { EMAIL, STATIC_USER, USER_IMG } from '../../../Components/ImageAsstes';
import HeaderComponent from '../../../Components/HeaderComponent';
import { DARK_RED, WHITE } from '../../../Components/Colors';
import Typography, { FULL_WIDTH } from '../../../Components/Typography';
import { MEDIUM, SEMI_BOLD } from '../../../Components/AppFonts';
import Toast from 'react-native-simple-toast';
import { GET_WITH_TOKEN } from '../../../Backend/Backend';
import { useSelector } from 'react-redux';
import { selectContestData } from '../../../Redux/Slice';

const ScoreboardList = ({navigation}) => {
    const [scoreboardData, setScoreboardData] = useState([]);
    const contestData = useSelector(selectContestData);
    const matchId = contestData?.contestAllInfo?._id;

    const getScoreboards = async () => {
        try {
            const response = await GET_WITH_TOKEN(`match/userScoreCard/${matchId}`);
            console.log(response?.success, '==response scoreboard===');
       
            if (response?.success === true) {
                setScoreboardData(response?.data);

            } else {
                Toast.show(response?.message || 'Failed to fetch scoreboard');
            }
        } catch (error) {
            console.error('Error fetching scoreboard:', error);
            Toast.show('Error fetching scoreboard');
        }
    }

    useEffect(() => {
        getScoreboards();
    }, []);

    const renderScoreboard = ({ item }) => {
        // Get only first 5 predictions
        const firstFivePredictions = item.predictions.slice(0, 5);
        
        return (
            <TouchableOpacity 
                style={styles.card} 
                activeOpacity={0.9} 
                onPress={() => {
                    navigation.navigate('ScoreboardScreen', { 
                        scoreboardData: item,
                        allPredictions: item.predictions 
                    });
                }}
            >
                <View style={styles.header}>
                    <View style={styles.teamInfo}>
                        <Typography style={styles.teamName}>User Scorecard</Typography>
                    </View>
                    <View style={styles.statsContainer}>
                        <Typography style={styles.statsText}>Accuracy: {item?.accuracy_percentage}%</Typography>
                        <Typography style={styles.statsText}>Exact Matches: {item.total_exact_matches}</Typography>
                    </View>
                </View>

                <View style={styles.tableHeader}>
                    <Typography style={styles.tableTypographyBold}>OVER</Typography>
                    <Typography style={styles.tableTypographyBold}>RUNS</Typography>
                </View>

                {firstFivePredictions.map((prediction, index) => (
                    <View style={styles.tableRow} key={index}>
                        <Typography style={styles.tableTypography}>{prediction.over_number}</Typography>
                        <Typography style={styles.tableTypography}>{prediction.runs}</Typography>
                    </View>
                ))}

                <View style={styles.viewMoreContainer}>
                    <Typography style={styles.viewMoreText}>View All Overs →</Typography>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <HeaderComponent title={'Scoreboards'} />
            <FlatList
                data={scoreboardData}
                renderItem={renderScoreboard}
                keyExtractor={item => item._id}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};

export default ScoreboardList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        width: FULL_WIDTH - 32,
        alignSelf: "center",
        paddingVertical: 16,
        paddingHorizontal: 16
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    teamInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    teamName: {
        fontFamily: SEMI_BOLD,
        fontSize: 16,
    },
    statsContainer: {
        alignItems: 'flex-end',
    },
    statsText: {
        fontFamily: MEDIUM,
        fontSize: 12,
        color: DARK_RED,
        marginBottom: 4,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 4,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
        paddingHorizontal: 6
    },
    tableTypographyBold: {
        fontFamily: SEMI_BOLD,
        fontSize: 12,
        paddingHorizontal: 4
    },
    tableTypography: {
        fontSize: 12,
    },
    viewMoreContainer: {
        marginTop: 12,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 8,
    },
    viewMoreText: {
        color: DARK_RED,
        fontFamily: MEDIUM,
        fontSize: 14,
    },
});
