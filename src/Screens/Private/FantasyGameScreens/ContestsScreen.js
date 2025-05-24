import React, { useCallback, memo, useEffect, useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import Typography from '../../../Components/Typography';
import Icon from '../../../Components/Icon';
import {
  BLACK,
  GOLDEN,
  GREY,
  LIGHT_GREEN,
  LIGHT_GREY,
  LIGHT_SKY_BLUE,
  WHITE,
} from '../../../Components/Colors';
import { BOLD, MEDIUM, REGULAR } from '../../../Components/AppFonts';
import {  PROFILE2 } from '../../../Components/ImageAsstes';
import HeaderComponent from '../../../Components/HeaderComponent';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setMatchesData, selectUpcomingMatches, setContestData } from '../../../Redux/Slice';

const ContestCard = memo(({ contest, navigation }) => {
  const dispatch = useDispatch();
  
  const handleContestPress = () => {
    // Save contest data to Redux
    dispatch(setContestData({
      matchId: contest?.MatchId,
      contestDetails: contest?.contest_details || [],
      contestAllInfo: contest
    }));
    
    // Navigate to SelectContestsScreen
    navigation.navigate('SelectContestsScreen', { 
      contestDetails: contest?.contest_details || [],
      contestAllInfo: contest
    });
  };

  const renderTeamCircle = (team, teamName) => (
    <View>
      <Icon source={{uri:team}} size={30}/>
      <Typography fontFamily={MEDIUM} size={13} style={{marginTop:5}}>{teamName}</Typography>
    </View>
  );

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handleContestPress} style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View style={styles.leagueContainer}>
          <Typography fontFamily={MEDIUM} size={12}>
            {contest.SeriesName}
          </Typography>
        </View>
        <Typography fontFamily={MEDIUM} size={12}>
          {contest.Type}
        </Typography>
      </View>

      <View style={styles.teamsContainer}>
        {renderTeamCircle(contest.TeamAlogo, contest?.TeamAshortName)}
        <Typography size={12} fontFamily={MEDIUM} style={styles.vsText}>
          vs
        </Typography>
        {renderTeamCircle(contest.TeamBlogo, contest?.TeamBshortName)}
      </View>

      <View style={styles.contestDetails}>
        <View>
          <Typography fontFamily={BOLD} size={14}>
            {contest.Team1vsTeam2}
          </Typography>
          <Typography color={LIGHT_GREEN} fontFamily={MEDIUM} size={10}>
            {contest.SeriesShortName}
          </Typography>
          <View style={styles.spotsContainer}>
            <Icon source={PROFILE2} tintColor={GREY} size={15} />
            <Typography fontFamily={REGULAR} size={12} style={styles.spotsText}>
              Match ID: {contest.MatchId}
            </Typography>
          </View>
        </View>
      
      </View>
    </TouchableOpacity>
  );
});

const ContestsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(state => state.auth.user);
  const _id = user?._id;
  const contests = useSelector(selectUpcomingMatches);
   
  const memoizedContests = useMemo(() => contests, [contests?.length]);
  
  useEffect(() => {
    if (!_id) return;
    const URL = `ws://app.mybattle11.com/upcoming-matches?limit=20&skip=0&userid=${_id}`;
    let ws = null;
    let reconnectTimeout = null;
    let reconnectAttempts = 0;
    const MAX_RECONNECT_ATTEMPTS = 5;
    const RECONNECT_DELAY = 3000;

    const connectWebSocket = () => {
      ws = new WebSocket(URL);

      ws.onopen = () => {
        console.log('WebSocket Connected');
        setIsLoading(false);
        reconnectAttempts = 0; 
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data) {
            dispatch(setMatchesData(data));
          }
        } catch (error) {
          console.error('Error parsing WebSocket data:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
        if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
          reconnectTimeout = setTimeout(() => {
            reconnectAttempts++;
            console.log(`Attempting to reconnect (${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`);
            connectWebSocket();
          }, RECONNECT_DELAY);
        } else {
          setIsLoading(false);
        }
      };

      ws.onclose = (event) => {
        console.log('WebSocket Disconnected:', event.code, event.reason);
        if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
          reconnectTimeout = setTimeout(() => {
            reconnectAttempts++;
            console.log(`Attempting to reconnect (${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`);
            connectWebSocket();
          }, RECONNECT_DELAY);
        }
      };
    };

    connectWebSocket();

    return () => {
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
      if (ws) {
        ws.close();
      }
    };
  }, [_id, dispatch]);

  const renderItem = useCallback(({ item }) => 
    <ContestCard contest={item} navigation={navigation} />, 
    [navigation]
  );

  const keyExtractor = useCallback((item) => item.MatchId?.toString() || item._id?.toString(), []);

  return (
    <View style={styles.container}>
      <HeaderComponent title="Upcoming Matches" />
      <View style={styles.todayBadge}>
        <Typography color={GREY} size={13} fontFamily={MEDIUM}>
          {memoizedContests?.length} Matches Available
        </Typography>
        <View style={styles.todayContainer}>
          <Typography color={BLACK} fontFamily={REGULAR} size={10}>
            Today
          </Typography>
        </View>
        <TouchableOpacity 
          style={styles.scoreboardButton}
          onPress={() => navigation.navigate('ScoreboardScreen')}
        >
          <Typography color={WHITE} fontFamily={BOLD} size={10}>
            Scoreboard
          </Typography>
        </TouchableOpacity>
      </View>

      <FlatList
        data={memoizedContests}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={10}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Typography color={GREY} size={14} fontFamily={MEDIUM}>
              {isLoading ? 'Loading matches...' : 'No matches available'}
            </Typography>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  todayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  todayContainer: {
    backgroundColor: LIGHT_SKY_BLUE,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leagueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBlockColor: LIGHT_GREY,
  },
  cardContainer: {
    backgroundColor: WHITE,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  teamCircle: {
    width: 30,
    height: 30,
    borderRadius: 18,
    backgroundColor: '#D40C0C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vsText: {
    marginHorizontal: 16,
  },
  contestDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:"100%"
  },
  spotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  spotsText: {
    marginLeft: 6,
  },
  spotsLeftBadge: {
    backgroundColor: '#E6F5EF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#D40C0C',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 20,
    marginTop: 10,
  },
  myContestsButton: {
    backgroundColor: '#D40C0C',
    paddingVertical: 12,
    borderRadius: 6,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  joinMoreButton: {
    backgroundColor: '#D40C0C',
    paddingVertical: 12,
    borderRadius: 6,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  scoreboardButton: {
    backgroundColor: '#D40C0C',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 'auto',
  },
  buttonGroup: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 80,
  },
  scoreButton: {
    backgroundColor: '#D40C0C',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 8,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default memo(ContestsScreen);
