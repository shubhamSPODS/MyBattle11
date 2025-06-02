import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Typography from '../../../Components/Typography';
import Icon from '../../../Components/Icon';
import { BOLD, MEDIUM, REGULAR } from '../../../Components/AppFonts';
import { BLACK, WHITE, GREY, LIGHT_GREY } from '../../../Components/Colors';
import HeaderComponent from '../../../Components/HeaderComponent';

const ScoreboardScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { scoreboardData, allPredictions } = route.params;

  // Render table header
  const renderHeader = () => (
    <View style={styles.tableHeader}>
      <Typography color={WHITE} fontFamily={BOLD} size={14} style={styles.headerText}>Over</Typography>
      <Typography color={WHITE} fontFamily={BOLD} size={14} style={styles.headerText}>Predicted Runs</Typography>
      <Typography color={WHITE} fontFamily={BOLD} size={14} style={styles.headerText}>Actual Runs</Typography>
      <Typography color={WHITE} fontFamily={BOLD} size={14} style={styles.headerText}>Points</Typography>
    </View>
  );

  // Render table row
  const renderItem = ({ item, index }) => (
    <View style={[
      styles.tableRow, 
      { backgroundColor: index % 2 === 0 ? WHITE : '#aa050a5c' }
    ]}>
      <Typography fontFamily={MEDIUM} size={14} style={styles.rowText}>Over {item.over_number}</Typography>
      <Typography fontFamily={MEDIUM} size={14} style={styles.rowText}>{item.runs}</Typography>
      <Typography fontFamily={MEDIUM} size={14} style={styles.rowText}>
        {scoreboardData.actual_score[index]?.runs || '-'}
      </Typography>
      <Typography fontFamily={MEDIUM} size={14} style={styles.rowText}>
        {scoreboardData.actual_score[index]?.points || '-'}
      </Typography>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title={'Scoreboard'} walletIcon onWalletPress={()=>{
        navigation.navigate('ContestDetailsScreen')
      }}/>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Typography style={styles.statLabel}>Accuracy</Typography>
          <Typography style={styles.statValue}>{scoreboardData.accuracy_percentage}%</Typography>
        </View>
        <View style={styles.statItem}>
          <Typography style={styles.statLabel}>Exact Matches</Typography>
          <Typography style={styles.statValue}>{scoreboardData.total_exact_matches}</Typography>
        </View>
      </View>

      <View style={styles.tableContainer}>
        {renderHeader()}
        <FlatList
          data={allPredictions}
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: WHITE,
    margin: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: MEDIUM,
    fontSize: 12,
    color: GREY,
    marginBottom: 4,
  },
  statValue: {
    fontFamily: BOLD,
    fontSize: 18,
    color: BLACK,
  },
  tableContainer: {
    margin: 10,
    backgroundColor: WHITE,
    borderRadius: 5,
    overflow: 'hidden',
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