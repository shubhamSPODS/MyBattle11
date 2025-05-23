import { StyleSheet, Text, View, TouchableOpacity, SectionList } from 'react-native';
import React from 'react';
import HeaderComponent from '../../../Components/HeaderComponent';
import { WHITE, BLACK, DARK_RED, LIGHT_GREY, LIGHT_GREEN, GREY } from '../../../Components/Colors';
import Typography, { FULL_WIDTH } from '../../../Components/Typography';
import { BOLD, MEDIUM, SEMI_BOLD } from '../../../Components/AppFonts';
import Icon from '../../../Components/Icon';
import { STATIC_USER } from '../../../Components/ImageAsstes';
import Toast from 'react-native-simple-toast';
import { POST_WITH_TOKEN } from '../../../Backend/Backend';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectCaptain = ({ route, navigation }) => {
  const { selectedPlayers,matchId,matchObjectId,contestAllInfo,contestDetails} = route.params || {}; 
  
        
  const [captain, setCaptain] = React.useState(null);
  const [viceCaptain, setViceCaptain] = React.useState(null);
 
  const handleCaptainSelect = (player) => {
    if (captain?._id === player._id) {
      setCaptain(null);
    } else if (viceCaptain?._id === player._id) {
      Toast.show('Player is already selected as Vice-Captain', Toast.SHORT);
    } else {
      setCaptain(player);
    }
  };

  const handleViceCaptainSelect = (player) => {

    if (viceCaptain?._id === player._id) {
      setViceCaptain(null);
    } else if (captain?._id === player._id) {
      Toast.show('Player is already selected as Captain', Toast.SHORT);
    } else {
      setViceCaptain(player);
    }
  };

  const renderPlayerItem = ({ item }) => {
    const isCaptain = captain?._id === item._id;
    const isViceCaptain = viceCaptain?._id === item._id;

    return (
      <TouchableOpacity
        style={styles.playerItem}
        activeOpacity={0.8}
      >
        <View style={styles.playerInfoContainer}>
          <Icon source={STATIC_USER} size={40} style={styles.playerImage} />
          <View>
            <Typography fontFamily={MEDIUM} size={12}>{item?.short_name}</Typography>
            <Typography size={12} fontFamily={MEDIUM} color={GREY}>{item?.team_label} | {item?.playing_role?.toUpperCase()}</Typography>
          </View>
        </View>
        <View style={styles.playerStatsContainer}>
          <Typography>{(item?.average_point)?.toFixed(2)}</Typography>
          <View style={styles.captainVcButtons}>
            <TouchableOpacity 
              style={[styles.captainVcButton, isCaptain && styles.selectedButton]}
              onPress={() => handleCaptainSelect(item)}
            >
              <Typography style={[styles.buttonText, isCaptain && styles.selectedButtonText]}>C</Typography>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.captainVcButton, styles.vcButton, isViceCaptain && styles.selectedButton]}
              onPress={() => handleViceCaptainSelect(item)}
            >
              <Typography style={[styles.buttonText, isViceCaptain && styles.selectedButtonText]}>VC</Typography>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const groupPlayersByRole = () => {
    const roleMap = {
      wk: 'Wicket-Keeper',
      bat: 'Batsman',
      bowl: 'Bowler',
      all: 'All-Rounder',
    };
    const grouped = Object.entries(roleMap).map(([key, label]) => ({
      title: label,
      data: selectedPlayers?.filter(player =>
        player?.playing_role?.toLowerCase() === key
      ),
    }));
    return grouped?.filter(section => section.data.length > 0);
  };
  
 
  
  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Typography fontFamily={SEMI_BOLD} color={WHITE} size={14}>{title}</Typography>
    </View>
  );

  const onSave = async () => {
    if (!captain || !viceCaptain) {
      Toast.show('Please select both Captain and Vice-Captain');
      return;
    }
  
    const playerIds = selectedPlayers.map(player => player.pid);
  
    try {
      const storedCount = await AsyncStorage.getItem('team_count');
      const teamCount = storedCount ? parseInt(storedCount) : 0;
      const newCount = teamCount + 1;
  
      const teamName = `T${newCount}`;
  
      const body = {
        match_id: matchObjectId, 
        pid: playerIds,
        name: teamName,
        matchid: JSON.stringify(matchId),       
        vice_caption: viceCaptain?.pid,
        caption: captain?.pid,
      };
  
      console.log(body, '=BODYYY');
  
      const createTeam = await POST_WITH_TOKEN('match/create-team', body);
      console.log('Team created:', createTeam);
  
      if (createTeam?.success === true) {
        await AsyncStorage.setItem('team_count', newCount.toString());
        Toast.show('Team created successfully');
      
        navigation.reset({
          index: 1,
          routes: [
            { name: 'ContestsScreen' },
            { 
              name: 'SelectContestsScreen',
              params: {
                contestDetails: contestDetails,
                contestAllInfo: contestAllInfo,
                matchId: matchId,
              }
            }
          ],
        });
      } else {
        Toast.show(createTeam?.message || 'Failed to create team');
      }
    } catch (error) {
      console.log('==error', error);
      Toast.show('Something went wrong');
    }
  };
  

  return (
    <View style={styles.container}>
      <HeaderComponent title={'Create Team'} />
      <View style={styles.subtitleContainer}>
        <Typography fontFamily={SEMI_BOLD} size={15}>Choose Captain & Vice Captain</Typography>
        <Typography size={10}>C will get 2x points & VC will get 1.5x points</Typography>
      </View>

      <SectionList
        sections={groupPlayersByRole()}
        keyExtractor={(item) => item._id?.toString()}
        renderItem={renderPlayerItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={{ paddingBottom: 150 }}
      />

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.previewBtn}>
          <Typography style={styles.bottomBtnText}>TEAM PREVIEW</Typography>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSave} style={styles.saveBtn}>
          <Typography style={[styles.bottomBtnText, { color: WHITE }]}>SAVE</Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectCaptain;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  subtitleContainer: { alignItems: 'center' },
  sectionHeader: {
    backgroundColor: LIGHT_GREEN,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: LIGHT_GREY
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: LIGHT_GREY
  },
  playerInfoContainer: { flexDirection: 'row', alignItems: 'center' },
  playerImage: { marginRight: 12 },
  playerStatsContainer: { flexDirection: 'row', alignItems: 'center' },
  captainVcButtons: { flexDirection: 'row' },
  captainVcButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: LIGHT_GREY,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8
  },
  selectedButton: {
    backgroundColor: DARK_RED,
    borderColor: DARK_RED
  },
  buttonText: { fontSize: 16, fontWeight: SEMI_BOLD },
  selectedButtonText: { color: WHITE },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: WHITE,
    borderTopWidth: 1,
    borderColor: LIGHT_GREY
  },
  previewBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: DARK_RED,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
    padding: 12
  },
  saveBtn: {
    flex: 1,
    backgroundColor: DARK_RED,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
    padding: 12
  },
  bottomBtnText: {
    color: DARK_RED,
    fontWeight: 'bold',
    fontSize: 16
  },
});
