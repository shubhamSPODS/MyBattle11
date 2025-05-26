import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    SectionList,
    FlatList,
    ScrollView,
    Image,
} from 'react-native';
import { BLACK, WHITE, DARK_RED, LIGHT_GREEN } from '../../../Components/Colors';
import { BACK, GROUND_GREEN, WICKET_KEEPER } from '../../../Components/ImageAsstes';
import Typography, { FULL_HEIGHT, FULL_WIDTH } from '../../../Components/Typography';
import Icon from '../../../Components/Icon';
import { BOLD, MEDIUM } from '../../../Components/AppFonts';

const TeamPreview = ({ navigation, route }) => {
    const { selectedPlayers, captain, viceCaptain } = route?.params;
    const handleBack = () => {
        navigation.goBack();
    };
    const _RenderData = (({ item, index }) => {
        const isCaptain = captain?._id === item._id;
        const isViceCaptain = viceCaptain?._id === item._id;

        return (
            <View style={styles.playerContainer}>
                <View style={styles.playerImageContainer}>
                    <Icon source={WICKET_KEEPER} size={30} />
                    {isCaptain && (
                        <View style={[styles.roleTag, styles.captainTag]}>
                            <Typography size={10} color={WHITE} fontFamily={BOLD}>C</Typography>
                        </View>
                    )}
                    {isViceCaptain && (
                        <View style={[styles.roleTag, styles.vcTag]}>
                            <Typography size={10} color={WHITE} fontFamily={BOLD}>VC</Typography>
                        </View>
                    )}
                </View>
                <Typography size={10} color={WHITE} fontFamily={BOLD} style={{ marginTop: 10 }}>{item?.short_name}</Typography>
            </View>
        )
    });
    const TeamSection = ({ title, data }) => (
        <View style={styles.sectionContainer}>
            <View style={styles.categoryTitleContainer}>
                <Typography textAlign={'center'} size={12} color={BLACK} fontFamily={BOLD}>{title}</Typography>
            </View>
            <FlatList
                numColumns={3}
                data={data}
                contentContainerStyle={styles.flatListContainer}
                renderItem={_RenderData}
            />
        </View>
    );

    const categorizePlayers = (players) => {
        const categories = {
            'Wicket Keeper': [],
            'Batsmen': [],
            'All Rounder': [],
            'Bowler': []
        };

        players?.forEach(player => {
            const role = player?.playing_role?.toLowerCase();
            if (role === 'wk') {
                categories['Wicket Keeper'].push(player);
            } else if (role === 'bat') {
                categories['Batsmen'].push(player);
            } else if (role === 'all') {
                categories['All Rounder'].push(player);
            } else if (role === 'bowl') {
                categories['Bowler'].push(player);
            }
        });

        return Object.entries(categories).map(([title, data]) => ({
            title,
            data
        }));
    };
    const teamSections = categorizePlayers(selectedPlayers);
    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <ImageBackground
                source={GROUND_GREEN}
                resizeMode='stretch'
                style={{ height: FULL_HEIGHT, width: FULL_WIDTH, position: 'absolute' }}
            >
                <ScrollView>
                    <TouchableOpacity onPress={handleBack}>
                        <Icon size={40} style={{ marginTop: 35, marginLeft: 10 }} source={BACK} />
                    </TouchableOpacity>
                    {!!selectedPlayers?.length == 0 ? <View style={{
                        width: FULL_WIDTH / 2.5, padding: 10, backgroundColor: 'rgba(0,0,0,0.5)',
                        alignSelf: "center", marginTop: FULL_HEIGHT / 2.5, borderRadius: 5, alignItems: 'center',
                         justifyContent: 'center',
                        
                    }}>
                        <Typography color={WHITE} size={10}>No players selected yet.</Typography>
                        <TouchableOpacity onPress={() => { navigation.navigate('CreateTeamScreen') }} style={{
                            backgroundColor: WHITE, flex: 1, alignItems: "center", justifyContent: 'center',
                            borderRadius: 2, paddingHorizontal: 10, paddingVertical: 5, marginTop: 10
                        }}>
                            <Typography size={10}>START SELECTING</Typography>
                        </TouchableOpacity>

                    </View> : <>
                        {teamSections?.map((section, index) => (
                            <TeamSection
                                key={index}
                                title={section?.title}
                                data={section?.data}
                            />
                        ))}

                    </>}
                </ScrollView>
            </ImageBackground>
        </View>
    );
};

export default TeamPreview;

const styles = StyleSheet.create({
    sectionContainer: {
        width: FULL_WIDTH - 50,
        alignSelf: "center",
        justifyContent: 'center',
        padding: 5,
        marginTop:25
    },
    categoryTitleContainer: {
        backgroundColor: WHITE,
        width: '35%',
        alignSelf: "center",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: "center",
        marginVertical: 10
    },
    flatListContainer: {
        width: FULL_WIDTH - 50,
        justifyContent: "center",
        alignItems: "center"
    },
    playerContainer: {
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 5,

    },
   
 
    playerImageContainer: {
        position: 'relative',
    },
    roleTag: {
        position: 'absolute',
        top: -5,
        right: -5,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: WHITE,
    },
    captainTag: {
        backgroundColor: DARK_RED,
    },
    vcTag: {
        backgroundColor: LIGHT_GREEN,
    },
});
