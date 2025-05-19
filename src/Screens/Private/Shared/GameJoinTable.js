import { StyleSheet, View, ScrollView, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { BLACK, DARK_PURPLE, GOLDEN, GREY, WHITE } from '../../../Components/Colors';
import HeaderComponent from '../../../Components/HeaderComponent';
import Typography, { FULL_WIDTH } from '../../../Components/Typography';
import { MEDIUM, REGULAR, SEMI_BOLD } from '../../../Components/AppFonts';
import CustomButton from '../../../Components/CustomButton';
import Icon from '../../../Components/Icon';
import { DICE, PRIZE, PLAYERS, ENTRY_FEE, USER_IMG, POOL, FEE, CHECK, SECURE, WATCH } from '../../../Components/ImageAsstes';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { BASE_URL, GET_WITH_TOKEN } from '../../../Backend/Backend';
import Toast from 'react-native-simple-toast';
import Loader from '../../../Components/Loader';
import { launchUnityWithDataCallback } from 'react-native-unity-launcher';

const GameJoinTable = ({ route, navigation }) => {
    const userData = useSelector((state) => state.auth.user);
    const userToken = useSelector((state) => state.auth?.token);
    const [matchId, setMatchId] = useState('');
    const socket = useRef(null);
    const routeData = route?.params?.playerDetails;
    const gameRoute = route?.params?.gameType;
    const isRummy = gameRoute === 'Rummy';
    console.log(gameRoute, '===rummy');

    const [isSocketConnected, setIsSocketConnected] = useState(false);
    const [players, setPlayers] = useState([]);
    const [isJoining, setIsJoining] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isWaitingForUnity, setIsWaitingForUnity] = useState(false);
    const [countdown, setCountdown] = useState(10);

    const themeColor = isRummy ? DARK_PURPLE : GOLDEN;
    const gameIcon = isRummy ? POOL : DICE;

    const walletBalance = Number(userData?.winning_amount || 0) + Number(userData?.cash_bonus || 0) + Number(userData?.totaldeposit || 0);
    const balanceAfterJoin = walletBalance - routeData?.bet;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    useEffect(() => {
        if (isWaitingForUnity) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        } else {
            setCountdown(10);
        }
    }, [isWaitingForUnity]);

    useEffect(() => {
        return () => {
            if (socket.current) {
                console.log('🧹 Cleaning up socket connection...');
                socket.current.disconnect();
                console.log('🔌 Socket disconnected on unmount');
                setIsSocketConnected(false);
                setIsLoading(false);
            }
        };
    }, []);

    useEffect(() => {
        if (!!matchId) {
            onMatchIdFound();
        }
    }, [matchId]);

    const setupSocketConnection = () => {
        let url = `${BASE_URL}server/matchmaking`;
        let path = '/socket.io';
        let transports = ['websocket'];
        setIsLoading(true);

        socket.current = io(url, {
            path: path,
            transports: transports,
            query: {
                playerId: userData?._id,
                contestId: routeData?._id,
            },
            forceNew: true,
        });

        socket.current.on('connect', () => {
            console.log('✅ Socket connected=');
            setIsSocketConnected(true);
            setIsLoading(true);
            setTimeout(() => {
                if (socket.current?.connected) {
                    socket.current.emit('get_players', {
                        playerId: userData?._id,
                        contestId: routeData?._id,
                        timestamp: Date.now()
                    });
                }
            }, 15000);
        });

        socket.current.on('info', (playerData) => {
            if (playerData?.matchId) {
                setPlayers(prev => [...prev, playerData]);
            }
        });

        socket.current.on('match_found', (matchData) => {
            setIsJoining(true);
            setIsLoading(true);

            if (matchData?.matchId) {
                setMatchId(matchData?.matchId);
            } else {
                setIsJoining(false);
            }
        });

        socket.current.on('error', (error) => {
            if (error.message === 'Connection timeout reached') {
                Toast.show('No match found.');
                setIsLoading(false);
                setIsJoining(false);
            }
        });
    };

    const handleJoinTable = () => {
        if (walletBalance === 0) {
            Toast.show('Match not found.');
            return;
        }

        if (!socket.current?.connected) {
            setupSocketConnection();
        }

        if (socket.current?.connected) {
            setIsLoading(true);
            setIsJoining(true);

            socket.current.emit('get_players', {
                playerId: userData?._id,
                contestId: routeData?._id,
                timestamp: Date.now()
            });
        } else {
            setIsLoading(false);
        }
    };

    const onMatchIdFound = async () => {
        try {
            const matchFoundRes = await GET_WITH_TOKEN(`game/${matchId}`);
            if (matchFoundRes?.success === true) {
                const otherPlayerIds = matchFoundRes?.data?.players?.filter(
                    playerId => playerId !== userData?._id
                );
                const playerProfiles = await Promise.all(
                    otherPlayerIds.map(async (playerId) => {
                        try {
                            const profileRes = await GET_WITH_TOKEN(`user/getprofile?user_id=${playerId}`);
                            if (profileRes?.success) {
                                return {
                                    name: profileRes?.data?.username || 'Player',
                                    _id: profileRes?.data?.id,
                                    avatar: !profileRes?.data?.logo ? USER_IMG : `${BASE_URL}${profileRes?.data?.logo}`,
                                    joinedAt: 'Just now'
                                };
                            }
                            return null;
                        } catch (error) {
                            console.log(`Error fetching profile for ${playerId}:`, error);
                            return null;
                        }
                    })
                );
                const validPlayers = playerProfiles?.filter(player => player !== null);
                setPlayers(validPlayers);
                if (!!validPlayers) {
                    setIsLoading(false);
                    setIsWaitingForUnity(true);

                    setTimeout(() => {
                        launchUnityWithDataCallback(
                            `${BASE_URL}`,
                            `${BASE_URL}`,
                            userToken,
                            gameRoute=='Rummy' ?'rummy':'ludo',
                            matchId,
                            null,
                            () => {
                                console.log('Returned from Unity');
                                navigation.goBack();
                            }
                        );
                    }, 10000);
                }
            }
        } catch (error) {
            console.log(error, '==error');
            setIsLoading(false);
            setIsWaitingForUnity(false);
        }
    };

    return (
        <View style={styles.container}>
            <HeaderComponent title={'Join Table'} />

            <View style={styles.card}>
                <View style={styles.tableHeader}>
                    <Typography size={16} fontFamily={SEMI_BOLD}>{routeData?.gameMode}</Typography>
                    <Icon source={gameIcon} size={40} tintColor={themeColor} />
                </View>

                <View style={styles.tableInfo}>
                    <View style={styles.infoColumn}>
                        <Typography color={GREY} size={14} fontFamily={MEDIUM}>Entry Fee</Typography>
                        <Typography size={16} fontFamily={SEMI_BOLD}>{`₹${routeData?.bet}`}</Typography>
                    </View>
                    <View style={styles.infoColumn}>
                        <Typography color={GREY} size={14} fontFamily={MEDIUM}>Prize Pool</Typography>
                        <Typography size={16} fontFamily={SEMI_BOLD}>{`₹${routeData?.totalBet}`}</Typography>
                    </View>
                    <View style={styles.infoColumn}>
                        <Typography color={GREY} size={14} fontFamily={MEDIUM}>Players</Typography>
                        <Typography size={16} fontFamily={SEMI_BOLD}>
                            {routeData?.gameType?.replace('Player', '')}
                        </Typography>
                    </View>
                </View>
            </View>

            <View style={styles.card}>
                <Typography size={16} fontFamily={SEMI_BOLD} style={{ marginBottom: 10 }}>Current Players</Typography>
                <View style={[styles.playerItem, isWaitingForUnity && styles.playerItemHighlight]}>
                    <Image
                        source={!userData?.logo ? USER_IMG : { uri: `${BASE_URL}${userData?.logo}` }}
                        style={styles.playerAvatar}
                    />
                    <View>
                        <Typography size={14} fontFamily={SEMI_BOLD}>{userData?.username || 'You'}</Typography>
                        <Typography size={12} color={GREY} fontFamily={MEDIUM}>Joined Just now</Typography>
                    </View>
                </View>
                {players?.map((item, index) => (
                    <View key={index} style={[styles.playerItem, isWaitingForUnity && styles.playerItemHighlight]}>
                        <Image source={item?.avatar} style={styles.playerAvatar} />
                        <View>
                            <Typography size={14} fontFamily={SEMI_BOLD}>{item?.name}</Typography>
                            <Typography size={12} color={GREY} fontFamily={MEDIUM}>Joined {item?.joinedAt}</Typography>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.card}>
                <View style={styles.balanceRow}>
                    <Typography size={14} fontFamily={MEDIUM}>Wallet Balance</Typography>
                    <Typography size={14} fontFamily={SEMI_BOLD} color="#22C55E">
                        {`₹${walletBalance}`}
                    </Typography>
                </View>
                <View style={styles.balanceRow}>
                    <Typography size={14} fontFamily={MEDIUM}>Entry Fee</Typography>
                    <Typography size={14} fontFamily={SEMI_BOLD} color="#EF4444">-{`₹${routeData?.bet}`}</Typography>
                </View>
                <View style={[styles.balanceRow, styles.totalRow]}>
                    <Typography size={14} fontFamily={MEDIUM}>Balance after join</Typography>
                    <Typography size={14} fontFamily={SEMI_BOLD} color="#22C55E">{`₹${balanceAfterJoin}`}</Typography>
                </View>
            </View>

            <View style={styles.footer}>
                <View style={styles.footerInfo}>
                    <Icon source={SECURE} size={20} tintColor={themeColor} />
                    <Typography size={12} color={GREY} style={{ marginLeft: 5 }}>Safe & Secure</Typography>
                </View>
                <View style={styles.footerInfo}>
                    <Icon source={WATCH} tintColor={themeColor} size={20} />
                    <Typography size={12} color={GREY} style={{ marginLeft: 5 }}>24/7 Support</Typography>
                </View>
            </View>

            <CustomButton
                title={isWaitingForUnity ? formatTime(countdown) : (isJoining ? "Waiting for Match..." : "Join Table Now")}
                style={styles.joinButton}
                backgroundColor={themeColor}
                onPress={handleJoinTable}
                disabled={isJoining || isWaitingForUnity}
            />

            <Loader visible={isLoading} textAppear />
        </View>
    );
};

export default GameJoinTable;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
    },
    card: {
        width: FULL_WIDTH - 32,
        alignSelf: 'center',
        backgroundColor: WHITE,
        elevation: 2,
        marginVertical: 8,
        borderRadius: 12,
        padding: 16,
        shadowColor: BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    tableInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoColumn: {
        alignItems: 'center',
    },
    playerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    playerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    balanceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingTop: 8,
        marginTop: 4,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 80,
        width: '100%',
    },
    footerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 12,
    },
    joinButton: {
        position: 'absolute',
        bottom: 16,
        width: FULL_WIDTH - 32,
    },
    playerItemHighlight: {
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        borderRadius: 8,
        padding: 8,
        marginBottom: 8,
    },
}); 