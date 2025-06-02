import React from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import HeaderComponent from '../../../Components/HeaderComponent';
import Typography, { FULL_WIDTH } from '../../../Components/Typography';
import { MEDIUM, SEMI_BOLD } from '../../../Components/AppFonts';
import { DARK_RED, WHITE } from '../../../Components/Colors';
import { POST, POST_WITH_TOKEN } from '../../../Backend/Backend';
import { useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { selectContestData } from '../../../Redux/Slice';

const overs = Array.from({ length: 20 }, (_, i) => `Over ${i + 1}`);

const CreateScoreBoard = ({ navigation }) => {
  const [predictions, setPredictions] = React.useState(Array(20).fill(''));
  const inputRefs = React.useRef([]);
    const contestData = useSelector(selectContestData);
    const matchId = contestData?.contestAllInfo?._id;
    const contestId = contestData?.contestAllInfo?.contest_details?.data[0]?.contest_category_id

  const updatePrediction = (index, value) => {
    const newPredictions = [...predictions];
    newPredictions[index] = value;
    setPredictions(newPredictions);
  };

  const focusNextInput = (index) => {
    if (index < overs.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Typography style={styles.overText}>{item}</Typography>
      <TextInput
        ref={ref => inputRefs.current[index] = ref}
        style={styles.input}
        value={predictions[index]}
        onChangeText={(text) => {
          if (/^\d*$/.test(text)) {
            updatePrediction(index, text);
          }
        }}
        keyboardType="number-pad"
        maxLength={3}
        placeholder="Enter runs"
        placeholderTextColor="#999"
      />
    </View>
  );

  const handleSubmit = async () => {
    try {
      const hasEmptyPredictions = predictions?.some(prediction => prediction === '');
      if (hasEmptyPredictions) {
        Toast.show('Please predict scores for all 20 overs');
        return;
      }
      const predictionsData = predictions?.map((runs, idx) => ({
        over_number: idx + 1,
        runs: runs ? parseInt(runs, 10) : 0,
      }));
      let data = {
        predictions: predictionsData,
        match_id: matchId,
        contest_id:contestId,
      }
      console.log(data,'==data>>>>body');
      
      const response = await POST_WITH_TOKEN('match/createUserScoreCard', data)
      console.log(response, '==respomse==');
      if (response?.success ===true) {
        Toast.show(response?.message);
      }else{
        Toast.show(response?.message);
      }

    } catch (error) {
      console.error('Error submitting predictions:', error);
    }



  }
  // match/userScoreCard/669a680cf2a6f2c602a558d4
  return (
    <View style={styles.container}>
      <HeaderComponent title={'Create Scoreboard'} listIcon={true} listIconPress={() => {
        navigation.navigate('ScoreboardList')
      }} />
      <View style={styles.header}>
        <Typography style={styles.headerText}>Over</Typography>
        <Typography style={styles.headerText}>Prediction</Typography>
      </View>
      <FlatList
        data={overs}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
      <TouchableOpacity
        onPress={handleSubmit}
        activeOpacity={0.9}
        style={{
          width: FULL_WIDTH - 30, height: 45, position: 'absolute', bottom: 20,
          alignSelf: 'center', backgroundColor: DARK_RED, borderRadius: 5, alignItems: "center", justifyContent: "center"
        }}>
        <Typography color={WHITE} fontFamily={SEMI_BOLD}>Create</Typography>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: '#b30000',
    padding: 12,
    textAlign: 'center',
    borderRadius: 8,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#d32f2f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 4,
  },
  headerText: {
    color: WHITE,
    fontFamily: SEMI_BOLD
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    padding: 12,
    marginBottom: 4,
    borderRadius: 8,
  },
  overText: {
    fontSize: 16,
    flex: 1,
  },
  input: {
    width: 100, backgroundColor: '#fff',
    borderRadius: 8,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    height: 40,
  },
});

export default CreateScoreBoard;
