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
import Typography, { FULL_WIDTH } from '../../../Components/Typography';
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
import EmptyList from '../../../Components/EmptyList';

const SelectContestsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { contestDetails, contestAllInfo, matchId } = route.params;
  
 console.log(contestDetails,contestAllInfo,matchId,'====match id');
 
    
  const renderContestItem = ({ item }) => (
    <>
      {item?.contest_info?.length > 0 ? <>
        <View style={styles.contestCard}>
          <View style={styles.contestHeader}>
            <View style={styles.prizePoolContainer}>
              <Typography fontFamily={MEDIUM} size={14} color={BLACK}>
                {item?.contest_info[0]?.EnteryFee === 0 ? 'Free' : `₹${item?.contest_info[0]?.EnteryFee}`}
              </Typography>
            </View>
            <View style={styles.trophyContainer}>
              <Typography fontFamily={MEDIUM} size={14} color={BLACK}>
                🏆 {item?.contest_info[0]?.WinningAmount}
              </Typography>
            </View>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(item?.joined / item?.contest_info[0]?.Contestsize) * 100}%` },
                ]}
              />
            </View>
          </View>

          <View style={styles.spotsContainer}>
            <Typography fontFamily={REGULAR} size={12} color={DARK_RED}>
              {`${Math.max(0, item?.contest_info[0]?.Contestsize - item?.joined)}`} spots left
            </Typography>
            <Typography fontFamily={REGULAR} size={12} color={GREY}>
              {item?.contest_info[0]?.Contestsize} spots
            </Typography>
          </View>

          <View style={styles.prizesContainer}>
            {item?.contest_info[0]?.EnteryFee !== 0 ? (
              <>
                <View style={styles.prizeItem}>
                  <Typography fontFamily={REGULAR} size={12} color={GREY}>
                    1st
                  </Typography>
                  <Typography fontFamily={MEDIUM} size={14} color={LIGHT_GREEN}>
                    ₹{item?.contest_info[0]?.Rankdata[0]?.Price}
                  </Typography>
                </View>
                <View style={styles.prizeItem}>
                  <Typography fontFamily={REGULAR} size={12} color={GREY}>
                    2nd
                  </Typography>
                  <Typography fontFamily={REGULAR} size={14} color={LIGHT_GREEN}>
                    ₹{item?.contest_info[0]?.Rankdata[1]?.Price === undefined ? 0 : item?.contest_info[0]?.Rankdata[1]?.Price}
                  </Typography>
                </View>
              </>
            ) : (
              <View />
            )}
            <CustomButton
              title="Join"
              style={styles.joinButton}
              onPress={() => {
                navigation.navigate('MatchDetailsScreen',
                  {
                    contestDetails:contestDetails,
                    contestAllInfo: contestAllInfo,
                    winningAmount: item?.contest_info[0]?.WinningAmount,
                    spotsLeftWidth: `${(item?.joined / item?.contest_info[0]?.Contestsize) * 100}%`,
                    spotsLeftCount: `${Math.max(0, item?.contest_info[0]?.Contestsize - item?.joined)}`,
                    firstPrice: item?.contest_info[0]?.Rankdata[0]?.Price,
                    JoinWithMULT: item?.contest_info[0]?.JoinWithMULT,
                    totalJoinedTeams: item?.contest_info[0]?.teams,
                    contest_category_id: item?.contest_category_id,
                    shadow_contest_id: item?.shadow_contest_id,
                    matchId: matchId,
                    rankData: item?.contest_info[0],
                    matchObjectId : contestAllInfo?._id
                  })
              }}
            />
          </View>
        </View>
      </>
        :
        <EmptyList />
      }
    </>

  );

  return (
    <View style={styles.container}>
      <HeaderComponent title="Select Contest" />
      <FlatList
        data={contestDetails?.data}
        renderItem={renderContestItem}
        contentContainerStyle={styles.contestsContainer}
      />

      {/* <View style={styles.bottomButtonsContainer}>
        <CustomButton
          title="Create Team"
          style={styles.createTeamButton}
          onPress={() => navigation.navigate('CreateTeamScreen')}
        />
        <CustomButton
          title="Create Scoreboard"
          textStyle={{ textAlign: 'center', fontSize: 13 }}
          style={styles.createScoreboardButton}
          onPress={() => navigation.navigate('ScoreboardScreen')}
        />
      </View> */}
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
    borderColor: DARK_RED,
    borderWidth: 1,
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
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: WHITE,
    paddingVertical: 10,
    paddingHorizontal: 10,
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