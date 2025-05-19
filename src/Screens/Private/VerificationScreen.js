import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import VerificationItem from '../../Components/VerificationItem';
import { AADHAR, BANK, CAMERA, CAMERA_1, MOBILE, USER_IMG } from '../../Components/ImageAsstes';
import HeaderComponent from '../../Components/HeaderComponent';
import { LIGHT_GREY } from '../../Components/Colors';
import ImageUploadModal from '../../Components/ImageUploadModal';
import Toast from 'react-native-simple-toast';
import { GET_WITH_TOKEN, POST_WITH_TOKEN_FORMDATA } from '../../Backend/Backend';
import { useIsFocused } from '@react-navigation/native';

const VerificationScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [imageData, setImageData] = useState(null);
  const [kycDetails, setKycDetails] = useState(null);
  const handleAadhaarVerify = () => {navigation.navigate('AadharVerification') };
  const handlePANVerify = () => {navigation.navigate('PanVerification') };
  const handleBankVerify = () => { navigation.navigate('VerifyBankAccountScreen') };
  const handleSelfieVerify = () => { setModalVisible(true) };
  const onSelfieVerify = async () => {
    try {
      if (!imageData) {
        Toast.show('Please select an image first');
        return;
      }
      const uploadData = new FormData();
      uploadData.append('file', imageData);
      const response = await POST_WITH_TOKEN_FORMDATA('upload', uploadData);
      if (response?.success === true) {
        Toast.show(response?.message);
      } else {
        Toast.show(response?.message);
      }
    } catch (error) {
      Toast.show(error?.message);
      console.log(error, '==error>>');
    }
  }
const isFocus = useIsFocused()
  const getKycDetails = async () => {
    try {
      const res = await GET_WITH_TOKEN('user/kyc-details');
      console.log(res, '==response');
      if (res?.success) {
        setKycDetails(res?.data);
      } else {
        Toast.show(res?.message || 'Failed to fetch KYC details');
      }
    } catch (error) {
      console.log(error, '==err');
      Toast.show('Something went wrong');
    }
  }

  useEffect(() => {
    if (isFocus) {
      getKycDetails();
    }
  }, [isFocus]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title="Verification" />
      <ImageUploadModal
        visible={modalVisible}
        onImagePicked={e => {
          setImageData({
            uri: e?.path,
            name: e?.filename || 'image.jpg',
            type: e?.mime,
          });
          onSelfieVerify();
        }}
        onClose={() => {
          setModalVisible(false);
        }}
      />
      <View style={styles.content}>
        <VerificationItem
          iconSource={MOBILE}
          title="Mobile Number"
          description="+91 98765 43210"
          buttonText="Verified"
          isVerified={true}
        />
        <VerificationItem
          iconSource={AADHAR}
          title="Aadhaar Card"
          description="Verify your identity"
          buttonText="Verify"

          isVerified={kycDetails?.adhar_verified===0?false:true}
          onButtonPress={handleAadhaarVerify}
        />
        <VerificationItem
          iconSource={AADHAR}
          title="PAN Card"
          description="Link your PAN"
          buttonText="Verify"
          onButtonPress={handlePANVerify}
          isVerified={kycDetails?.pan_verified===0?false:true}
        />
        <VerificationItem
          iconSource={BANK}
          title="Bank Account"
          description="Link your bank account"
          buttonText="Verify"
          onButtonPress={handleBankVerify}
          isVerified={kycDetails?.bank_verified===0?false:true}
        />
        <VerificationItem
          iconSource={CAMERA_1}
          title="Upload Selfie"
          description="Take a clear photo"
          buttonText="Verify"
          onButtonPress={handleSelfieVerify}
          isVerified={kycDetails?.selfie_verified===0?false:true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_GREY,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default VerificationScreen; 