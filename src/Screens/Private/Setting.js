import React from 'react';
import { View, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComponent from '../../Components/HeaderComponent';
import Typography from '../../Components/Typography';
import { BLACK, DARK_PURPLE, GREY, WHITE } from '../../Components/Colors';
import { MEDIUM, REGULAR, SEMI_BOLD } from '../../Components/AppFonts';
import Icon from '../../Components/Icon';
import {BANK, LANGUAGE, THEME, NOTIFICATION, HELP, CONTACT, TERMS, PRIVACY, VERSION, PROFILE, CHANGE_PASSWORD, UPDATE } from '../../Components/ImageAsstes';
import { useDispatch } from 'react-redux';
import { logout, setUserToken, updateUserProfile } from '../../Redux/Slice';

const MenuItem = ({ icon, title, rightText, onPress, showSwitch, isEnabled, onToggle }) => (
  <TouchableOpacity 
    style={styles.menuItem} 
    onPress={onPress}
    disabled={showSwitch}
  >
    <View style={styles.leftContent}>
      <Icon source={icon} size={20} tintColor={DARK_PURPLE} />
      <Typography 
        style={styles.menuTitle} 
        fontFamily={REGULAR}
      >
        {title}
      </Typography>
    </View>
    <View style={styles.rightContent}>
      {rightText && (
        <Typography 
          style={styles.rightText}
          color={GREY}
          fontFamily={REGULAR}
        >
          {rightText}
        </Typography>
      )}
      {showSwitch ? (
        <Switch
          value={isEnabled}
          onValueChange={onToggle}
          trackColor={{ false: '#E5E7EB', true: DARK_PURPLE }}
          thumbColor={WHITE}
        />
      ) : (
        <Icon 
          source={require('../../assets/Images/next.png')} 
          size={12} 
          tintColor={BLACK}
        />
      )}
    </View>
  </TouchableOpacity>
);

const SectionTitle = ({ title }) => (
  <Typography 
    style={styles.sectionTitle}
    color={DARK_PURPLE}
    fontFamily={MEDIUM}
  >
    {title}
  </Typography>
);

const Setting = () => {
  const [notifications, setNotifications] = React.useState(true);
const dispatch = useDispatch()
  return (
    <View style={styles.container}>
      <HeaderComponent title="Settings" />
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <SectionTitle title="Profile" />
        <MenuItem 
          icon={PROFILE}
          title="Edit Profile"
          onPress={() => {}}
        />
        <MenuItem 
          icon={CHANGE_PASSWORD}
          title="Change Password"
          onPress={() => {}}
        />

        {/* Bank Details Section */}
        <SectionTitle title="Bank Details" />
        <MenuItem 
          icon={BANK}
          title="Verify Bank Account"
          onPress={() => {}}
        />
        <MenuItem 
          icon={UPDATE}
          title="Update Bank Info"
          onPress={() => {}}
        />

        {/* Preferences Section */}
        <SectionTitle title="Preferences" />
        <MenuItem 
          icon={LANGUAGE}
          title="Language"
          rightText="English"
          onPress={() => {}}
        />
      
        <MenuItem 
          icon={NOTIFICATION}
          title="Notifications"
          showSwitch={true}
          isEnabled={notifications}
          onToggle={setNotifications}
        />

        {/* Support Section */}
        <SectionTitle title="Support" />
        <MenuItem 
          icon={HELP}
          title="Help Center"
          onPress={() => {}}
        />
        <MenuItem 
          icon={CONTACT}
          title="Contact Us"
          onPress={() => {}}
        />

        {/* About Section */}
        <SectionTitle title="About" />
        <MenuItem 
          icon={TERMS}
          title="Terms & Conditions"
          onPress={() => {}}
        />
        <MenuItem 
          icon={PRIVACY}
          title="Privacy Policy"
          onPress={() => {}}
        />
        <MenuItem 
          icon={VERSION}
          title="App Version"
          rightText="v1.0.2"
        />
      </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={() => {
          dispatch(setUserToken(null));
        }}
      >
        <Typography 
          color={WHITE} 
          fontFamily={SEMI_BOLD}
        >
          Log Out
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    marginTop: 24,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTitle: {
    marginLeft: 12,
    fontSize: 16,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightText: {
    marginRight: 8,
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: DARK_PURPLE,
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default Setting;