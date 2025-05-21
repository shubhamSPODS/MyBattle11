import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Icon from '../../../Components/Icon';
import { PRIVACY, STATIC_USER } from '../../../Components/ImageAsstes';
import HeaderComponent from '../../../Components/HeaderComponent';
import Typography, { FULL_WIDTH } from '../../../Components/Typography';
import { BOLD, MEDIUM, SEMI_BOLD } from '../../../Components/AppFonts';
import { BLACK, DARK_RED, GREY, WHITE } from '../../../Components/Colors';
import { GET_WITH_TOKEN, POST_WITH_TOKEN } from '../../../Backend/Backend';

const players = Array(8).fill({
  id: Math.random().toString(),
  name: 'V. Kohli',
  role: 'BAT',
  points: 450,
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
});

const renderPastLineupItem = (({ item, index }) => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={{
      padding: 10,
      alignSelf: "flex-end",
      borderBottomWidth: 0.6,
      borderColor: DARK_RED
    }}>
      <View style={{ flexDirection: 'row', justifyContent: "space-between", width: '100%' }}>
        <View style={{ flexDirection: "row", alignItems: 'center', width: '70%', }}>
          <Icon source={STATIC_USER} size={30} />

          <View>
            <Typography size={10} style={{ marginLeft: 5 }}>{item?.team?.abbr}</Typography>
            <Typography size={11} style={{ marginLeft: 5 }}>{'Name'}</Typography>
          </View>
        </View>
        <View style={{ width: '30%', alignItems: 'flex-end', marginTop: 5 }}>
          <Icon
            tintColor={GREY}
            style={{ width: 18, height: 18, resizeMode: 'contain', }}
            source={
              PRIVACY
            }
            resizeMode="contain"
          />
          <Typography size={11} style={{ marginVertical: 5 }}>0.00</Typography>
        </View>

      </View>
    </TouchableOpacity>
  )
})

const PlayerList = ({ route, playersData }) => {
  return (
    <FlatList
      data={playersData}
      keyExtractor={(_, i) => i.toString()}
      contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
      renderItem={({ item }) => (
        // console.log(item,'==item'),
        <>
          {route?.key === "squads" ?
            <View style={{ width: '100%', flexDirection: "row", }}>
              <View style={{ width: "50%", }}>
                <FlatList
                  scrollEnabled={false}
                  data={item?.players}
                  renderItem={renderPastLineupItem}
                  showsVerticalScrollIndicator={false}

                />
              </View>
              <View style={{ width: "50%", borderLeftWidth: 0.6, borderColor: DARK_RED }}>
                <FlatList
                  scrollEnabled={false}
                  data={item?.players}
                  renderItem={renderPastLineupItem}
                  showsVerticalScrollIndicator={false}

                />
              </View>
            </View>
            :
            <View style={styles.playerCard}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.playerName}>{item.name}</Text>
                <Text style={styles.playerRole}>{item.role}</Text>
                <Text style={styles.playerPoints}>PTS: {item.points}</Text>
              </View>
              <TouchableOpacity style={styles.addBtn}>
                <Icon source={PRIVACY} size={24} color="#fff" />
              </TouchableOpacity>
            </View>

          }
        </>


      )}
    />
  );
}

const CreateTeamScreen = ({ route }) => {
  const { matchObjectId } = route?.params
  const [playerData, setPlayerData] = React.useState([])
  const [index, setIndex] = React.useState(0);
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
      const response = await POST_WITH_TOKEN(`match/all-players/${matchObjectId}`, {})
      console.log('API Response:', response);
      if (response?.success===true) {
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderComponent title={'Create Team'} />
      <View style={styles.matchCard}>
        <Typography textAlign={'center'} fontFamily={SEMI_BOLD}>14m:17s</Typography>
        <Text style={styles.tournament}>ICC World Cup 2025</Text>
        <View style={styles.teamsRow}>
          <View style={styles.teamBlock}>
            <Icon source={PRIVACY} size={30} />
            <Typography fontFamily={MEDIUM}>India (260/6)</Typography>
            <Typography fontFamily={MEDIUM}>50.0 over</Typography>
          </View>
          <Text style={styles.vs}>vs</Text>
          <View style={styles.teamBlock}>
            <Icon source={PRIVACY} size={30} />
            <Typography fontFamily={MEDIUM}>India (260/6)</Typography>
            <Typography fontFamily={MEDIUM}>50.0 over</Typography>
          </View>
        </View>
        <View style={[styles.liveRow, { alignItems: "center" }]}>
          <Typography style={styles.liveDot}>●</Typography>
          <Typography color={DARK_RED}>LIVE</Typography>
        </View>
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
          <Text style={styles.btnText}>Team Preview</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.selectBtn}>
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
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8,
    padding: 12, marginBottom: 10, elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  playerName: { fontWeight: 'bold', fontSize: 16 },
  playerRole: { color: '#888', fontSize: 12, marginBottom: 2 },
  playerPoints: { color: '#222', fontSize: 12 },
  addBtn: { backgroundColor: '#f00', borderRadius: 16, padding: 6, marginLeft: 8 },
  bottomBar: {
    position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection: 'row',
    justifyContent: 'space-between', padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#eee',
  },
  previewBtn: { flex: 1, borderWidth: 1, borderColor: DARK_RED, borderRadius: 8, marginRight: 8, alignItems: 'center', padding: 12 },
  selectBtn: { flex: 1, backgroundColor: DARK_RED, borderRadius: 8, marginLeft: 8, alignItems: 'center', padding: 12 },
  btnText: { color: DARK_RED, fontWeight: 'bold', fontSize: 16 },
});

export default CreateTeamScreen