import React, { useCallback, memo } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
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
import { PROFILE2 } from '../../../Components/ImageAsstes';
import HeaderComponent from '../../../Components/HeaderComponent';
import { useNavigation } from '@react-navigation/native';

// ContestCard component
const ContestCard = memo(({ contest, navigation }) => {
  const renderTeamCircle = (team, isGolden = false) => (
    <View style={[styles.teamCircle, isGolden && { backgroundColor: GOLDEN }]}>
      <Typography color={WHITE} fontFamily={MEDIUM} size={14}>
        {team}
      </Typography>
    </View>
  );

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={()=>{
      navigation.navigate('SelectContestsScreen')
    }} style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View style={styles.leagueContainer}>
          <Typography fontFamily={MEDIUM} size={14}>
            {contest.league}
          </Typography>
        </View>
        <Typography fontFamily={MEDIUM} size={14}>
          {contest.time}
        </Typography>
      </View>

      <View style={styles.teamsContainer}>
        {renderTeamCircle(contest.team1, false)}
        <Typography size={14} fontFamily={MEDIUM} style={styles.vsText}>
          vs
        </Typography>
        {renderTeamCircle(contest.team2, true)}
      </View>

      <View style={styles.contestDetails}>
        <View>
          <Typography fontFamily={BOLD} size={16}>
            {contest.contest}
          </Typography>
          <Typography color={LIGHT_GREEN} fontFamily={MEDIUM} size={12}>
            {contest.prizePool}
          </Typography>
          <View style={styles.spotsContainer}>
            <Icon source={PROFILE2} tintColor={GREY} size={20} />
            <Typography fontFamily={REGULAR} size={12} style={styles.spotsText}>
              {contest.spotsFilled} spots filled
            </Typography>
            <View style={styles.spotsLeftBadge}>
              <Typography color={LIGHT_GREEN} fontFamily={REGULAR} size={12}>
                {contest.spotsLeft} spots left
              </Typography>
            </View>
          </View>
        </View>
        <View style={styles.buttonGroup}>
          
          <TouchableOpacity 
            style={styles.editButton}
            // onPress={() => navigation.navigate('')}
          >
            <Typography color={WHITE} fontFamily={BOLD} size={14}>
              Edit Team
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const ContestsScreen = () => {
  const navigation = useNavigation();

  const contests = [
    {
      id: 1,
      league: 'IPL 2025',
      time: 'Today, 7:30 PM',
      team1: 'MI',
      team2: 'CSK',
      contest: 'Mega Contest',
      prizePool: '₹2 Lakhs Prize Pool',
      spotsFilled: 1234,
      spotsLeft: 766,
    },
    {
      id: 2,
      league: 'IPL 2025',
      time: 'Today, 7:30 PM',
      team1: 'MI',
      team2: 'CSK',
      contest: 'Mega Contest',
      prizePool: '₹2 Lakhs Prize Pool',
      spotsFilled: 1234,
      spotsLeft: 766,
    },
    {
      id: 3,
      league: 'IPL 2025',
      time: 'Today, 7:30 PM',
      team1: 'MI',
      team2: 'CSK',
      contest: 'Mega Contest',
      prizePool: '₹2 Lakhs Prize Pool',
      spotsFilled: 1234,
      spotsLeft: 766,
    },{
      id: 4,
      league: 'IPL 2025',
      time: 'Today, 7:30 PM',
      team1: 'MI',
      team2: 'CSK',
      contest: 'Mega Contest',
      prizePool: '₹2 Lakhs Prize Pool',
      spotsFilled: 1234,
      spotsLeft: 766,
    },{
      id: 5,
      league: 'IPL 2025',
      time: 'Today, 7:30 PM',
      team1: 'MI',
      team2: 'CSK',
      contest: 'Mega Contest',
      prizePool: '₹2 Lakhs Prize Pool',
      spotsFilled: 1234,
      spotsLeft: 766,
    },
  ];

  const renderItem = useCallback(({ item }) => 
    <ContestCard contest={item} navigation={navigation} />, 
    [navigation]
  );

  return (
    <View style={styles.container}>
      <HeaderComponent title="Upcoming Matches" />
      <View style={styles.todayBadge}>
        <Typography color={GREY} fontFamily={MEDIUM}>
          5 Contests Joined
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
          <Typography color={WHITE} fontFamily={BOLD} size={12}>
            Scoreboard
          </Typography>
        </TouchableOpacity>
      </View>

      <FlatList
        data={contests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.myContestsButton}
          onPress={() => navigation.navigate('CreateTeamScreen')}
        >
          <Typography color={WHITE} fontFamily={BOLD} size={14}>
            Create Team
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity style={styles.joinMoreButton}>
          <Typography color={WHITE} fontFamily={BOLD} size={14}>
            Join More
          </Typography>
        </TouchableOpacity>
      </View>
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
    width: 36,
    height: 36,
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
});

export default ContestsScreen;
