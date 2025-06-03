import { FlatList, Image, ImageBackground, Pressable, StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import HeaderComponent from '../../../Components/HeaderComponent'
import { BLACK, DARK_PURPLE, DARK_RED, LIGHT_GREEN, LIGHT_GREY, WHITE } from '../../../Components/Colors'
import { BACK, CHECK, CHECK_SQUARE, CLOSE, COPY, CROSS, EDIT, GRASS, GROUND_GREEN, SHARE, UNCHECK_SQUARE, WICKET_KEEPER } from '../../../Components/ImageAsstes'
import Typography, { FULL_HEIGHT, FULL_WIDTH } from '../../../Components/Typography'
import { BOLD, MEDIUM } from '../../../Components/AppFonts'
import Icon from '../../../Components/Icon'
import { GET_WITH_TOKEN, POST_WITH_TOKEN } from '../../../Backend/Backend'
import { selectContestData } from '../../../Redux/Slice'
import Toast from 'react-native-simple-toast';
import { useSelector } from 'react-redux'
import EmptyList from '../../../Components/EmptyList'

const TeamList = ({ route }) => {
    const { joinContestId,  item } = route?.params
    const [teamData, setteamData] = useState([])
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [isSelectAll, setIsSelectAll] = useState(false);
    const [showPlayerSheet, setShowPlayerSheet] = useState(false);
    const [selectedTeamPlayers, setSelectedTeamPlayers] = useState([]);
    const [currentSheetCaptain, setCurrentSheetCaptain] = useState(null);
    const [currentSheetViceCaptain, setCurrentSheetViceCaptain] = useState(null);
    const slideAnim = useRef(new Animated.Value(0)).current;
  const contestDataStore = useSelector(selectContestData);
  const userData = useSelector(store=>store.auth.user);
//   console.log(userData,'==data user ka ');
  
    const handleSelectAll = () => {
        if (isSelectAll) {
            setSelectedTeams([]);
        } else {
            const allTeamIndexes = Array.from({ length: teamData.length }, (_, index) => index);
            setSelectedTeams(allTeamIndexes);
        }
        setIsSelectAll(!isSelectAll);
    };

    const handleTeamSelect = (index) => {
        if (selectedTeams.includes(index)) {
            setSelectedTeams(selectedTeams.filter(i => i !== index));
            setIsSelectAll(false);
        } else {
            const newSelected = [...selectedTeams, index];
            setSelectedTeams(newSelected);
            if (newSelected.length === 6) {
                setIsSelectAll(true);
            }
        }
    };

    const getTeamData = async () => {
        try {
            const response = await GET_WITH_TOKEN(`match/my-teams/${joinContestId}`)
            if (response?.success === true) {
                console.log(response?.data, '==-response')
                setteamData(response?.data)
            } else {
                console.log(response, '==response')
            }
        } catch (error) {
            console.log(error, '==error');

        }
    }
    useEffect(() => {
        getTeamData()
    }, [])
    const categorizePlayers = (players) => {
        const categories = {
            'Wicket Keeper': [],
            'Batsmen': [],
            'All Rounder': [],
            'Bowler': []
        };

        players?.forEach(player => {
            const role = player?.playing_role?.toLowerCase();
            if (role === 'wk') {
                categories['Wicket Keeper'].push(player);
            } else if (role === 'bat') {
                categories['Batsmen'].push(player);
            } else if (role === 'all') {
                categories['All Rounder'].push(player);
            } else if (role === 'bowl') {
                categories['Bowler'].push(player);
            }
        });

        return Object.entries(categories).map(([title, data]) => ({
            title,
            data
        }));
    };
    const teamSections = categorizePlayers(selectedTeamPlayers);

    const _RenderData = (({ item, index, caption, viceCaptain }) => {
        const isCaptain = caption?._id === item._id;
        const isViceCaptain = viceCaptain?._id === item._id;

        return (
            <View style={styles.playerContainer}>
                <View style={styles.playerImageContainer}>
                    <Icon source={WICKET_KEEPER} size={30} />
                    {isCaptain && (
                        <View style={[styles.roleTag, styles.captainTag]}>
                            <Typography size={10} color={WHITE} fontFamily={BOLD}>C</Typography>
                        </View>
                    )}
                    {isViceCaptain && (
                        <View style={[styles.roleTag, styles.vcTag]}>
                            <Typography size={10} color={WHITE} fontFamily={BOLD}>VC</Typography>
                        </View>
                    )}
                </View>
                <Typography size={10} color={WHITE} fontFamily={BOLD} style={{ marginTop: 10 }}>{item?.short_name}</Typography>
            </View>
        )
    });
    const TeamSection = ({ title, data, caption, viceCaptain }) => (
        <View style={styles.sectionContainer}>
            <View style={styles.categoryTitleContainer}>
                <Typography textAlign={'center'} size={12} color={BLACK} fontFamily={BOLD}>{title}</Typography>
            </View>
            <FlatList
                numColumns={3}
                data={data}
                contentContainerStyle={styles.flatListContainer}
                renderItem={({ item, index }) => _RenderData({ item, index, caption, viceCaptain })}
            />
        </View>
    );

    const showSheet = () => {
        setShowPlayerSheet(true);
        Animated.timing(slideAnim, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true,
        }).start();
    };

    const hideSheet = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setShowPlayerSheet(false);
        });
    };
    console.log(selectedTeams,'==teams');
    
    const onJoinContest = async () => {
        try {
            if (selectedTeams?.length===0) {
                 Toast.show('Please select a team.')
                return
            }
            const selectedTeamId = selectedTeams?.map(index => teamData[index]?._id);
          
            const data = {
                match_id: contestDataStore?.contestAllInfo?._id,
                matchid: contestDataStore?.matchId,
                contest_category_id: item?.contest_category_id?.toString(),
                match_contest_category_id: contestDataStore?.contestDetails?._id,
                teams_id: selectedTeamId.map(id => id?.toString()),
                user_id: userData?._id
            };

            console.log('Request Data:', data);
            const response = await POST_WITH_TOKEN('match/contest-join', data);
            console.log('Raw Response:', response);
            
            if (response?.success === true) {
                Toast.show(response?.message || 'Successfully joined contest');
            } else {
                Toast.show(response?.message || 'Failed to join contest');
            }
        } catch (error) {
            console.log('Error details:', {
                message: error.message,
                stack: error.stack,
                response: error.response
            });
            Toast.show('Something went wrong. Please try again.');
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <HeaderComponent
                title={'My Teams'}
            />
            <Pressable onPress={handleSelectAll} style={styles.selectAllButton}>
                <Icon source={isSelectAll ? CHECK_SQUARE : UNCHECK_SQUARE} size={18} style={styles.selectAllIcon} />
                <Typography color={BLACK} fontFamily={MEDIUM} size={14}>
                    {isSelectAll ? 'Deselect All' : 'Select All'}
                </Typography>
            </Pressable>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={teamData}
                contentContainerStyle={styles.flatListContent}
                ListEmptyComponent={()=>{
                    return(
                        <EmptyList title='No team found.'/>
                    )
                }}
                renderItem={({ item, index }) => {
                    
                    const viceCaptain = item?.players?.find(player => player?.vice_caption === true);
                    const caption = item?.players?.find(player => player?.caption === true);

                    let wkCount = 0;
                    let batCount = 0;
                    let arCount = 0;
                    let bowlCount = 0;

                    item?.players?.forEach(player => {
                        if (player?.playing_role === 'wk') {
                            wkCount++;
                        } else if (player?.playing_role === 'bat') {
                            batCount++;
                        } else if (player?.playing_role === 'all') {
                            arCount++;
                        } else if (player?.playing_role === 'bowl') {
                            bowlCount++;
                        }
                    });

                    return (
                        <Pressable
                            style={[styles.Grasscard, { marginTop: index === 0 ? 0 : 20 }]}
                            onPress={() => {
                                setSelectedTeamPlayers(item?.players);
                                setCurrentSheetCaptain(item?.players?.find(player => player?.caption === true));
                                setCurrentSheetViceCaptain(item?.players?.find(player => player?.vice_caption === true));
                                showSheet();
                            }}
                        >
                            <ImageBackground resizeMode='cover' style={styles.topContainer} source={GRASS}>
                                <View style={styles.teamHeader}>
                                    <Typography fontFamily={BOLD} color={WHITE}>{item?.name}</Typography>
                                    <TouchableOpacity onPress={() => handleTeamSelect(index)}>
                                        <Icon
                                            source={selectedTeams?.includes(index) ? CHECK_SQUARE : UNCHECK_SQUARE}
                                            tintColor={WHITE}
                                            size={18}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.teamContent}>
                                    <View style={styles.teamCount}>
                                        <Typography fontFamily={MEDIUM} color={WHITE} size={14}>7</Typography>
                                        <Typography fontFamily={MEDIUM} color={WHITE} size={12}>USA</Typography>
                                    </View>

                                    <View style={styles.captainContainer}>
                                        <View style={styles.captainWrapper}>
                                            <View style={styles.captainBadge}>
                                                <Typography size={10} color={BLACK}>C</Typography>
                                            </View>
                                            <Image source={caption?.thumb_url ? { uri: caption?.thumb_url } : WICKET_KEEPER} style={styles.playerImage} />
                                            <Typography color={WHITE} size={10}>{caption?.short_name}</Typography>
                                        </View>
                                        <View style={styles.captainWrapper}>
                                            <View style={styles.captainBadge}>
                                                <Typography size={10} color={BLACK}>VC</Typography>
                                            </View>
                                            <Image source={viceCaptain?.thumb_url ? { uri: viceCaptain?.thumb_url } : WICKET_KEEPER} style={styles.playerImage} />
                                            <Typography color={WHITE} size={10}>{viceCaptain?.short_name || 'VC Name'}</Typography>
                                        </View>
                                    </View>

                                    <View style={styles.teamCount}>
                                        <Typography fontFamily={MEDIUM} color={WHITE} size={14}>4</Typography>
                                        <Typography fontFamily={MEDIUM} color={WHITE} size={12}>OMA</Typography>
                                    </View>
                                </View>

                                <View style={styles.teamFooter}>
                                    <Typography fontFamily={MEDIUM} color={WHITE} size={10}>WK ({wkCount})</Typography>
                                    <Typography fontFamily={MEDIUM} color={WHITE} size={10}>BAT ({batCount})</Typography>
                                    <Typography fontFamily={MEDIUM} color={WHITE} size={10}>AR ({arCount})</Typography>
                                    <Typography fontFamily={MEDIUM} color={WHITE} size={10}>BOWL ({bowlCount})</Typography>
                                </View>
                            </ImageBackground>
                        </Pressable>
                    )
                }}
            />
            {showPlayerSheet && (
                <Animated.View style={[styles.sheetContainer, {
                    transform: [{
                        translateY: slideAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [FULL_HEIGHT, 0]
                        })
                    }]
                }]}>
                    <ImageBackground source={GROUND_GREEN} style={styles.sheetBackground} resizeMode='stretch'>
                        <Typography fontFamily={BOLD} size={18} style={styles.sheetTitle}>Players</Typography>
                        <ScrollView>
                            {teamSections?.map((section, index) => (
                                <TeamSection
                                    key={index}
                                    title={section?.title}
                                    data={section?.data}
                                    caption={currentSheetCaptain}
                                    viceCaptain={currentSheetViceCaptain}
                                />
                            ))}
                        </ScrollView>
                        <Pressable
                            onPress={hideSheet}
                            style={styles.closeButton}
                        >
                            <Icon source={CROSS} tintColor={WHITE} size={20} />
                        </Pressable>
                    </ImageBackground>
                </Animated.View>
            )}
            <TouchableOpacity style={styles.joinButton} onPress={() => {
            onJoinContest()
            }}>
                <Typography fontFamily={BOLD} size={16} color={WHITE}>
                    JOIN CONTEST
                </Typography>
            </TouchableOpacity>

        </View>
    )
}

export default TeamList

const styles = StyleSheet.create({
    joinButton: {
        backgroundColor: DARK_RED,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
        borderRadius: 5,
    },
    Grasscard: {
        height: 162,
        borderColor: LIGHT_GREY,
        width: FULL_WIDTH - 50,
        alignSelf: "center",
    },
    topContainer: {
        alignSelf: "center",
        height: 162,
        width: '100%',
    },
    selectAllButton: {
        padding: 10,
        backgroundColor: WHITE,
        borderRadius: 5,
        marginRight: 10,
        alignSelf: "flex-end",
        flexDirection: "row",
        alignItems: "center",
        marginRight: 20
    },
    selectAllIcon: {
        right: 5
    },
    flatListContent: {
        paddingBottom: 30
    },
    teamHeader: {
        width: '100%',
        paddingVertical: 10,
        backgroundColor: '#FFFFFF30',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20
    },
    teamContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10
    },
    teamCount: {
        alignItems: "center"
    },
    captainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30
    },
    captainWrapper: {
        alignItems: 'center'
    },
    captainBadge: {
        backgroundColor: WHITE,
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 50,
        marginBottom: 4
    },
    playerImage: {
        width: 35,
        height: 35
    },
    teamFooter: {
        width: FULL_WIDTH - 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF30',
        position: 'absolute',
        bottom: 0,
        padding: 5
    },
    sheetContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    sheetBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
    },
    sheetTitle: {
        marginBottom: 10,
        marginTop: 25
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 10,
        padding: 10,
    },
    sectionContainer: {
        width: FULL_WIDTH - 50,
        alignSelf: "center",
        justifyContent: 'center',
        padding: 5,
        marginTop: 25
    },
    categoryTitleContainer: {
        backgroundColor: WHITE,
        width: '35%',
        alignSelf: "center",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: "center",
        marginVertical: 10
    },
    flatListContainer: {
        width: FULL_WIDTH - 50,
        justifyContent: "center",
        alignItems: "center"
    },
    playerContainer: {
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 5,
    },
    playerImageContainer: {
        position: 'relative',
    },
    roleTag: {
        position: 'absolute',
        top: -5,
        right: -5,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: WHITE,
    },
    captainTag: {
        backgroundColor: DARK_RED,
    },
    vcTag: {
        backgroundColor: LIGHT_GREEN,
    },
})