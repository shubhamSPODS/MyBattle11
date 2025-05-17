import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { BLACK, DARK_PURPLE, GOLDEN, LIGHT_GREY, WHITE } from '../../../Components/Colors';
import HeaderComponent from '../../../Components/HeaderComponent';
import Typography, { FULL_WIDTH } from '../../../Components/Typography';
import Icon from '../../../Components/Icon';
import { PROFILE2, WATCH } from '../../../Components/ImageAsstes';
import { MEDIUM, REGULAR } from '../../../Components/AppFonts';
import CustomButton from '../../../Components/CustomButton';
import { GET_WITH_TOKEN } from '../../../Backend/Backend';

const LudoTable = ({ navigation, route }) => {
    const routeData = route?.params?.gameType;
    
    const [listData, setListData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);
    const [tabs,setTabs] = useState([
        { id: 0, name: 'All Tables' },
        { id: 1, name: '1v1 Game' },
        { id: 2, name: '4 Players' },
    ]);
    const getTableData = useCallback(async () => {
        try {
          const response = await GET_WITH_TOKEN('table');
          if (response?.success === true) {
            console.log('Full API response:', response?.data);
      
            const filterData = response?.data?.filter(item => item?.gameMode === routeData);
            // console.log('Filtered:', filterData);
      
            setListData(filterData);
          }
        } catch (error) {
          console.log('Fetch Error:', error);
        }
      }, [routeData]);
      

    useEffect(() => {
        getTableData();
    }, [getTableData]);

    useEffect(() => {
        let data = [...listData];
        if (selectedTab === 1) {
            data = data?.filter(item => item?.gameType === '2 Player');
        } else if (selectedTab === 2) {
            data = data?.filter(item => item?.gameType === '4 Player');
        } 
        setFilteredData(data);
    }, [selectedTab, listData]);

    return (
        <View style={styles.container}>
            <HeaderComponent title="Table" walletIcon={false} />

            <View style={styles.tabContainer}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={tabs}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.tab, selectedTab === item.id && styles.selectedTab]}
                            onPress={() => setSelectedTab(item?.id)}
                        >
                            <Typography size={12} color={selectedTab === item.id  ? WHITE : BLACK}>{item.name}</Typography>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <FlatList
                data={filteredData}showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => item?._id || index.toString()}
                renderItem={({ item }) => (
                    <TableItem item={item} navigation={navigation} />
                )}
            />
        </View>
    );
};

const TableItem = React.memo(({ item, navigation }) => {
    return (
        <View style={styles.tableCard}>
            <View style={styles.rowBetween}>
                <View style={styles.row}>
                    <Icon source={PROFILE2} size={20} />
                    <Typography fontFamily={MEDIUM} size={14}> {item?.gameType || ''}</Typography>
                </View>
                <View style={styles.row}>
                    <Icon source={WATCH} size={16} />
                    <Typography fontFamily={MEDIUM} size={14}> {item?.gameMode}</Typography>
                </View>
            </View>

            <View style={styles.rowBetweenMargin}>
                <Typography fontFamily={REGULAR} size={14}>Entry Fees</Typography>
                <Typography fontFamily={REGULAR} size={14}>Prize Pool</Typography>
            </View>

            <View style={styles.rowBetweenMargin}>
                <Typography fontFamily={REGULAR} size={20} color={'#10B981'}>₹{item?.bet || ''}</Typography>
                <Typography fontFamily={REGULAR} size={20} color={'#10B981'}>₹{item?.totalBet || ''}</Typography>
            </View>

            <CustomButton
                title="Join Table"
                style={{ marginBottom: 15, left: 0 }}
                onPress={() => navigation.navigate('LudoJoinTable')}
            />
        </View>
    );
});

export default LudoTable;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
    },
    tabContainer: {
        width: FULL_WIDTH - 40,
        marginVertical: 10,
        alignSelf: 'center',
    },
    tab: {
        backgroundColor: WHITE,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: LIGHT_GREY
    },
    selectedTab: {
        backgroundColor: GOLDEN,
    },
    tableCard: {
        width: FULL_WIDTH - 50,
        alignSelf: 'center',
        elevation: 1,
        marginVertical: 10,
        backgroundColor: WHITE,
        borderRadius: 5,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 10,
    },
    rowBetweenMargin: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
