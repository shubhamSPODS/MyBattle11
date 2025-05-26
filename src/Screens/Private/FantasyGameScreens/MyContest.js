import * as React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    FlatList,
    Pressable,
    ImageBackground,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Icon from '../../../Components/Icon';
import { COPY, DOWN_ARROW, EDIT, GRASS, POOL, PRIVACY, PRIZE, SHARE, WICKET_KEEPER } from '../../../Components/ImageAsstes';
import HeaderComponent from '../../../Components/HeaderComponent';
import { BLACK, DARK_RED, GREY, LIGHT_GREEN, LIGHT_GREY, LIGHT_PURPLE, WHITE } from '../../../Components/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { BOLD, MEDIUM, SEMI_BOLD } from '../../../Components/AppFonts';
import Typography, { FULL_WIDTH } from '../../../Components/Typography';
import { GET_WITH_TOKEN, POST_WITH_TOKEN } from '../../../Backend/Backend';
import { useSelector } from 'react-redux';
import { selectContestData } from '../../../Redux/Slice';

const initialLayout = { width: Dimensions.get('window').width };

const ContestRoute = ({ contestAllData }) => (
    <FlatList
        data={contestAllData?.contest_info}
        ListHeaderComponent={(() => {
            return (
                <Typography style={{ marginLeft: 25, marginTop: 10 }} size={18} fontFamily={BOLD}>{contestAllData?.categoryName || 'Head to Head'}</Typography>
            )
        })}
        renderItem={({ item }) => {
            const firstPrize = item?.Rankdata?.[0]?.Price || 0;
            const winnersPercentage = item?.Rankdata?.[0]?.PercentageEach || 0;
            const spotsLeft = `${Math.max(0, item?.Contestsize - item?.joined)}`
            return (
                <View style={{ width: FULL_WIDTH - 45, alignSelf: 'center', marginVertical: 10 }}>
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Typography fontFamily={SEMI_BOLD} size={14}>PRIZE POOL</Typography>
                            <Typography fontFamily={SEMI_BOLD} size={14}>{item?.JoinWithMULT ? 'Multiple Entries' : 'Single Entry'}</Typography>
                        </View>
                        <Typography size={12} color={GREY}>
                            ₹{item?.EnteryFee || 0} | {winnersPercentage}% Winners | 1st ₹{firstPrize}
                        </Typography>
                        <Typography fontFamily={MEDIUM} size={14}>{item?.Contestsize || 0} spots</Typography>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: `${(item?.joined / item?.Contestsize) * 100}%` }]} />
                        </View>
                        <Typography fontFamily={MEDIUM} size={14}> {spotsLeft === 'NaN' ? 0 : spotsLeft} spots left</Typography>

                        <View style={styles.cardFooter}>
                            <View style={styles.cardStat}>
                                <Icon source={PRIVACY} size={16} color="gold" />
                                <Typography style={{ left: 3 }}>₹{firstPrize}</Typography>
                            </View>
                            <View style={styles.cardStat}>
                                <Icon source={PRIZE} size={16} color="gold" />
                                <Typography style={{ left: 3 }}>{winnersPercentage}%</Typography>
                            </View>
                            <View></View>

                        </View>
                    </View>
                </View>
            )
        }}
    />
);

const MyContestRoute = () => (
    <FlatList
        data={[1, 2, 3]}
        renderItem={() => {
            return (
                <View style={{ width: FULL_WIDTH - 45, alignSelf: 'center', marginVertical: 10 }}>
                    {/* <Typography style={styles.sectionTitle}>Head To Head</Typography> */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Typography fontFamily={SEMI_BOLD} size={12}>PRIZE POOL</Typography>
                            <Typography fontFamily={SEMI_BOLD} size={12}>Multiple Entries</Typography>
                        </View>
                        <Typography size={10} color={GREY}>₹100 | 40.00% Winners | 1st ₹50</Typography>
                        <Typography fontFamily={MEDIUM} size={12}>5 spots</Typography>
                        <View style={styles.progressBar}>
                            <View style={styles.progressFill} />
                        </View>
                        <Typography fontFamily={MEDIUM} size={12}>0 spots left</Typography>


                        <View style={{ width: '100%', flexDirection: "row", justifyContent: 'space-between' }}>

                            <Typography fontFamily={SEMI_BOLD} size={13}>Joined with 1 team.</Typography>
                            <Icon source={DOWN_ARROW} size={12} />

                        </View>
                        <View style={{ alignItems: 'center', justifyContent: "center", borderRadius: 5, width: 30, backgroundColor: LIGHT_GREEN, paddingVertical: 2 }}>
                            <Typography color={WHITE} fontFamily={SEMI_BOLD} >T1</Typography>
                        </View>

                    </View>
                </View>
            )
        }}
    />
);

const MyTeamRoute = () => (
    <FlatList
        data={[1, 2, 3, 4, 5, 6]}
        renderItem={() => {
            return (
                <Pressable style={styles.Grasscard} onPress={() => { }}>
                    <ImageBackground resizeMode='cover' style={styles.topContainer} source={GRASS}>
                        <View style={{
                            width: '100%',
                            paddingVertical: 10,
                            backgroundColor: '#FFFFFF30',
                            flexDirection: "row",
                            justifyContent: 'space-between',
                            alignItems: "center",
                            paddingHorizontal: 15
                        }}>
                            <Typography color={WHITE} fontFamily={MEDIUM} size={12}>Eminem (T1)</Typography>
                            <View style={{ flexDirection: "row", gap: 10 }}>
                                <Icon source={EDIT} size={15} tintColor={WHITE} />
                                <Icon source={COPY} size={15} tintColor={WHITE} />
                                <Icon source={SHARE} size={15} tintColor={WHITE} />
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: 20,
                            marginTop: 10
                        }}>
                            <View style={{ alignItems: "center" }}>
                                <Typography fontFamily={MEDIUM} color={WHITE} size={14}>7</Typography>
                                <Typography fontFamily={MEDIUM} color={WHITE} size={12}>USA</Typography>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 30 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={{
                                        backgroundColor: WHITE,
                                        paddingVertical: 2,
                                        paddingHorizontal: 6,
                                        borderRadius: 50,
                                        marginBottom: 4
                                    }}>
                                        <Typography size={10} color={BLACK}>C</Typography>
                                    </View>
                                    <Image source={WICKET_KEEPER} style={{ width: 35, height: 35 }} />
                                    <Typography color={WHITE} size={10}>S Mukka..</Typography>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={{
                                        backgroundColor: WHITE,
                                        paddingVertical: 2,
                                        paddingHorizontal: 6,
                                        borderRadius: 50,
                                        marginBottom: 4
                                    }}>
                                        <Typography size={10} color={BLACK}>VC</Typography>
                                    </View>
                                    <Image source={WICKET_KEEPER} style={{ width: 35, height: 35 }} />
                                    <Typography color={WHITE} size={10}>P Macchi</Typography>
                                </View>
                            </View>

                            <View style={{ alignItems: "center" }}>
                                <Typography fontFamily={MEDIUM} color={WHITE} size={14}>4</Typography>
                                <Typography fontFamily={MEDIUM} color={WHITE} size={12}>OMA</Typography>
                            </View>
                        </View>

                        <View style={{
                            width: FULL_WIDTH - 40,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            backgroundColor: '#FFFFFF30',
                            position: 'absolute',
                            bottom: 0, padding: 5
                        }}>
                            <Typography fontFamily={MEDIUM} color={WHITE} size={10}>WK (3)</Typography>
                            <Typography fontFamily={MEDIUM} color={WHITE} size={10}>BAT (3)</Typography>
                            <Typography fontFamily={MEDIUM} color={WHITE} size={10}>AR (3)</Typography>
                            <Typography fontFamily={MEDIUM} color={WHITE} size={10}>BOWL (2)</Typography>
                        </View>
                    </ImageBackground>
                </Pressable>
            )
        }}
    />
);

const MyContest = ({ navigation, route }) => {
    const { contestData } = route?.params
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'contest', title: 'Contest' },
        { key: 'mycontest', title: 'My Contest' },
        { key: 'myteam', title: 'My Team' },
    ]);
    const renderScene = SceneMap({
        contest: () => <ContestRoute contestAllData={contestData} />,
        mycontest: MyContestRoute,
        myteam: MyTeamRoute,
    });




    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <HeaderComponent title={'My Contest'} />



            <LinearGradient colors={[DARK_RED, LIGHT_GREY]} style={{
                width: FULL_WIDTH - 50, alignSelf: 'center', padding: 10, flexDirection: "row",
                justifyContent: "space-between", alignItems: 'center', borderRadius: 5
            }}>

                <Icon source={PRIVACY} size={30} />
                <View>
                    <Typography fontFamily={MEDIUM} size={14} color={WHITE}>1h : 52Min</Typography>
                </View>
                <Icon source={PRIVACY} size={30} />
            </LinearGradient>

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: DARK_RED }}
                        style={{ backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 }}
                        labelStyle={{ color: DARK_RED, fontFamily: MEDIUM }}
                        activeColor={DARK_RED}
                        inactiveColor={BLACK}
                    />
                )}
            />

            <TouchableOpacity style={styles.joinButton} onPress={() => {
                navigation.navigate('CreateTeamScreen')
            }}>
                <Typography fontFamily={BOLD} size={16} color={WHITE}>
                    Create Team
                </Typography>
            </TouchableOpacity>
        </View>
    );
}

export default MyContest;

const styles = StyleSheet.create({
    topContainer: {
        alignSelf: "center",
        height: 162,
        borderRadius: 10,
        width: '100%',


    },
    Grasscard: {
        height: 162,
        borderColor: LIGHT_GREY,
        marginTop: 20,
        width: FULL_WIDTH - 50,
        alignSelf: "center",
        opacity: 0.9
        // borderWidth: 1
    },
    joinButton: {
        backgroundColor: DARK_RED,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
        borderRadius: 5,
    },


    sectionTitle: { color: BLACK, fontSize: 16, marginTop: 15, fontFamily: MEDIUM },
    card: {
        backgroundColor: WHITE,
        padding: 16,
        borderRadius: 10,
        marginTop: 10,
        elevation: 1
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardLabel: { color: 'gray' },
    cardSmall: { color: 'white' },
    cardText: { color: 'white', marginVertical: 4 },
    progressBar: {
        height: 4,
        backgroundColor: '#555',
        borderRadius: 5,
        marginVertical: 6,
    },
    progressFill: {
        width: '100%',
        height: '100%',
        backgroundColor: DARK_RED,
        borderRadius: 5,
    },

    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 12,
    },
    cardStat: { flexDirection: 'row', alignItems: 'center' },
    cardStatText: { color: 'white', marginLeft: 4 },
    button: {
        backgroundColor: '#FFD700',
        margin: 16,
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: { color: '#000', fontWeight: 'bold' },
    text: { color: 'white', alignSelf: 'center' },
    secondHeader: {
        padding: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: LIGHT_GREY,
    },
});
