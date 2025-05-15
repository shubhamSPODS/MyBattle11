import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { IMAGE_THEME_BG, LOGO } from '../../Components/ImageAsstes';
import ImageContainer from '../../Components/ImageContainer';
import Typography, { FULL_WIDTH } from '../../Components/Typography';
import { MEDIUM, SEMI_BOLD } from '../../Components/AppFonts';
import { DARK_PURPLE, GREY, LIGHT_GREY } from '../../Components/Colors';
import CustomTextInput from '../../Components/CustomTextInput';
import CommonButton from '../../Components/CommonButton';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import { POST, validateMobile } from '../../Backend/Backend';
import Icon from '../../Components/Icon';
import Checkbox from '../../Components/CheckBox';

const Login = () => {
  const [showReferral, setShowReferral] = useState(false);
  const [isSelectedTerms, setIsSelectedTerms] = useState(false);
  const [isSelectedAge, setIsSelectedAge] = useState(false);
  const navigation = useNavigation();
  const [number, setNumber] = useState('')
  const [code, setCode] = useState('');
  const onLoginPress = async () => {
    try {
      if (!number) {
       Toast.show('Please enter Mobile Number');
      } else if (!validateMobile(number)) {
        Toast.show('Please provide a valid Mobile Number');
      } else if (!isSelectedAge) {
        Toast.show('Please confirm that you are 18+ years old.');
      } else if (!isSelectedTerms){
        Toast.show('Please accept the Terms of Service and Privacy Policy.');
      }
       else {
        let data = {
          refercode: code,
          mobile_number: number,
          resend: true,
        };
        const loginRes = await POST('send-otp', data);
        
        if (loginRes?.success===true) {
          Toast.show(loginRes?.message);
           navigation.navigate('Otp',{isPhoneNumber:number})
        }else{
          Toast.show(loginRes?.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageContainer continerStye={styles.imageContainer}>
        <Icon source={LOGO} size={180} style={styles.logo} />
        <View style={styles.formContainer}>
          <Typography fontFamily={SEMI_BOLD} size={18} style={styles.welcomeText}>
            Welcome Back
          </Typography>
          <Typography size={13} color={GREY} style={styles.subText}>
            Sign in to continue playing fantasy sports.
          </Typography>

          <View>
            <CustomTextInput
              value={number}
              isPhoneNumber
              label
              heading="Mobile number"
              placeholder="Enter mobile number"
              labelStyle={styles.label}
              containerStyle={styles.inputContainer}
              onChangeText={e => {
                setNumber(e)
              }}
            />

            {showReferral && (
              <CustomTextInput
                  value={code}
                label
                heading="Enter referral code (Optional)"
                placeholder="Enter referral code"
                labelStyle={styles.referralLabel}
                containerStyle={styles.inputContainer}
                onChangeText={e=>{
                  setCode(e)
                }}
              />
            )}

            <CommonButton
              title="Get OTP"
              style={styles.button}
              onPress={onLoginPress}
            />

            <Typography
              textAlign="right"
              size={14}
              style={styles.referralToggle}
              textDecorationLine="underline"
              color={DARK_PURPLE}
              fontFamily={SEMI_BOLD}
              onPress={() => setShowReferral(!showReferral)}
            >
              Have a referal code?
            </Typography>
            <TouchableOpacity onPress={() => setIsSelectedAge(!isSelectedAge)} style={styles.checkbox}>
              <Checkbox onPress={() => setIsSelectedAge(!isSelectedAge)} value={isSelectedAge} />
              <Typography size={13} fontFamily={MEDIUM} style={styles.checkboxText}>
                I confirm that I am 18+ years in age
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsSelectedTerms(!isSelectedTerms)} style={[styles.checkbox, styles.termsCheckbox]}>
              <Checkbox onPress={() => setIsSelectedTerms(!isSelectedTerms)} value={isSelectedTerms} />
              <Typography size={13} fontFamily={MEDIUM} style={styles.checkboxText}>
                I have read and agree to MyBattle 11{' '}
                <Typography size={13} fontFamily={MEDIUM} onPress={() => {
                }} style={styles.link}>Terms of Service</Typography>
                <Typography size={13} fontFamily={MEDIUM}> and </Typography>
                <Typography onPress={() => {
                }} size={13} fontFamily={MEDIUM} style={styles.link}>
                  Privacy Policy
                </Typography>
              </Typography>
            </TouchableOpacity>
            <View style={{ marginBottom: 20 }}></View>
          </View>
        </View>
      </ImageContainer>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  checkbox: {
    flexDirection: 'row',
    width: FULL_WIDTH - 80,
    alignSelf: "center",
    alignItems: 'center',
  },
  termsCheckbox: {
    marginTop: 10,
  },
  checkboxText: {
    flex: 1,
    marginLeft: 12,
    lineHeight: 18,
  },
  link: {
    textDecorationLine: 'underline',
    color: DARK_PURPLE,
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 50,
  },
  formContainer: {
    width: FULL_WIDTH - 30,
    padding: 10,
    backgroundColor: LIGHT_GREY,
    borderRadius: 15,
    minHeight: 250,
  },
  welcomeText: {
    marginLeft: 13,
    marginTop: 10,
  },
  subText: {
    marginLeft: 13,
  },
  label: {
    marginLeft: 15,
    marginTop: 15,
  },
  referralLabel: {
    marginLeft: 15,
    marginTop: 10,
  },
  inputContainer: {
    width: '90%',
  },
  button: {
    width: '90%',
    marginTop: 5,
  },
  referralToggle: {
    marginRight: 20,
    bottom: 5,
  },
});
