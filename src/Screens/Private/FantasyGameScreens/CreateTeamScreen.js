import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Icon from '../../../Components/Icon';
import { ADD, MORE_ADD, PRIVACY, Shapeparallelogram, STATIC_USER } from '../../../Components/ImageAsstes';
import HeaderComponent from '../../../Components/HeaderComponent';
import Typography, { FULL_WIDTH } from '../../../Components/Typography';
import { BOLD, MEDIUM, SEMI_BOLD } from '../../../Components/AppFonts';
import { BLACK, DARK_RED, GREY, LIGHT_GREEN, LIGHT_GREY, WHITE } from '../../../Components/Colors';
import { GET_WITH_TOKEN, POST_WITH_TOKEN } from '../../../Backend/Backend';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { selectContestData } from '../../../Redux/Slice';

const players = Array(8).fill({
  id: Math.random().toString(),
  name: 'V. Kohli',
  role: 'BAT',
  points: 450,
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
});

const CreateTeamScreen = ({ navigation }) => {
  const contestData = useSelector(selectContestData);
  
  const [playerData, setPlayerData] = React.useState([])
  const [selectedPlayers, setSelectedPlayers] = React.useState([])
  const [index, setIndex] = React.useState(0);
  const teamAListRef = React.useRef(null);
  const teamBListRef = React.useRef(null);
  const [routes] = React.useState([
    { key: 'squads', title: 'Squads(48)' },
    { key: 'wk', title: 'WK' },
    { key: 'bat', title: 'BAT' },
    { key: 'ar', title: 'AR' },
    { key: 'bowl', title: 'BOWL' },
  ]);
  const renderScene = SceneMap({
    squads: props => <PlayerList route={props.route} playersData={playerData} />,
    wk: props => <PlayerList route={props.route} playersData={playerData} />,
    bat: props => <PlayerList route={props.route} playersData={playerData} />,
    ar: props => <PlayerList route={props.route} playersData={playerData} />,
    bowl: props => <PlayerList route={props.route} playersData={playerData} />,
  });
  const getTeamPlayer = async () => {
    try {
      const response = await POST_WITH_TOKEN(`match/all-players/${contestData?.contestAllInfo?._id}`, {})
      console.log('API Response:', response);
      if (response?.success === true) {
        console.log('Setting player data:', response?.data);
        setPlayerData(response?.data)
      }

    } catch (error) {
      console.log(error, '===apierr');
    }
  }
  React.useEffect(() => {
    getTeamPlayer()
  }, [])

  const handlePlayerSelection = (player) => {
    const isSelected = selectedPlayers?.some(p => p?._id === player?._id);
    if (!!isSelected) {
      setSelectedPlayers(prev => prev?.filter(p => p?._id !== player?._id));
    } else {
      if (selectedPlayers.length < 11) {
        const teamCount = selectedPlayers?.filter(p => p?.team_label === player?.team_label)?.length;
        const otherTeamCount = selectedPlayers?.filter(p => p?.team_label !== player?.team_label)?.length;

        if (selectedPlayers?.length === 0) {
          setSelectedPlayers(prev => [...prev, player]);
          return;
        }

        if (teamCount >= 10 && otherTeamCount === 0) {
          Toast.show('You must select at least one player from each team', Toast.LONG);
          return;
        }

        if (selectedPlayers.length === 10 && otherTeamCount === 0) {
          Toast.show('You must select at least one player from each team');
          return;
        }

        setSelectedPlayers(prev => [...prev, player]);
      } else {
        Toast.show('Maximum 11 players allowed in team');
      }
    }
  };

  const renderPastLineupItem = ({ item, index }) => {
    const isSelected = selectedPlayers.some(p => p._id === item._id);

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          padding: 10,
          alignSelf: "flex-end",
          borderBottomWidth: 1,
          borderColor: LIGHT_GREY,
          backgroundColor: isSelected ? LIGHT_GREY : 'transparent'
        }}
        onPress={() => handlePlayerSelection(item)}
      >
        <View style={{ flexDirection: 'row', justifyContent: "space-between", width: '100%' }}>
          <View style={{ flexDirection: "row", width: '70%', }}>
            <Icon source={STATIC_USER} size={30} />

            <View>
              <Typography size={10} fontFamily={MEDIUM} style={{ marginLeft: 5, marginTop: 5 }}>{item?.short_name}</Typography>
              <Typography size={11} style={{ marginLeft: 5 }}>{item?.team_label || ''}</Typography>
            </View>
          </View>
          <View style={{ width: '30%', alignItems: 'flex-end', }}>
            <View style={{ backgroundColor: isSelected ? DARK_RED : DARK_RED, padding: 5, borderRadius: 30 }}>
              <Icon
                tintColor={WHITE}
                style={{ width: 10, height: 10, resizeMode: 'contain', }}
                source={ADD}
                resizeMode="contain"
              />
            </View>
            <Typography size={11} style={{ marginVertical: 5 }}>{(item?.average_point)?.toFixed(2)}</Typography>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const PlayerList = ({ route, playersData }) => {
    const teamAPlayers = playersData[0]?.players || [];
    const teamBPlayers = playersData[1]?.players || [];

    const getFilteredPlayers = () => {
      const allPlayers = [...teamAPlayers, ...teamBPlayers];
      switch (route?.key) {
        case 'wk':
          return allPlayers.filter(player => player?.playing_role === 'wk');
        case 'bat':
          return allPlayers.filter(player => player?.playing_role === 'bat');
        case 'ar':
          return allPlayers.filter(player => player?.playing_role === 'all');
        case 'bowl':
          return allPlayers.filter(player => player?.playing_role === 'bowl');
        default:
          return [];
      }
    };

    const filteredPlayers = getFilteredPlayers();

    return (
      <FlatList
        data={route?.key === "squads" ? [1] : filteredPlayers}
        keyExtractor={(item, i) => item?._id?.toString() || i?.toString()}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        renderItem={({ item }) => {
          return (
            <>
              {route?.key === "squads" ?
                <View style={{ width: '100%', flexDirection: "row", }}>
                  <View style={{ width: "50%", }}>
                    <FlatList
                      ref={teamAListRef}
                      scrollEnabled={false}
                      data={teamAPlayers}
                      keyExtractor={(item) => item?._id?.toString()}
                      renderItem={renderPastLineupItem}
                      showsVerticalScrollIndicator={false}
                      extraData={selectedPlayers}
                    />
                  </View>
                  <View style={{ width: "50%", borderLeftWidth: 1, borderColor: LIGHT_GREY }}>
                    <FlatList
                      ref={teamBListRef}
                      scrollEnabled={false}
                      data={teamBPlayers}
                      keyExtractor={(item) => item?._id?.toString()}
                      renderItem={renderPastLineupItem}
                      showsVerticalScrollIndicator={false}
                    />
                  </View>
                </View>
                :
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={{
                    padding: 10,
                    alignSelf: "flex-end",
                    borderBottomWidth: 1,
                    borderColor: LIGHT_GREY,
                    backgroundColor: selectedPlayers.some(p => p._id === item._id) ? LIGHT_GREY : 'transparent'
                  }}
                  onPress={() => handlePlayerSelection(item)}
                >
                  <View style={{ flexDirection: 'row', justifyContent: "space-between", width: '100%' }}>
                    <View style={{ flexDirection: "row", width: '70%', }}>
                      <Icon source={STATIC_USER} size={30} />
                      <View>
                        <Typography size={10} fontFamily={MEDIUM} style={{ marginLeft: 5, marginTop: 5 }}>{item?.short_name}</Typography>
                        <Typography size={11} style={{ marginLeft: 5 }}>{item?.team_label}</Typography>
                      </View>
                    </View>
                    <View style={{ width: '30%', alignItems: 'flex-end', }}>
                      <View style={{ backgroundColor: selectedPlayers.some(p => p._id === item._id) ? DARK_RED : DARK_RED, padding: 5, borderRadius: 30 }}>
                        <Icon
                          tintColor={WHITE}
                          style={{ width: 10, height: 10, resizeMode: 'contain', }}
                          source={ADD}
                          resizeMode="contain"
                        />
                      </View>
                      <Typography size={11} style={{ marginVertical: 5 }}>{(item?.average_point)?.toFixed(2)}</Typography>
                    </View>
                  </View>
                </TouchableOpacity>
              }
            </>
          )
        }}
      />
    );
  }

  const renderSelectionCount = () => (
    <View style={{ flexDirection: "row", width: FULL_WIDTH - 50, alignSelf: "center", justifyContent: "space-between", paddingHorizontal: 10, marginTop: 10 }}>
      <View style={{ justifyContent: 'center', }}>
        <Typography size={10}>Selection</Typography>
        <Typography size={10} fontFamily={SEMI_BOLD}>
          {selectedPlayers.length}/11
        </Typography>
      </View>

      <Typography
        style={{
          textAlign: 'center',
          marginBottom: 5,
        }}
        size={10}
        fontFamily={MEDIUM}>
        Max 7 player from a team
      </Typography>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
        <Typography size={10} fontFamily={MEDIUM}>
          Credit
        </Typography>
        <Typography size={10} fontFamily={BOLD}>
          {selectedPlayers?.reduce((sum, player) => sum + (player.points || 0), 0)}
        </Typography>
      </View>
    </View>
  );

  const onSelectCaptain = () => {
    if (selectedPlayers?.length < 11) {
      Toast.show('Please Select 11 Players');
      return;
    }
    
    navigation.navigate('SelectCaptain', { selectedPlayers: selectedPlayers,
     
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderComponent title={'Create Team'} />

      <LinearGradient colors={[DARK_RED, LIGHT_GREY]} style={{
        width: FULL_WIDTH - 50, alignSelf: 'center', padding: 10, flexDirection: "row",
        justifyContent: "space-between", alignItems: 'center', borderRadius: 5
      }}>

        <Icon source={{ uri: contestData?.contestAllInfo?.TeamAlogo }} size={30} />
        <View>
          <Typography fontFamily={MEDIUM} size={14} color={WHITE}>1h : 52Min</Typography>
        </View>
        <Icon source={{ uri: contestData?.contestAllInfo?.TeamBlogo }} size={30} />
      </LinearGradient>

      {renderSelectionCount()}

      <View style={{ flexDirection: "row", padding: 5, width: FULL_WIDTH - 60, alignSelf: "center", justifyContent: "flex-start" }}>
        {new Array(11).fill('').map((item, index) => (
          <Icon
            key={index}
            tintColor={index < selectedPlayers.length ? LIGHT_GREEN : LIGHT_GREY}
            source={Shapeparallelogram}
            size={30}
          />
        ))}
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            scrollEnabled
            indicatorStyle={{ backgroundColor: DARK_RED, height: 2 }}
            style={{ backgroundColor: '#fff' }}
            activeColor={DARK_RED}
            inactiveColor="#888"
            labelStyle={{ fontWeight: BOLD }}
            tabStyle={{ width: 'auto', minWidth: 80 }}
          />
        )}
        style={{ flex: 1 }}
      />

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.previewBtn}>
          <Text style={styles.btnText}>Preview</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.selectBtn} onPress={() => {
          onSelectCaptain()
        }}>
          <Text style={[styles.btnText, { color: '#fff' }]}>Select C & VC</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#f00', marginLeft: 12 },
  matchCard: {
    backgroundColor: '#fafafa', width: FULL_WIDTH - 50, alignSelf: "center", borderRadius: 12, padding: 16, elevation: 2,
    marginBottom: 10
  },
  timer: { alignSelf: 'center', fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  tournament: { alignSelf: 'center', color: '#888', marginBottom: 8 },
  teamsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  teamBlock: { alignItems: 'center', },
  flag: { width: 32, height: 20, marginBottom: 4 },
  score: { fontSize: 16, color: '#222' },
  overs: { fontSize: 12, color: '#888' },
  vs: { fontSize: 18, fontWeight: 'bold', color: '#888' },
  liveRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, alignSelf: 'center' },
  liveDot: { color: 'red', fontSize: 18, marginRight: 4, },
  liveText: { color: 'red', fontWeight: 'bold' },
  playerCard: {
    flexDirection: 'row', backgroundColor: '#fff', borderRadius: 8,
    padding: 12, marginBottom: 10, elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2,
  },

  addBtn: {
    backgroundColor: DARK_RED,
    borderRadius: 20,
    padding: 8,
    marginLeft: 8,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  bottomBar: {
    position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection: 'row',
    justifyContent: 'space-between', padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#eee',
  },
  previewBtn: { flex: 1, borderWidth: 1, borderColor: DARK_RED, borderRadius: 8, marginRight: 8, alignItems: 'center', padding: 12 },
  selectBtn: { flex: 1, backgroundColor: DARK_RED, borderRadius: 8, marginLeft: 8, alignItems: 'center', padding: 12 },
  btnText: { color: DARK_RED, fontWeight: 'bold', fontSize: 16 },
});

export default CreateTeamScreen