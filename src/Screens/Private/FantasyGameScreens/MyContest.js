import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    Animated,
    FlatList,
    Pressable,
    ImageBackground,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Icon from '../../../Components/Icon';
import { BACK, COPY, DOWN_ARROW, EDIT, GRASS, POOL, PRIVACY, PRIZE, SHARE } from '../../../Components/ImageAsstes';
import HeaderComponent from '../../../Components/HeaderComponent';
import { BLACK, DARK_RED, GREY, LIGHT_GREEN, LIGHT_GREY, LIGHT_PURPLE, WHITE } from '../../../Components/Colors';
import CommonButton from '../../../Components/CommonButton';
import LinearGradient from 'react-native-linear-gradient';
import { BOLD, MEDIUM, SEMI_BOLD } from '../../../Components/AppFonts';
import Typography, { FULL_WIDTH } from '../../../Components/Typography';

const initialLayout = { width: Dimensions.get('window').width };

const ContestRoute = () => (
    <FlatList
    data={[1,2,3]}
    renderItem={()=>{
        return(
            <View style={{width:FULL_WIDTH-45, alignSelf:'center',marginVertical:10}}>
            {/* <Typography style={styles.sectionTitle}>Head To Head</Typography> */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Typography fontFamily={SEMI_BOLD} size={14}>PRIZE POOL</Typography>
                    <Typography fontFamily={SEMI_BOLD} size={14}>Multiple Entries</Typography>
                </View>
                <Typography size={12} color={GREY}>₹100 | 40.00% Winners | 1st ₹50</Typography>
                <Typography fontFamily={MEDIUM} size={14} >5 spots</Typography>
                <View style={styles.progressBar}>
                    <View style={styles.progressFill} />
                </View>
                <Typography fontFamily={MEDIUM} size={14}>0 spots left</Typography>
    
                <View style={styles.cardFooter}>
                    <View style={styles.cardStat}>
                        <Icon source={PRIVACY} size={16} color="gold" />
                        <Typography style={{left:3}}>₹50</Typography>
                    </View>
                    <View style={styles.cardStat}>
                        <Icon source={PRIZE} size={16} color="gold" />
                        <Typography  style={{left:3}}>40%</Typography>
                    </View>
                    <View style={styles.cardStat}>
                        <Icon source={POOL} size={16} color="gold" />
                        <Typography  style={{left:3}}>Upto 4</Typography>
                    </View>
                </View>
            </View>
        </View>
        )
    }}
    />
);

const MyContestRoute = () => (
    <FlatList
    data={[1,2,3]}
    renderItem={()=>{
        return(
            <View style={{width:FULL_WIDTH-45, alignSelf:'center',marginVertical:10}}>
            {/* <Typography style={styles.sectionTitle}>Head To Head</Typography> */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Typography fontFamily={SEMI_BOLD} size={12}>PRIZE POOL</Typography>
                    <Typography fontFamily={SEMI_BOLD} size={12}>Multiple Entries</Typography>
                </View>
                <Typography size={10} color={GREY}>₹100 | 40.00% Winners | 1st ₹50</Typography>
                <Typography fontFamily={MEDIUM} size={12}>5 spots</Typography>
                <View style={styles.progressBar}>
                    <View style={styles.progressFill} />
                </View>
                <Typography fontFamily={MEDIUM} size={12}>0 spots left</Typography>
    
              
      <View style={{width:'100%',flexDirection:"row",justifyContent:'space-between'}}>

  <Typography fontFamily={SEMI_BOLD} size={13}>Joined with 1 team.</Typography>
  <Icon source={DOWN_ARROW} size={12}/>

      </View>
      <View style={{ alignItems:'center',justifyContent:"center",borderRadius:5, width:30,backgroundColor:LIGHT_GREEN,paddingVertical:2}}>
        <Typography color={WHITE} fontFamily={SEMI_BOLD} >T1</Typography>
      </View>

            </View>
        </View>
        )
    }}
    />
);

const MyTeamRoute = () => (
    <Pressable
    style={[
      styles.Grasscard,
    //   isFromSelect &&
    //   isTeamSelected && {
    //     borderColor: colors.borderBlue,
    //     borderWidth: 3,
    //   },
    ]}
    onPress={() => {}}>
    <ImageBackground resizeMode='cover' style={styles.topContainer} source={GRASS}>
      <View style={{width:'100%',padding:10,backgroundColor:'#FFFFFF30',flexDirection:"row",
        justifyContent:'space-between',alignItems:"center",paddingHorizontal:15}}>
  <Typography color={WHITE} fontFamily={MEDIUM} size={12}>Enime (T1)</Typography>
<View style={{flexDirection:"row",gap:10}}>
    <Icon source={EDIT} size={15} tintColor={WHITE}/>
    <Icon source={COPY} size={15} tintColor={WHITE}/>
    <Icon source={SHARE} size={15} tintColor={WHITE}/>


</View>

      </View>
    </ImageBackground>
  
  </Pressable>
);

const renderScene = SceneMap({
    contest: ContestRoute,
    mycontest: MyContestRoute,
    myteam: MyTeamRoute,
});

const MyContest = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'contest', title: 'Contest' },
        { key: 'mycontest', title: 'My Contest' },
        { key: 'myteam', title: 'My Team' },
    ]);

    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <HeaderComponent title={'My Contest'} />
            <LinearGradient colors={[DARK_RED, LIGHT_GREY]} style={{
                width: FULL_WIDTH - 50, alignSelf: 'center', padding: 10, flexDirection: "row",
                justifyContent: "space-between", alignItems: 'center', borderRadius: 5
            }}>

                <Icon source={PRIVACY} size={30} />
                <View>
                    <Typography fontFamily={MEDIUM} size={14} color={WHITE}>1h : 52Min</Typography>
                </View>
                <Icon source={PRIVACY} size={30} />
            </LinearGradient>

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        indicatorStyle={{backgroundColor: DARK_RED}}
                        style={{ backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 }}
                        labelStyle={{ color: DARK_RED, fontFamily: MEDIUM }}
                        activeColor={DARK_RED}
                        inactiveColor={BLACK}
                    />
                )}
            />

            <TouchableOpacity style={styles.joinButton}>
                <Typography fontFamily={BOLD} size={16} color={WHITE}>
                    Create Team
                </Typography>
            </TouchableOpacity>
        </View>
    );
}

export default MyContest;

const styles = StyleSheet.create({
    topContainer: {
        alignSelf:"center",
        height: 162,
        borderRadius:10,
        width:'100%',

        
      },
    Grasscard: {
        height: 162,
        borderColor:LIGHT_GREY,
        marginTop:20,
        width:FULL_WIDTH-50,
        alignSelf:"center",
        opacity:0.9
        // borderWidth: 1
      },
    joinButton: {
        backgroundColor: DARK_RED,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
        borderRadius: 5,
    },
 
  
    sectionTitle: { color: BLACK, fontSize: 16, marginTop:15 , fontFamily:MEDIUM},
    card: {
        backgroundColor: WHITE,
        padding: 16,
        borderRadius: 10,
        marginTop: 10,
        elevation:1
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardLabel: { color: 'gray' },
    cardSmall: { color: 'white' },
    cardText: { color: 'white', marginVertical: 4 },
    progressBar: {
        height: 4,
        backgroundColor: '#555',
        borderRadius: 5,
        marginVertical: 6,
    },
    progressFill: {
        width: '100%',
        height: '100%',
        backgroundColor: DARK_RED,
        borderRadius: 5,
    },
   
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 12,
    },
    cardStat: { flexDirection: 'row', alignItems: 'center' },
    cardStatText: { color: 'white', marginLeft: 4 },
    button: {
        backgroundColor: '#FFD700',
        margin: 16,
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: { color: '#000', fontWeight: 'bold' },
    text: { color: 'white', alignSelf: 'center' },
 
});
