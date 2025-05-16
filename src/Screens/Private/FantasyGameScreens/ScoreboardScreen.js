import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Typography from '../../../Components/Typography';
import Icon from '../../../Components/Icon';
import { BOLD, MEDIUM, REGULAR } from '../../../Components/AppFonts';
import { BLACK, WHITE, GREY, LIGHT_GREY } from '../../../Components/Colors';
import HeaderComponent from '../../../Components/HeaderComponent';

const ScoreboardScreen = () => {
  const navigation = useNavigation();

  // Mock data for the scoreboard based on the image
  const scoreData = [
    { Over: 'Over 1', scoreboard: 1, runs: 14, points: 156 },
    { Over: 'Over 2', scoreboard: 2, runs: 14, points: 142 },
    { Over: 'Over 3', scoreboard: 3, runs: 9, points: 128 },
    { Over: 'Over 4', scoreboard: 1, runs: 14, points: 156 },
    { Over: 'Over 5', scoreboard: 2, runs: 14, points: 142 },
    { Over: 'Over 6', scoreboard: 3, runs: 9, points: 128 },
    { Over: 'Over 7', scoreboard: 1, runs: 14, points: 156 },
    { Over: 'Over 8', scoreboard: 2, runs: 14, points: 142 },
    { Over: 'Over 9', scoreboard: 3, runs: 9, points: 128 },
    { Over: 'Over 10', scoreboard: 1, runs: 14, points: 156 },
    { Over: 'Over 11', scoreboard: 2, runs: 14, points: 142 },
    { Over: 'Over 12', scoreboard: 3, runs: 9, points: 128 },
    { Over: 'Over 10', scoreboard: 1, runs: 14, points: 156 },
    { Over: 'Over 11', scoreboard: 2, runs: 14, points: 142 },
    { Over: 'Over 12', scoreboard: 3, runs: 9, points: 128 },
    { Over: 'Over 13', scoreboard: 3, runs: 9, points: 128 },
    { Over: 'Over 14', scoreboard: 3, runs: 9, points: 128 },
    { Over: 'Over 15', scoreboard: 3, runs: 9, points: 128 },
    { Over: 'Over 16', scoreboard: 3, runs: 9, points: 128 },
    { Over: 'Over 17', scoreboard: 3, runs: 9, points: 128 },
    { Over: 'Over 18', scoreboard: 3, runs: 9, points: 128 },
    { Over: 'Over 19', scoreboard: 3, runs: 9, points: 128 },
    { Over: 'Over 20', scoreboard: 3, runs: 9, points: 128 },


  ];

  // Render table header
  const renderHeader = () => (
    <View style={styles.tableHeader}>
      <Typography color={WHITE} fontFamily={BOLD} size={14} style={styles.headerText}>Over</Typography>
      <Typography color={WHITE} fontFamily={BOLD} size={14} style={styles.headerText}>scoreboard</Typography>
      <Typography color={WHITE} fontFamily={BOLD} size={14} style={styles.headerText}>Runs</Typography>
      <Typography color={WHITE} fontFamily={BOLD} size={14} style={styles.headerText}>Points</Typography>
    </View>
  );

  // Render table row
  const renderItem = ({ item, index }) => (
    <View style={[
      styles.tableRow, 
      { backgroundColor: index % 2 === 0 ? WHITE : '#aa050a5c' }
    ]}>
      <Typography fontFamily={MEDIUM} size={14} style={styles.rowText}>{item.Over}</Typography>
      <Typography fontFamily={MEDIUM} size={14} style={styles.rowText}>{item.scoreboard}</Typography>
      <Typography fontFamily={MEDIUM} size={14} style={styles.rowText}>{item.runs}</Typography>
      <Typography fontFamily={MEDIUM} size={14} style={styles.rowText}>{item.points}</Typography>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title={'Scoreboard'} walletIcon onWalletPress={()=>{
        navigation.navigate('ContestDetailsScreen')
      }}/>
      

      <View style={styles.tableContainer}>
        {renderHeader()}
        <FlatList
          data={scoreData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
 
 
  tableContainer: {
    margin: 10,
    backgroundColor: WHITE,
    borderRadius: 5,
    Overflow: 'hidden',
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#CC0000',
    padding: 12,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: LIGHT_GREY,
    paddingVertical: 12,
  },
  rowText: {
    flex: 1,
    textAlign: 'center',
  },
});

export default ScoreboardScreen; 