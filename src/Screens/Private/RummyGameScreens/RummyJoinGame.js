import { StyleSheet, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { BLACK, DARK_PURPLE, GREY, WHITE } from '../../../Components/Colors'
import HeaderComponent from '../../../Components/HeaderComponent'
import Typography, { FULL_WIDTH } from '../../../Components/Typography'
import { MEDIUM, REGULAR, SEMI_BOLD } from '../../../Components/AppFonts'
import CustomButton from '../../../Components/CustomButton'
import Icon from '../../../Components/Icon'
import { PRIZE, PLAYERS, ENTRY_FEE, USER_IMG, POOL, FEE, CHECK } from '../../../Components/ImageAsstes'

const GameInfoItem = ({ icon, label, value }) => (
  <View style={styles.infoItem}>
    <View style={styles.infoLeft}>
      <Icon source={icon} size={24} tintColor={DARK_PURPLE} />
      <Typography size={16} fontFamily={MEDIUM} style={{marginLeft: 12}}>
        {label}
      </Typography>
    </View>
    <Typography size={16} fontFamily={SEMI_BOLD}>
      {value}
    </Typography>
  </View>
)

const PlayerItem = ({ name, imageSource }) => (
  <View style={styles.playerItem}>
    <Image source={imageSource || USER_IMG} style={styles.playerAvatar} />
    <Typography size={14} fontFamily={MEDIUM} style={{marginLeft: 12}}>
      {name}
    </Typography>
  </View>
)

const RuleItem = ({ text }) => (
  <View style={styles.ruleItem}>
    <Icon 
      source={CHECK} 
      size={20} 
      tintColor="#10B981" 
    />
    <Typography 
      size={14} 
      fontFamily={REGULAR} 
      color={GREY}
      style={{marginLeft: 8}}
    >
      {text}
    </Typography>
  </View>
)

const RummyJoinGame = () => {
  return (
    <View style={styles.container}>
      <HeaderComponent title="Join Game" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <GameInfoItem icon={PRIZE} label="Prize Pool" value="₹2,500" />
          <GameInfoItem icon={POOL} label="Players" value="4/6" />
          <GameInfoItem icon={FEE} label="Entry Fee" value="₹500" />
        </View>

        {/* Current Players Card */}
        <View style={styles.card}>
          <Typography size={16} fontFamily={SEMI_BOLD} style={{marginBottom: 16}}>
            Current Players
          </Typography>
          <PlayerItem name="Player 1" />
          <PlayerItem name="Player 2" />
          <PlayerItem name="Player 3" />
          <PlayerItem name="Player 4" />
        </View>

        <View style={styles.card}>
          <Typography size={16} fontFamily={SEMI_BOLD} style={{marginBottom: 16}}>
            Game Rules
          </Typography>
          <RuleItem text="6 players maximum per table" />
          <RuleItem text="15 minutes game duration" />
          <RuleItem text="Winner takes all prize pool" />
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <View style={styles.balanceContainer}>
          <Typography size={14} fontFamily={MEDIUM} color={GREY}>
            Balance Available
          </Typography>
          <Typography size={16} fontFamily={SEMI_BOLD} color="#10B981">
            ₹2,000
          </Typography>
        </View>
        <CustomButton 
          title="Join Game - ₹500"
          style={styles.joinButton}
        />
      </View>
    </View>
  )
}

export default RummyJoinGame

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
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
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  playerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bottomSection: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: WHITE,
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  joinButton: {
    backgroundColor: DARK_PURPLE,
    width: '100%',
    bottom:10
  },
}) 