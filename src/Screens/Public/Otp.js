import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import ImageContainer from '../../Components/ImageContainer'
import Icon from '../../Components/Icon'
import { BACK, LOGO } from '../../Components/ImageAsstes'
import { BLACK, DARK_RED, LIGHT_PURPLE, WHITE } from '../../Components/Colors'
import { useNavigation } from '@react-navigation/native'
import Typography, { FULL_WIDTH } from '../../Components/Typography'
import OTPTextView from 'react-native-otp-textinput'
import CommonButton, { CommonRedButton } from '../../Components/CommonButton'
import { useDispatch } from 'react-redux'
import { login } from '../../Redux/Slice'

const Otp = () => {
  const navigation = useNavigation()
  const otpRef = useRef(null);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login({name: 'Shubham', lastname: 'Singh'}));
  };
  return (
    <View style={{ flex: 1 }}>
      <ImageContainer>

        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Icon
            source={BACK}
            size={40}
            tintColor={WHITE}
            style={{ marginTop: 40, marginLeft: 10 }}
          />
        </TouchableOpacity>


        <View style={{ flex: 1, marginTop: 20, alignItems: 'center' }}>
          <Icon
            source={LOGO}
            size={150}
          />
          <Typography color={LIGHT_PURPLE} size={22} style={{ marginTop: 10 }} >Verify your number</Typography>
          <Typography color={WHITE} size={14} textAlign={'center'}>{`We've sent a verification code to \n +1 (555) 123-4567`}</Typography>

          <View style={styles.otpContainer}>
            <OTPTextView
              ref={otpRef}
              inputCount={6}
              tintColor={LIGHT_PURPLE}
              autoFocus={false}
              textInputStyle={styles.otpInput}
              handleTextChange={(e) => {
                console.log(e);
              }}
            />
          </View>
          <Typography color={WHITE}  >Code expires in 02:59</Typography>

          <Typography color={WHITE} style={{ marginTop: 10 }} >Didn't receive code?<Typography color={DARK_RED}> Resend</Typography></Typography>
          <CommonRedButton
          onPress={()=>{
          handleLogin()
          }}
            style={{ marginTop: 30 }}
            title={'Verify'}
          />
        </View>

      </ImageContainer>
    </View>
  )
}

export default Otp
const styles = StyleSheet.create({
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
    borderColor: BLACK,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    color: WHITE
  },
  resendText: {
    marginHorizontal: 20,
  },
  submitButton: {
    marginVertical: 20,
  },
});