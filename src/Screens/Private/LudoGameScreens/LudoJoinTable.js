import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { BLACK, DARK_PURPLE, GOLDEN, GREY, WHITE } from '../../../Components/Colors'
import HeaderComponent from '../../../Components/HeaderComponent'
import Typography, { FULL_WIDTH } from '../../../Components/Typography'
import { MEDIUM, REGULAR, SEMI_BOLD } from '../../../Components/AppFonts'
import CustomButton from '../../../Components/CustomButton'
import Icon from '../../../Components/Icon'
import { PROFILE2, SAFE_SECURE, SECURE, SUPPORT, USER_IMG, WATCH } from '../../../Components/ImageAsstes'

const LudoJoinTable = () => {
  return (
    <View style={{flex:1, backgroundColor: WHITE}}>
      <HeaderComponent title={'Join Table'}/>
      
      <View style={styles.card}>
        <View style={styles.tableHeader}>
          <Typography size={16} fontFamily={SEMI_BOLD}>4-Player Ludo</Typography>
          <Typography style={styles.tableNumber}>Table #2458</Typography>
        </View>
        
        <View style={styles.tableInfo}>
          <View style={styles.infoColumn}>
            <Typography color={GREY} size={14} fontFamily={MEDIUM}>Entry Fee</Typography>
            <Typography size={16} fontFamily={SEMI_BOLD}>₹100</Typography>
          </View>
          <View style={styles.infoColumn}>
            <Typography color={GREY} size={14} fontFamily={MEDIUM}>Prize Pool</Typography>
            <Typography size={16} fontFamily={SEMI_BOLD}>₹360</Typography>
          </View>
          <View style={styles.infoColumn}>
            <Typography color={GREY} size={14} fontFamily={MEDIUM}>Players</Typography>
            <Typography size={16} fontFamily={SEMI_BOLD}>2/4</Typography>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Typography size={16} fontFamily={SEMI_BOLD} style={{marginBottom: 10}}>Current Players</Typography>
        
        <View style={styles.playerItem}>
          <Image source={USER_IMG} style={styles.playerAvatar} />
          <View>
            <Typography size={14} fontFamily={SEMI_BOLD}>Rahul S.</Typography>
            <Typography size={12} color={GREY} fontFamily={MEDIUM}>Joined 2 mins ago</Typography>
          </View>
        </View>

        <View style={styles.playerItem}>
          <Image source={USER_IMG} style={styles.playerAvatar} />
          <View>
            <Typography size={14} fontFamily={SEMI_BOLD}>Priya M.</Typography>
            <Typography size={12} color={GREY} fontFamily={MEDIUM}>Joined 5 mins ago</Typography>
          </View>
        </View>
      </View>

      {/* Wallet Balance */}
      <View style={styles.card}>
        <View style={styles.balanceRow}>
          <Typography size={14} fontFamily={MEDIUM}>Wallet Balance</Typography>
          <Typography size={14} fontFamily={SEMI_BOLD} color="#22C55E">₹500</Typography>
        </View>
        <View style={styles.balanceRow}>
          <Typography size={14} fontFamily={MEDIUM}>Entry Fee</Typography>
          <Typography size={14} fontFamily={SEMI_BOLD} color="#EF4444">-₹100</Typography>
        </View>
        <View style={[styles.balanceRow, styles.totalRow]}>
          <Typography size={14} fontFamily={MEDIUM}>Balance after join</Typography>
          <Typography size={14} fontFamily={SEMI_BOLD} color="#22C55E">₹400</Typography>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerInfo}>
          <Icon source={SECURE} size={20} />
          <Typography size={12} color={GREY} style={{marginLeft: 5}}>Safe & Secure</Typography>
        </View>
        <View style={styles.footerInfo}>
          <Icon source={WATCH} tintColor={DARK_PURPLE} size={20} />
          <Typography size={12} color={GREY} style={{marginLeft: 5}}>24/7 Support</Typography>
        </View>
      </View>

      <CustomButton 
        title="Join Table Now"
        style={styles.joinButton}
      />
    </View>
  )
}

export default LudoJoinTable

const styles = StyleSheet.create({
    card: {
        width: FULL_WIDTH - 32,
        alignSelf: 'center',
        backgroundColor: WHITE,
        elevation: 2,
        marginVertical: 8,
        borderRadius: 12,
        padding: 16,
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
        alignItems: 'center',
        marginBottom: 16,
    },
    tableNumber: {
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
        color: '#3B82F6',
        fontFamily: MEDIUM,
    },
    tableInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoColumn: {
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
        marginRight: 12,
    },
    balanceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingTop: 8,
        marginTop: 4,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 80,
        width: '100%',
    },
    footerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 12,
    },
    joinButton: {
        position: 'absolute',
        bottom: 16,
        backgroundColor: GOLDEN,
        width: FULL_WIDTH - 32,
    },
})