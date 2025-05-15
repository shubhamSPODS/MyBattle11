import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { BACK, NEXT, USER_IMG } from '../../Components/ImageAsstes';
import HeaderComponent from '../../Components/HeaderComponent';
import Typography from '../../Components/Typography';
import { BLACK, DARK_PURPLE, GREY, LIGHT_GREY, WHITE } from '../../Components/Colors';
import { BOLD, MEDIUM, SEMI_BOLD } from '../../Components/AppFonts';
import Icon from '../../Components/Icon';

const Profile = ({navigation}) => {
  const userProfile = {
    name: 'Alex Thompson',
    id: 'GT7845962',
    avatar: USER_IMG,
    wallet: {
      deposit: 2500,
      winnings: 4750,
    },
    stats: {
      games: 47,
      won: 31,
      winRate: 66,
    },
  };

  const MenuItem = ({ icon, title, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}
    >
      <View style={styles.menuContent}>
        {icon}
        <Typography style={styles.menuText}>{title}</Typography>
      </View>
      <Icon source={NEXT} size={10} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title={'Profile'} />
      <ScrollView>
        <View style={styles.profileSection}>
          <Image source={userProfile.avatar} style={styles.avatar} />
          <Typography style={styles.name}>{userProfile.name}</Typography>
          <Typography style={styles.userId}>ID: {userProfile.id}</Typography>
          <TouchableOpacity>
            <Typography style={styles.editButtonText}>Edit Profile</Typography>
          </TouchableOpacity>
        </View>

        <View style={styles.walletSection}>
          <View style={styles.walletHeader}>
            <Typography style={styles.sectionTitle}>Wallet Balance</Typography>
            <TouchableOpacity style={styles.addMoneyButton}>
              <Typography style={styles.addMoneyText}>Add Money</Typography>
            </TouchableOpacity>
          </View>
          <View style={styles.balanceContainer}>
            <View style={styles.balanceBox}>
              <Typography style={styles.balanceAmount}>₹{userProfile.wallet.deposit}</Typography>
              <Typography style={styles.balanceLabel}>Deposit</Typography>
            </View>
            <View style={styles.balanceBox}>
              <Typography style={styles.balanceAmount}>₹{userProfile.wallet.winnings}</Typography>
              <Typography style={styles.balanceLabel}>Winnings</Typography>
            </View>
          </View>
        </View>

        <View style={styles.statsSection}>
          <Typography style={styles.sectionTitle}>Gaming Stats</Typography>
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Typography style={styles.statNumber}>{userProfile.stats.games}</Typography>
              <Typography style={styles.statLabel}>Games</Typography>
            </View>
            <View style={styles.statBox}>
              <Typography style={styles.statNumber}>{userProfile.stats.won}</Typography>
              <Typography style={styles.statLabel}>Won</Typography>
            </View>
            <View style={styles.statBox}>
              <Typography style={styles.statNumber}>{userProfile.stats.winRate}%</Typography>
              <Typography style={styles.statLabel}>Win Rate</Typography>
            </View>
          </View>
        </View>

        <View style={styles.menuSection}>
          <MenuItem title="Account Details" />
          <MenuItem title="Transaction History" />
          <MenuItem title="Privacy & Security" />
          <MenuItem title="Help & Support" />
          <MenuItem title="Setting" onPress={()=>{
            navigation.navigate('Setting')
          }}/>
        </View>


      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  profileSection: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    marginBottom: 4,
    fontFamily: MEDIUM
  },
  userId: {
    fontSize: 14,
    marginBottom: 8,
    color: GREY
  },

  editButtonText: {
    color: GREY
  },
  walletSection: {
    padding: 16,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: SEMI_BOLD,
    color: DARK_PURPLE
  },
  addMoneyButton: {
    backgroundColor: '#6B21A8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  addMoneyText: {
    color: WHITE,
    fontFamily: MEDIUM
  },
  balanceContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  balanceBox: {
    flex: 1,
    backgroundColor: LIGHT_GREY,
    padding: 16,
    borderRadius: 8,
  },
  balanceAmount: {
    fontSize: 18,
    marginBottom: 4,
    fontFamily: MEDIUM
  },
  balanceLabel: {
    color: GREY,
  },
  statsSection: {
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 10
  },
  statBox: {
    flex: 1,
    backgroundColor: LIGHT_GREY,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    marginBottom: 4,
    fontFamily: MEDIUM
  },
  statLabel: {
    color: GREY,
    fontFamily: MEDIUM
  },
  menuSection: {
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: MEDIUM
  },


  activeNavText: {
    color: '#6B21A8',
  },
});

export default Profile; 