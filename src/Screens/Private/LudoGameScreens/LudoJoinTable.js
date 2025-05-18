import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { BLACK, DARK_PURPLE, GOLDEN, GREY, WHITE } from '../../../Components/Colors';
import HeaderComponent from '../../../Components/HeaderComponent';
import Typography, { FULL_WIDTH } from '../../../Components/Typography';
import { MEDIUM, REGULAR, SEMI_BOLD } from '../../../Components/AppFonts';
import CustomButton from '../../../Components/CustomButton';
import Icon from '../../../Components/Icon';
import { DICE, DICE_2, LUDO_IMG, PROFILE2, SAFE_SECURE, SECURE, SUPPORT, USER_IMG, WATCH } from '../../../Components/ImageAsstes';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { BASE_URL, GET_WITH_TOKEN } from '../../../Backend/Backend';
import Toast from 'react-native-simple-toast';
import Loader from '../../../Components/Loader';
import { launchUnityWithData ,launchUnityWithDataCallback} from 'react-native-unity-launcher';

const LudoJoinTable = ({ route,navigation }) => {
  const userData = useSelector((state) => state.auth.user);
  const userToken = useSelector((state) => state.auth?.token);
  const [matchId, setMatchId] = useState('')
  const socket = useRef(null);
  const routeData = route?.params?.playerDetails
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [players, setPlayers] = useState([]);
  const [isJoining, setIsJoining] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  console.log(routeData?._id, '=routeData?._id');

  useEffect(() => {
    if (!!matchId) {
      onMatchIdFound();
    }
  }, [matchId]);


  const setupSocketConnection = () => {
    let url = `${BASE_URL}server/matchmaking`
    let path = '/socket.io'
    let transports = ['websocket']
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
      console.log('✅ Socket connected');
      console.log('🔌 Socket ID:', socket.current.id);
      console.log('📡 Connection state:', socket.current.connected);
      setIsSocketConnected(true);
      setIsLoading(true);
      setTimeout(() => {
        if (socket.current?.connected) {
          console.log('🕒 Emitting get_players after 15 seconds');
          socket.current.emit('get_players', {
            playerId: userData?._id,
            contestId: routeData?._id,
            timestamp: Date.now()
          });
        }
      }, 15000);
    });

    socket.current.on('error', (err) => {
      console.log('❗ Connect error:', err.message);
      console.log('🔍 Error details:', {
        type: err.type,
        description: err.description
      });
    });

    socket.current.on('info', (playerData) => {
      console.log('📥 info', playerData);
      if (playerData?.matchId) {
        setPlayers(prev => [...prev, playerData]);
      }
    });

    socket.current.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
      setIsSocketConnected(false);
      if (reason === 'io server disconnect') {
        console.log('❌ Server disconnected, stopping loader');
        setIsLoading(false);
        setIsJoining(false);
      }
    });

    socket.current.on('match_found', (matchData) => {
      console.log('🎮 Match found event received!');
      console.log('📦 Match data:', matchData);
      setIsJoining(true);
      setIsLoading(true);

      if (matchData?.matchId) {
        console.log('✅ Match found successfully');
        setMatchId(matchData?.matchId);

      } else {
        console.log('❌ Match found but with error:', matchData?.message);
        setIsJoining(false);
      }
    });

    socket.current.on('match_status', (status) => {
      console.log('📊 Match status update:', status);
    });

    socket.current.on('contest_join_error', (error) => {
      console.log('❌ Contest join error:', error);
      setIsJoining(false);
    });

    socket.current.on('error', (error) => {
      console.log('❌ Socket error:', error);
      if (error.message === 'Connection timeout reached') {
        Toast.show('No match found.')
        setIsLoading(false);
        setIsJoining(false);
      }
    });

    socket.current.on('reconnect', (attemptNumber) => {
      console.log('✅ Socket reconnected after', attemptNumber, 'attempts');
      setIsSocketConnected(true);
      setTimeout(() => {
        if (socket.current?.connected) {
          console.log('🔄 Re-emitting get_players after reconnection');
          socket.current.emit('get_players', {
            playerId: userData?._id,
            contestId: routeData?._id,
            timestamp: Date.now()
          });
        }
      }, 15000);
    });

    socket.current.on('reconnect_error', (error) => {
      console.log('❗ Reconnection error:', error);
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
      console.log('📤 Requesting to join table...');
      console.log('📝 Join request data:', {
        playerId: userData?._id,
        contestId: routeData?._id
      });
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
                  avatar: `${BASE_URL}${profileRes?.data?.logo}` || USER_IMG,
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

          launchUnityWithDataCallback(`${BASE_URL}`, `${BASE_URL}`, userToken, 'ludo', matchId,null,() => {
            console.log('Returned from Unity');
            navigation.goBack()
            // Do something after returning from Unity
          })

        }


      }
    } catch (error) {
      console.log(error, '==error');
    } finally {
      setIsLoading(false);
    }
  };

  const walletBalance = Number(userData?.winning_amount || 0) + Number(userData?.cash_bonus || 0) + Number(userData?.totaldeposit || 0)
  const balanceAfterJoin = walletBalance - routeData?.bet
  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>

      <HeaderComponent title={'Join Table'} />

      <View style={styles.card}>
        <View style={styles.tableHeader}>
          <Typography size={16} fontFamily={SEMI_BOLD}>{routeData?.gameMode}</Typography>
          <Icon source={DICE} size={40} />
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
        <View style={styles.playerItem}>
          <Image
            source={{ uri: `${BASE_URL}${userData?.logo}` || USER_IMG }}
            style={styles.playerAvatar}
          />
          <View>
            <Typography size={14} fontFamily={SEMI_BOLD}>{userData?.username || 'You'}</Typography>
            <Typography size={12} color={GREY} fontFamily={MEDIUM}>Joined Just now</Typography>
          </View>
        </View>
        {players?.map((item, index) => (
          <View key={index} style={styles.playerItem}>
            {console.log(item, '==item>>')
            }
            <Image source={{ uri: item?.avatar } || USER_IMG} style={styles.playerAvatar} />
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
          <Icon source={SECURE} size={20} />
          <Typography size={12} color={GREY} style={{ marginLeft: 5 }}>Safe & Secure</Typography>
        </View>
        <View style={styles.footerInfo}>
          <Icon source={WATCH} tintColor={DARK_PURPLE} size={20} />
          <Typography size={12} color={GREY} style={{ marginLeft: 5 }}>24/7 Support</Typography>
        </View>
      </View>

      <CustomButton
        title={isJoining ? "Waiting for Match..." : "Join Table Now"}
        style={styles.joinButton}
        onPress={handleJoinTable}
        disabled={isJoining}
      />

      <Loader visible={isLoading} />
    </View>
  );
};

export default LudoJoinTable;

const styles = StyleSheet.create({
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
  tableNumber: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    color: '#3B82F6',
    fontFamily: MEDIUM,
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
    backgroundColor: GOLDEN,
    width: FULL_WIDTH - 32,
  },
});
