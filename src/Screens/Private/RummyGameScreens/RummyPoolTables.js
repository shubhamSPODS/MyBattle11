import { StyleSheet, View, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { BLACK, DARK_PURPLE, GREY, WHITE } from '../../../Components/Colors'
import HeaderComponent from '../../../Components/HeaderComponent'
import Typography, { FULL_WIDTH } from '../../../Components/Typography'
import { MEDIUM, REGULAR, SEMI_BOLD } from '../../../Components/AppFonts'
import Icon from '../../../Components/Icon'
import {  PRIZE,  USER_IMG } from '../../../Components/ImageAsstes'
import { useNavigation } from '@react-navigation/native'

const filters = [
  { id: '1', label: 'All Tables' },
  { id: '2', label: 'Pool 101' },
  { id: '3', label: 'Pool 201' },
  { id: '4', label: '2 Players' },
]

const tableData = [
  {
    id: '1',
    title: 'Pool 101',
    players: '6 Players',
    currentPlayers: '3/6 Players',
    prizePool: 'Prize Pool',
    joinAmount: '500'
  },
  {
    id: '2',
    title: 'Pool 201',
    players: '2 Players',
    currentPlayers: '1/2 Players',
    prizePool: 'Prize Pool',
    joinAmount: '1,000'
  },
  {
    id: '3',
    title: 'Pool 201',
    players: '2 Players',
    currentPlayers: '1/2 Players',
    prizePool: 'Prize Pool',
    joinAmount: '1,000'
  },
  {
    id: '4',
    title: 'Pool 201',
    players: '2 Players',
    currentPlayers: '1/2 Players',
    prizePool: 'Prize Pool',
    joinAmount: '1,000'
  }
]

const FilterTab = ({ label, isActive, onPress }) => (
  <TouchableOpacity 
    style={[
      styles.filterTab,
      isActive && styles.filterTabActive
    ]}
    onPress={onPress}
  >
    <Typography 
      size={14} 
      fontFamily={MEDIUM}
      color={isActive ? WHITE : DARK_PURPLE}
    >
      {label}
    </Typography>
  </TouchableOpacity>
)

const TableCard = ({ title, players, currentPlayers, prizePool, joinAmount,navigation }) => (
  <View style={styles.tableCard}>
    <View style={styles.tableHeader}>
      <View style={styles.titleContainer}>
        <Icon source={PRIZE} size={24} style={styles.titleIcon} />
        <View>
          <Typography size={16} fontFamily={SEMI_BOLD}>{title}</Typography>
          <Typography size={12} color={GREY} fontFamily={REGULAR}>{players}</Typography>
        </View>
      </View>
      <Typography size={12} color={GREY} fontFamily={REGULAR}>{prizePool}</Typography>
    </View>

    <View style={styles.tableFooter}>
      <View style={styles.playersInfo}>
        <Icon source={USER_IMG} size={32} />
        <Typography size={14} color={GREY} fontFamily={MEDIUM} style={{marginLeft: 8}}>
          {currentPlayers}
        </Typography>
      </View>
      <TouchableOpacity style={styles.joinButton} onPress={()=>{
        navigation.navigate('RummyJoinGame')
      }}>
        <Typography size={14} fontFamily={SEMI_BOLD} color={WHITE}>
          Join ₹{joinAmount}
        </Typography>
      </TouchableOpacity>
    </View>
  </View>
)


const RummyPoolTables = () => {
  const [activeFilter, setActiveFilter] = useState('1')
 const navigation = useNavigation()
  const renderTableCard = ({ item }) => (
    <TableCard 
      title={item.title}
      players={item.players}
      currentPlayers={item.currentPlayers}
      prizePool={item.prizePool}
      joinAmount={item.joinAmount}
      navigation={navigation}
    />
  )

  return (
    <View style={styles.container}>
      <HeaderComponent title="Pool Tables" />

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map(filter => (
          <FilterTab 
            key={filter.id}
            label={filter.label}
            isActive={activeFilter === filter.id}
            onPress={() => setActiveFilter(filter.id)}
          />
        ))}
      </ScrollView>

      <FlatList
        data={tableData}
        renderItem={renderTableCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.tablesContainer}
        showsVerticalScrollIndicator={false}
      />

 
    </View>
  )
}

export default RummyPoolTables

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  filtersContainer: {
    maxHeight: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filtersContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EDE9FE',
    marginRight: 8,
  },
  filterTabActive: {
    backgroundColor: DARK_PURPLE,
  },
  tablesContainer: {
    padding: 16,
  },
  tableCard: {
    backgroundColor: WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    marginRight: 12,
    tintColor: DARK_PURPLE,
  },
  tableFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playersInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinButton: {
    backgroundColor: DARK_PURPLE,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: WHITE,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  tabItem: {
    alignItems: 'center',
    paddingVertical: 4,
  },
}) 