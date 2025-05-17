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
import Toast from 'react-native-simple-toast';
import Loader from '../../../Components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { setUserToken, updateUserProfile } from '../../../Redux/Slice';
const LudoTable = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.user);

    const walletBalance = Number(userData?.winning_amount || 0) + Number(userData?.cash_bonus || 0) + Number(userData?.totaldeposit || 0)
    const [visible, setVisible] = useState(false)
    const routeData = route?.params?.gameType;
    const [listData, setListData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);
    const [tabs, setTabs] = useState([
        { id: 0, name: 'All Tables' },
        { id: 1, name: '1v1 Game' },
        { id: 2, name: '4 Players' },
    ]);

    const updateProfile = async () => {
        try {
            const profileData = await GET_WITH_TOKEN('user/profile')
            if (profileData?.success === true) {
                dispatch(updateUserProfile(profileData?.data))
            }

        } catch (error) {
            console.log(error, '==error==');

        }
    }

    const onJoinTable = (item) => {
        if (walletBalance === 0) {
            Toast.show('Please add money on your wallet.', Toast.LONG);
            return;
        } else {
            navigation.navigate('LudoJoinTable', { playerDetails: item });

        }
    }
    const getTableData = useCallback(async () => {
        try {
            setVisible(true)
            const response = await GET_WITH_TOKEN('table');
            if (response?.success === true) {
                setVisible(false)
                const filterData = response?.data?.filter(item => item?.gameMode === routeData);
                setListData(filterData);
            } else {
                setVisible(false)
            }
        } catch (error) {
            setVisible(false)
            console.log('Fetch Error:', error);
        }
    }, [routeData]);


    useEffect(() => {
        updateProfile()
        getTableData();
    }, [getTableData]);

    useEffect(() => {
        let data = [...listData];
        if (selectedTab === 1) {
            data = data?.filter(item => item?.gameType === '2 Player');
        } else if (selectedTab === 2) {
            data = data?.filter(item => item?.gameType === '4 Player');
        }
        data.sort((a, b) => Number(a?.bet || 0) - Number(b?.bet || 0));
        setFilteredData(data);
    }, [selectedTab, listData]);

    return (
        <View style={styles.container}>
            <HeaderComponent title="Table" walletIcon={false} />
            <Loader visible={visible} />
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
                            <Typography size={12} color={selectedTab === item.id ? WHITE : BLACK}>{item.name}</Typography>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <FlatList
                data={filteredData} showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => item?._id || index.toString()}
                renderItem={({ item }) => (
                    <TableItem item={item} navigation={navigation} onJoinTable={onJoinTable} />
                )}
            />
        </View>
    );
};

const TableItem = React.memo(({ item, navigation, onJoinTable }) => {
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
                <Typography fontFamily={REGULAR} size={20} color={'#10B981'}>{item?.bet === 0 ? 'Free' : `₹${item?.bet}`}</Typography>
                <Typography fontFamily={REGULAR} size={20} color={'#10B981'}>{item?.totalBet === 0 ? 'Free' : `₹${item?.totalBet}`}</Typography>
            </View>

            <CustomButton
                title="Join Table"
                style={{ marginBottom: 15, left: 0 }}
                onPress={() => {
                    onJoinTable(item)
                }}
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
