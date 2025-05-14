import { StyleSheet, View, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { BLACK, DARK_PURPLE, GREY, LINEAR_DARK_PURPLE, LINEAR_LIGHT_PURPLE, WHITE } from '../../Components/Colors'
import Typography, { FULL_WIDTH } from '../../Components/Typography'
import { MEDIUM, REGULAR, SEMI_BOLD, BOLD } from '../../Components/AppFonts'
import Icon from '../../Components/Icon'
import { ADD,  HISTORY, REWARDS,  WITHDRAW, CHECK } from '../../Components/ImageAsstes'
import HomeHeader from '../../Components/HomeHeader'
import LinearGradient from 'react-native-linear-gradient'

const getIconBgColor = (label) => {
  switch (label) {
    case 'Add Money': return '#EBF5FF'
    case 'Withdraw': return '#E8FFF3'
    case 'History': return '#EDE9FE'
    case 'Rewards': return '#FFF7ED'
    default: return '#EBF5FF'
  }
}

const getIconColor = (label) => {
  switch (label) {
    case 'Add Money': return '#3B82F6'
    case 'Withdraw': return '#10B981'
    case 'History': return '#8B5CF6'
    case 'Rewards': return '#F97316'
    default: return '#3B82F6'
  }
}

const getTransactionIcon = (type) => {
  switch (type) {
    case 'Game Winning': return ADD
    case 'Tournament Entry': return WITHDRAW
    case 'Added Money': return ADD
    default: return ADD
  }
}
const WalletScreen = () => {
  const recentTransactions = [
    {
      id: '1',
      type: 'Game Winning',
      amount: '2500',
      date: 'May 10, 2025',
      isPositive: true,
    },
    {
      id: '2',
      type: 'Tournament Entry',
      amount: '200',
      date: 'May 9, 2025',
      isPositive: false,
    },
    {
      id: '3',
      type: 'Added Money',
      amount: '21000',
      date: 'May 8, 2025',
      isPositive: true,
    },
  ]

  return (
    <View style={styles.container}>
      <HomeHeader />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient 
          colors={[LINEAR_LIGHT_PURPLE, LINEAR_DARK_PURPLE]} 
          style={styles.balanceCard}
        >
          <Typography color={WHITE} fontFamily={MEDIUM} size={16}>Total Balance</Typography>
          <Typography color={WHITE} fontFamily={BOLD} size={28} style={{marginVertical: 8}}>₹12,500.00</Typography>
          
          <View style={styles.balanceDetailsContainer}>
            <View style={styles.balanceDetailItem}>
              <Typography size={14} fontFamily={SEMI_BOLD} color={WHITE}>Winning Cash</Typography>
              <Typography size={14} fontFamily={MEDIUM} color={WHITE}>₹2,000</Typography>
            </View>
            <View style={styles.balanceDetailItem}>
              <Typography size={14} fontFamily={SEMI_BOLD} color={WHITE}>Winning Cash</Typography>
              <Typography size={14} fontFamily={MEDIUM} color={WHITE}>₹2,000</Typography>
            </View>
            <View style={styles.balanceDetailItem}>
              <Typography size={14} fontFamily={SEMI_BOLD} color={WHITE}>Bonus</Typography>
              <Typography size={14} fontFamily={MEDIUM} color={WHITE}>₹2,000</Typography>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <FlatList
            data={[
              { id: 0, img: ADD, text: "Add Money", color: "#EBF5FF", iconColor: '#3B82F6' },
              { id: 1, img: WITHDRAW, text: "Withdraw", color: '#E8FFF3', iconColor: "#10B981" },
              { id: 2, img: HISTORY, text: "History", color: '#EDE9FE', iconColor: '#8B5CF6' },
              { id: 3, img: REWARDS, text: "Rewards", color: '#FFF7ED', iconColor: '#F97316' },
            ]}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
                activeOpacity={0.9} 
                style={styles.quickActionButton}
                onPress={() => {}}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: item.color }]}>
                  <Icon source={item.img} size={24} tintColor={item.iconColor}/>
                </View>
                <Typography size={12} fontFamily={MEDIUM} style={styles.quickActionText}>
                  {item.text}
                </Typography>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* KYC Status Card */}
        <View style={styles.kycCard}>
          <Typography size={18} fontFamily={SEMI_BOLD}>KYC Status</Typography>
          <View style={styles.kycStatus}>
            <View style={styles.kycLeft}>
              <View style={styles.checkIconContainer}>
                <Icon source={CHECK} size={20} tintColor="#10B981" />
              </View>
              <View >
                <Typography size={16} fontFamily={SEMI_BOLD}>Documents Verified</Typography>
                <Typography size={14} color={GREY}>PAN & Aadhar Verified</Typography>
              </View>
            </View>
            <View style={styles.verifiedBadge}>
              <Typography size={14} fontFamily={MEDIUM} color="#10B981">Verified</Typography>
            </View>
          </View>
        </View>

        <View style={styles.transactionsContainer}>
          <Typography size={18} fontFamily={SEMI_BOLD}>Recent Transactions</Typography>
          
          {recentTransactions?.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View 
                  style={[
                    styles.transactionIcon, 
                    { backgroundColor: transaction.isPositive ? '#E8FFF3' : '#FEE2E2' }
                  ]}
                >
                  <Icon 
                    source={transaction.isPositive ? ADD : WITHDRAW} 
                    size={20} 
                    tintColor={transaction.isPositive ? '#10B981' : '#EF4444'}
                  />
                </View>
                <View>
                  <Typography fontFamily={SEMI_BOLD}>{transaction.type}</Typography>
                  <Typography size={12} color={GREY} fontFamily={REGULAR}>{transaction.date}</Typography>
                </View>
              </View>
              <Typography
                fontFamily={SEMI_BOLD}
                color={transaction.isPositive ? '#10B981' : '#EF4444'}
              >
                {transaction.isPositive ? '+' : '-'}₹{transaction.amount}
              </Typography>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default WalletScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  balanceCard: {
    width: FULL_WIDTH - 32,
    alignSelf: "center",
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  balanceDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  balanceDetailItem: {
    width: '31%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 8,
    padding: 12,
  },
  quickActionsContainer: {
    marginVertical: 24,
  },
  quickActionsList: {
    paddingHorizontal: 8,
  },
  quickActionButton: {
    alignItems: "center",
    marginHorizontal: 12,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  quickActionText: {
    marginTop: 8,
    color: BLACK,
  },
  kycCard: {
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  kycStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  kycLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIconContainer: {
    backgroundColor: '#E8FFF3',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  verifiedBadge: {
    backgroundColor: '#E8FFF3',
    paddingVertical: 6,
    borderRadius: 20,
    paddingHorizontal:15
  },

  transactionsContainer: {
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 4,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
}) 