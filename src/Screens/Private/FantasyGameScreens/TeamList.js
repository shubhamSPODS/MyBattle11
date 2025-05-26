import { FlatList, Image, ImageBackground, Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import HeaderComponent from '../../../Components/HeaderComponent'
import { BLACK, LIGHT_GREY, WHITE } from '../../../Components/Colors'
import { CHECK, CHECK_SQUARE, COPY, EDIT, GRASS, SHARE, UNCHECK_SQUARE, WICKET_KEEPER } from '../../../Components/ImageAsstes'
import Typography, { FULL_WIDTH } from '../../../Components/Typography'
import { MEDIUM } from '../../../Components/AppFonts'
import Icon from '../../../Components/Icon'

const TeamList = () => {
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (isSelectAll) {
      setSelectedTeams([]);
    } else {
      setSelectedTeams([0, 1, 2, 3, 4, 5]); // Assuming 6 teams as per data array
    }
    setIsSelectAll(!isSelectAll);
  };

  const handleTeamSelect = (index) => {
    if (selectedTeams.includes(index)) {
      setSelectedTeams(selectedTeams.filter(i => i !== index));
      setIsSelectAll(false);
    } else {
      const newSelected = [...selectedTeams, index];
      setSelectedTeams(newSelected);
      if (newSelected.length === 6) { // If all teams are selected
        setIsSelectAll(true);
      }
    }
  };

  return (
    <View style={{flex:1,backgroundColor:WHITE}}>

  <HeaderComponent 
    title={'My Teams'}
   
  />
   <Pressable onPress={handleSelectAll} style={styles.selectAllButton}>
    <Icon source={isSelectAll?CHECK_SQUARE:UNCHECK_SQUARE} size={18} style={{right:5}}/>
        <Typography color={BLACK} fontFamily={MEDIUM} size={14}>
          {isSelectAll ? 'Deselect All' : 'Select All'}
        </Typography>
      </Pressable>
  <FlatList
  showsVerticalScrollIndicator={false}
        data={[1, 2, 3, 4, 5, 6]}
        contentContainerStyle={{paddingBottom:30}}
        renderItem={({item, index}) => {
            return (
                <Pressable style={[styles.Grasscard,{marginTop:index===0?0: 20,}]} onPress={() => handleTeamSelect(index)}>
                    <ImageBackground resizeMode='cover' style={styles.topContainer} source={GRASS}>
                        <View style={{
                            width: '100%',
                            paddingVertical: 10,
                            backgroundColor: '#FFFFFF30',
                            flexDirection: "row",
                            justifyContent:'flex-end',
                        }}>
                            <View style={{ flexDirection: 'row',
                            right:20
                            }}>
                                <TouchableOpacity onPress={() => handleTeamSelect(index)}>
                                    <Icon 
                                        source={selectedTeams.includes(index) ? CHECK_SQUARE : UNCHECK_SQUARE} 
                                        tintColor={WHITE} 
                                        size={18}
                                    />
                                </TouchableOpacity>
                            </View>
                          
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: 20,
                            marginTop: 10
                        }}>
                            <View style={{ alignItems: "center" }}>
                                <Typography fontFamily={MEDIUM} color={WHITE} size={14}>7</Typography>
                                <Typography fontFamily={MEDIUM} color={WHITE} size={12}>USA</Typography>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 30 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={{
                                        backgroundColor: WHITE,
                                        paddingVertical: 2,
                                        paddingHorizontal: 6,
                                        borderRadius: 50,
                                        marginBottom: 4
                                    }}>
                                        <Typography size={10} color={BLACK}>C</Typography>
                                    </View>
                                    <Image source={WICKET_KEEPER} style={{ width: 35, height: 35 }} />
                                    <Typography color={WHITE} size={10}>S Mukka..</Typography>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={{
                                        backgroundColor: WHITE,
                                        paddingVertical: 2,
                                        paddingHorizontal: 6,
                                        borderRadius: 50,
                                        marginBottom: 4
                                    }}>
                                        <Typography size={10} color={BLACK}>VC</Typography>
                                    </View>
                                    <Image source={WICKET_KEEPER} style={{ width: 35, height: 35 }} />
                                    <Typography color={WHITE} size={10}>P Macchi</Typography>
                                </View>
                            </View>

                            {/* OMA Score */}
                            <View style={{ alignItems: "center" }}>
                                <Typography fontFamily={MEDIUM} color={WHITE} size={14}>4</Typography>
                                <Typography fontFamily={MEDIUM} color={WHITE} size={12}>OMA</Typography>
                            </View>
                        </View>

                        {/* Role Breakdown Row */}
                        <View style={{
                            width: FULL_WIDTH - 40,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            backgroundColor: '#FFFFFF30',
                            position: 'absolute',
                            bottom: 0, padding: 5
                        }}>
                            <Typography fontFamily={MEDIUM} color={WHITE} size={10}>WK (3)</Typography>
                            <Typography fontFamily={MEDIUM} color={WHITE} size={10}>BAT (3)</Typography>
                            <Typography fontFamily={MEDIUM} color={WHITE} size={10}>AR (3)</Typography>
                            <Typography fontFamily={MEDIUM} color={WHITE} size={10}>BOWL (2)</Typography>
                        </View>
                    </ImageBackground>
                </Pressable>
            )
        }}
    />
    </View>
  )
}

export default TeamList

const styles = StyleSheet.create({
    Grasscard: {
        height: 162,
        borderColor: LIGHT_GREY,
        
        width: FULL_WIDTH - 50,
        alignSelf: "center",
    },
    topContainer: {
        alignSelf: "center",
        height: 162,
        width: '100%',


    },
    selectAllButton: {
        padding: 10,
        backgroundColor: WHITE,
        borderRadius: 5,
        marginRight: 10,
        alignSelf:"flex-end",
        flexDirection:"row",
        alignItems:"center",
        marginRight:20
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: BLACK,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxSelected: {
        backgroundColor: BLACK,
    },
    checkboxInner: {
        width: '100%',
        height: '100%',
        backgroundColor: WHITE,
        borderRadius: 2,
    },
})