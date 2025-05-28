import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { EMAIL, STATIC_USER, USER_IMG } from '../../../Components/ImageAsstes';
import HeaderComponent from '../../../Components/HeaderComponent';
import { DARK_RED, WHITE } from '../../../Components/Colors';
import Typography, { FULL_WIDTH } from '../../../Components/Typography';
import { MEDIUM, SEMI_BOLD } from '../../../Components/AppFonts';

const scoreboardData = [
    {
        id: '1',
        team: 'INDIA',
        flag: STATIC_USER,
        scores: [
            { over: 1, run: 12 },
            { over: 2, run: 14 },
            { over: 3, run: 8 },
            { over: 2, run: 9 },
            { over: 3, run: 12 },
        ],
    },
    {
        id: '2',
        team: 'PAKISTAN',
        flag: USER_IMG,
        scores: [
            { over: 1, run: 12 },
            { over: 2, run: 14 },
            { over: 3, run: 8 },
            { over: 2, run: 9 },
            { over: 3, run: 12 },
        ],
    },
];

const ScoreboardList = ({navigation}) => {
    const renderScoreboard = ({ item }) => (
        <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={()=>{
            navigation.navigate('ScoreboardScreen')
        }}>
            <View style={styles.header}>
                <View style={styles.teamInfo}>
                    <Image source={item.flag} style={styles.flag} />
                    <Typography style={styles.teamName}>{item.team}</Typography>
                </View>
                <TouchableOpacity style={styles.editButton}>
                    <Typography style={styles.editTypography}>Edit</Typography>
                </TouchableOpacity>
            </View>

            <View style={styles.tableHeader}>
                <Typography style={styles.tableTypographyBold}>OVER</Typography>
                <Typography style={styles.tableTypographyBold}>Run</Typography>
            </View>

            {item.scores.map((score, index) => (
                <View style={styles.tableRow} key={index}>
                    <Typography style={styles.tableTypography}>{score.over}</Typography>
                    <Typography style={styles.tableTypography}>{score.run}</Typography>
                </View>
            ))}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <HeaderComponent title={'Scoreboards'} />
            <FlatList
                data={scoreboardData}
                renderItem={renderScoreboard}
                keyExtractor={item => item.id}
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
    },
    teamInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flag: {
        width: 24,
        height: 16,
        resizeMode: 'contain',
        marginRight: 8,
    },
    teamName: {
        fontFamily: SEMI_BOLD
    },
    editButton: {
        backgroundColor: DARK_RED,
        borderRadius: 6,
        paddingVertical: 4,
        paddingHorizontal: 12,
    },
    editTypography: {
        color: WHITE,
        fontFamily: MEDIUM
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
});
