import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import ImageContainer from '../../Components/ImageContainer';
import Icon from '../../Components/Icon';
import { BACK, LOGO } from '../../Components/ImageAsstes';
import { BLACK, DARK_RED, LIGHT_PURPLE, WHITE } from '../../Components/Colors';
import { useNavigation } from '@react-navigation/native';
import Typography, { FULL_WIDTH } from '../../Components/Typography';
import OTPTextView from 'react-native-otp-textinput';
import CommonButton, { CommonRedButton } from '../../Components/CommonButton';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { POST } from '../../Backend/Backend';
import { setUserToken, updateUserProfile, userToken } from '../../Redux/Slice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Otp = ({route}) => {
  const navigation = useNavigation();
  const otpRef = useRef(null);
  const dispatch = useDispatch();
  const [code,setCode] = useState('')
 
  const handleLogin = async() => {
    try {
      if (code?.length < 6) {
        Toast.show('Please provide a valid OTP');
      return
      }
      let data = {
        mobile_number: route?.params?.isPhoneNumber,
        otp: code,
      };
      const otpResponse = await POST('user/signup', data);
        console.log(otpResponse,'==response otp');
        
      if (otpResponse?.success===true) {
        await AsyncStorage.setItem('authToken', otpResponse?.data?.accessToken);
        dispatch(updateUserProfile(otpResponse?.data))
        dispatch(setUserToken(otpResponse?.data?.accessToken));
        Toast.show(otpResponse?.message);
        
        //  navigation.navigate('Otp',{isPhoneNumber:number})
      }else{
        Toast.show(otpResponse?.message);
      }
    } catch (error) {
      
    }
  };

  const resendOtp=async()=>{
    
    try {
      let data ={
        mobile_number: route?.params?.isPhoneNumber,
        resend: true,
      }
      const resendResponse =await POST('send-otp', data); 
      if (resendResponse?.message===true) {
        Toast.show(resendResponse?.message);
      }else{
        Toast.show(resendResponse?.message);
      }
    } catch (error) {
      console.log(error,'==errorotp>>');
       
    }
  }

  return (
    <View style={styles.container}>
      <ImageContainer>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon source={BACK} size={40} tintColor={WHITE} />
        </TouchableOpacity>

        <View style={styles.content}>
          <Icon source={LOGO} size={150} />
          <Typography color={LIGHT_PURPLE} size={22} style={styles.verifyText}>
            Verify your number
          </Typography>
          <Typography color={WHITE} size={14} textAlign="center" style={styles.instructionText}>
            {`We've sent a verification code to \n ${route?.params?.isPhoneNumber}`}
          </Typography>

          <View style={styles.otpContainer}>
            <OTPTextView
              ref={otpRef}
              inputCount={6}
              tintColor={LIGHT_PURPLE}
              autoFocus={false}
              textInputStyle={styles.otpInput}
              handleTextChange={(e) => {setCode(e)}}
            />
          </View>

          <Typography color={WHITE} style={styles.resendContainer}>
            Didn't receive code?
            <Typography color={DARK_RED} onPress={resendOtp}> Resend</Typography>
          </Typography>

          <CommonRedButton title="Verify" style={styles.verifyButton} onPress={handleLogin} />
        </View>
      </ImageContainer>
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    marginTop: 40,
    marginLeft: 10,
  },
  content: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  verifyText: {
    marginTop: 10,
  },
  instructionText: {
    marginTop: 5,
  },
  otpContainer: {
    marginVertical: 20,
    width: FULL_WIDTH - 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  otpInput: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    color: WHITE,
  },
  expireText: {
    marginTop: 5,
  },

  verifyButton: {
    marginTop: 30,
  },
});
