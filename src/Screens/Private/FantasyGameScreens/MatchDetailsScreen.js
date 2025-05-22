import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
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
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Icon from '../../../Components/Icon';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../../Backend/Backend';
import { STATIC_USER } from '../../../Components/ImageAsstes';

const MatchDetailsScreen = ({ route }) => {
  const { matchId,
    shadow_contest_id,
    contest_category_id,
    contestAllInfo,
    winningAmount,
    spotsLeftWidth,
    spotsLeftCount,
    firstPrice,
    JoinWithMULT,
    totalJoinedTeams,
    rankData,
    matchObjectId } = route.params;
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.user);
  // console.log(contestAllInfo?.TeamBlogo,'==blogo');
  
  const wsUrl = `wss://app.mybattle11.com/leader-board?limit=10&skip=0&matchid=${matchId}&shadow_contest_id=${shadow_contest_id}&contest_category_id=${contest_category_id}&user_id=${user?._id}`;

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'winnings', title: 'Winnings' },
    { key: 'leaderboard', title: 'Leaderboard' },
    { key: 'scorecard', title: 'Scorecard' },
  ]);
  const [leaderBoardData, setleaderBoardData] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(wsUrl);
    ws.current.onopen = () => {
      console.log('WebSocket Connected');
    };
    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setleaderBoardData(data);
      } catch (error) {
        console.error('Error parsing WebSocket data:', error);
      }
    };
    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.current.onclose = () => {
      console.log('WebSocket Disconnected');
    };
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [wsUrl]);

  const renderWinningsItem = ({ item, index }) => (
    <View style={[
      styles.winningsRow,
      index % 2 === 0 ? styles.evenRow : styles.oddRow
    ]}>
      <Typography fontFamily={MEDIUM} size={14}>
        # {item?.StartRank}-{item?.EndRank}
      </Typography>
      <Typography fontFamily={MEDIUM} size={14}>
        ₹{item?.Price}
      </Typography>
    </View>
  );
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
        data={rankData?.Rankdata}
        renderItem={renderWinningsItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.rank}
        contentContainerStyle={styles.winningsList}
      />
    </View>
  );

  const LeaderboardTab = () => (
    <View style={styles.tabContentContainer}>
      <FlatList
        data={leaderBoardData?.data}
        renderItem={({ item, index }) => (
          <View style={[styles.leaderboardRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon source={item?.logo === undefined ? STATIC_USER : { uri: `${BASE_URL}${item?.logo}` }} size={25} style={{ borderRadius: 20, }} />
              <Typography fontFamily={MEDIUM} size={14} style={{ marginLeft: 10 }}>
                {item?.username || item?.full_name}
              </Typography>
            </View>
            <Typography fontFamily={MEDIUM} size={14}>
              {item?.team_details?.name || '0'}
            </Typography>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
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
        <Icon size={40} source={{ uri: contestAllInfo?.TeamAlogo }} />
        <Typography fontFamily={BOLD} color={DARK_RED}>   Vs   </Typography>
        <Icon size={40} source={{ uri: contestAllInfo?.TeamBlogo }} />

      </View>

      <View style={styles.prizePool}>
        <Typography fontFamily={SEMI_BOLD} size={24} color={GOLDEN}>
          ₹{winningAmount || 0}
        </Typography>
        <Typography fontFamily={REGULAR} size={14} color={GREY}>
          Prize Pool
        </Typography>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, {
              width: spotsLeftWidth
            }]} />
          </View>
        </View>

        <Typography fontFamily={REGULAR} size={14} color={BLACK}>
          {`${spotsLeftCount || 0}`} spots left
        </Typography>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Typography fontFamily={BOLD} size={16}>
            ₹{firstPrice || 0}
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
            {JoinWithMULT
              ? `Upto ${totalJoinedTeams}`
              : 'Single'}
          </Typography>
          <Typography fontFamily={REGULAR} size={12} color={GREY}>
            Teams
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

      <TouchableOpacity style={styles.joinButton} onPress={() => {
        navigation.navigate('CreateTeamScreen', {
          matchObjectId: matchObjectId,
           teamALogo: contestAllInfo?.TeamAlogo,
           teamBLogo: contestAllInfo?.TeamBlogo
        })
      }}>
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
    flexDirection: "row",
    alignItems: "center"
  },
  prizePool: {
    alignItems: 'center',
    marginTop: 20
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
    marginTop: 15
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
    marginTop: 10
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
  leaderboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#F9E5B7',
    marginTop: 10
  },
  leaderboardRow: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    justifyContent: 'space-between'
  },
});

export default MatchDetailsScreen; 