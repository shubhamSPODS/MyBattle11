import { Dimensions, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IMAGE_THEME_BG } from '../../Components/ImageAsstes'
import ImageContainer from '../../Components/ImageContainer'
import Typography, { FULL_WIDTH } from '../../Components/Typography'
import { SEMI_BOLD } from '../../Components/AppFonts'
import { GREY, LIGHT_GREY } from '../../Components/Colors'
import CustomTextInput from '../../Components/CustomTextInput'
import CommonButton from '../../Components/CommonButton'
import { useNavigation } from '@react-navigation/native'

const Login = () => {
  const navigation = useNavigation()
  return (

    <View style={{ flex: 1, }}>
      <ImageContainer continerStye={{ alignItems: 'center', justifyContent: "center", }}>
        <View style={{
          width: FULL_WIDTH - 30, padding: 10, backgroundColor: LIGHT_GREY,
          borderRadius: 15,minHeight:250
        }}>

            <Typography fontFamily={SEMI_BOLD} size={18} style={{ marginLeft: 13, marginTop: 10 }}>Welcome Back</Typography>
            <Typography size={13} color={GREY} style={{ marginLeft: 13, }}>Sign in to continue playing fantasy sports.</Typography>
           <View>
             <CustomTextInput 
             isPhoneNumber
             label
             heading='Mobile number'
             placeholder={'Enter mobile number'}
             labelStyle={{marginLeft:15,marginTop:15}}
             containerStyle={{width:"90%"}}
             />  


              <CommonButton
              title={'Get OTP'}
               style={{width:"90%",marginTop:5}}
               onPress={()=>{
                navigation.navigate('Otp')
               }}
              />
        
        </View>
        </View>
      </ImageContainer>


    </View>
  )
}

export default Login

const styles = StyleSheet.create({})

