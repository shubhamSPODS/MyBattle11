import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Typography from '../../../Components/Typography';
import HeaderComponent from '../../../Components/HeaderComponent';
import CustomButton from '../../../Components/CustomButton';
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
import { useSelector } from 'react-redux';

const SelectContestsScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('All Contests');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const contestData = useSelector(store => store?.matches);
  const user = useSelector(state => state.auth.user);


  useEffect(() => {
    if (contestData?.upcomingMatches?.[0] && contestData?.upcomingMatches[0]?.contest_details?.[0]?.data?.[0]) {
      const matchDetails = contestData.upcomingMatches[0];
      const contestCategory = matchDetails.contest_details[0].data[0];
      
      const wsUrl = `ws://app.mybattle11.com/leader-board?limit=10&skip=0&matchid=${matchDetails.MatchId}&contest_category_id=${contestCategory?.contest_category_id}&user_id=${user?._id}`;
       console.log(wsUrl,'==url');
       
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('WebSocket Connected');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Leaderboard data received:', data);
          setLeaderboardData(data);
        } catch (error) {
          console.error('Error parsing WebSocket data:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
      };

      return () => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.close();
        }
      };
    }
  }, [contestData, user]);

  const tabs = [
    { id: 1, name: 'All Contests', selected: true },
    { id: 2, name: 'Free (3)', selected: false },
    { id: 3, name: 'Practice (5)', selected: false },
  ];

  const contests = [
    {
      id: 1,
      prizePool: '₹2 Lakhs',
      trophy: '₹15',
      spotsFilled: 1500,
      totalSpots: 10000,
      firstPrize: '₹25,000',
      secondPrize: '₹15,000',
    },
    {
      id: 2,
      prizePool: '₹2 Lakhs',
      trophy: '₹15',
      spotsFilled: 7500,
      totalSpots: 10000,
      firstPrize: '₹25,000',
      secondPrize: '₹15,000',
    },
    {
      id: 3,
      prizePool: '₹2 Lakhs',
      trophy: '₹15',
      spotsFilled: 7500,
      totalSpots: 10000,
      firstPrize: '₹25,000',
      secondPrize: '₹15,000',
    },
  ];

  const renderTabItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.tabItem,
        activeTab === item.name && styles.activeTabItem,
      ]}
      onPress={() => setActiveTab(item.name)}
    >
      <Typography
        fontFamily={MEDIUM}
        size={12}
        color={activeTab === item.name ? WHITE : BLACK}
      >
        {item.name}
      </Typography>
    </TouchableOpacity>
  );

  const renderContestItem = ({ item }) => (
    <View style={styles.contestCard}>
      <View style={styles.contestHeader}>
        <View style={styles.prizePoolContainer}>
          <Typography fontFamily={MEDIUM} size={14} color={BLACK}>
            {item.prizePool}
          </Typography>
        </View>
        <View style={styles.trophyContainer}>
          <Typography fontFamily={MEDIUM} size={14} color={BLACK}>
            🏆 {item.trophy}
          </Typography>
        </View>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(item.spotsFilled / item.totalSpots) * 100}%` },
            ]}
          />
        </View>
      </View>

      <View style={styles.spotsContainer}>
        <Typography fontFamily={REGULAR} size={12} color={DARK_RED}>
          {item.spotsFilled} spots left
        </Typography>
        <Typography fontFamily={REGULAR} size={12} color={GREY}>
          {item.totalSpots} spots
        </Typography>
      </View>

      <View style={styles.prizesContainer}>
        <View style={styles.prizeItem}>
          <Typography fontFamily={REGULAR} size={12} color={GREY}>
            1st
          </Typography>
          <Typography fontFamily={MEDIUM} size={14} color={LIGHT_GREEN}>
            {item.firstPrize}
          </Typography>
        </View>
        <View style={styles.prizeItem}>
          <Typography fontFamily={REGULAR} size={12} color={GREY}>
            2nd
          </Typography>
          <Typography fontFamily={MEDIUM} size={14} color={LIGHT_GREEN}>
            {item.secondPrize}
          </Typography>
        </View>
        
        <CustomButton
          title="Join"
          style={styles.joinButton}
          onPress={() => {}}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderComponent title="Select Contest" />
      
      <View style={styles.tabsContainer}>
        <FlatList
          data={tabs}
          renderItem={renderTabItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <FlatList
        data={contests}
        renderItem={renderContestItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.contestsContainer}
      />

      <View style={styles.bottomButtonsContainer}>
        <CustomButton
          title="Create Team"
          style={styles.createTeamButton}
          onPress={() => navigation.navigate('CreateTeamScreen')}
        />
        <CustomButton
          title="Create Scoreboard"
          textStyle={{textAlign:'center',fontSize:13}}
          style={styles.createScoreboardButton}
          onPress={() => navigation.navigate('ScoreboardScreen')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  tabsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tabItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: WHITE,
    borderColor:DARK_RED,
    borderWidth:1
  },
  activeTabItem: {
    backgroundColor: DARK_RED,
  },
  contestsContainer: {
    padding: 10,
    paddingBottom: 80, 
  },
  contestCard: {
    backgroundColor: WHITE,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 15,
  },
  contestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  prizePoolContainer: {
    backgroundColor: '#E6F0FF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  trophyContainer: {
    backgroundColor: '#FFF5E6',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarContainer: {
    marginVertical: 5,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#EBEBEB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: DARK_RED,
    borderRadius: 3,
  },
  spotsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  prizesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  prizeItem: {
    alignItems: 'center',
  },
  joinButton: {
    width: 80,
    height: 36,
    borderRadius: 5,
    backgroundColor: DARK_RED,
    marginTop: 0,
    paddingVertical: 5,
  },
  bottomButtonsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: WHITE,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: LIGHT_GREY,
  },
  createTeamButton: {
    width: '45%',
    backgroundColor: DARK_RED,
  },
  createScoreboardButton: {
    width: '50%',
    backgroundColor: GOLDEN,
   
  },
});

export default SelectContestsScreen; 