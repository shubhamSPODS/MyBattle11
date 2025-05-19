import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import VerificationItem from '../../Components/VerificationItem';
import { AADHAR, BANK, CAMERA, CAMERA_1, MOBILE, USER_IMG } from '../../Components/ImageAsstes';
import HeaderComponent from '../../Components/HeaderComponent';
import { LIGHT_GREY } from '../../Components/Colors';
import ImageUploadModal from '../../Components/ImageUploadModal';

const VerificationScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const handleMobileVerify = () => { console.log('Mobile Verify pressed'); };
  const handleAadhaarVerify = () => {navigation.navigate('AadharVerification') };
  const handlePANVerify = () => { console.log('PAN Verify pressed'); };
  const handleBankVerify = () => { navigation.navigate('VerifyBankAccountScreen') };
  const handleSelfieVerify = () => { setModalVisible(true) };


  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title="Verification" />
      <ImageUploadModal
        visible={modalVisible}
        onImagePicked={e => {
          console.log(e, '==e');
        }}
        onClose={() => {
          setModalVisible(false)
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
          onButtonPress={handleAadhaarVerify}
        />
        <VerificationItem
          iconSource={AADHAR}
          title="PAN Card"
          description="Link your PAN"
          buttonText="Verify"
          onButtonPress={handlePANVerify}
        />
        <VerificationItem
          iconSource={BANK}
          title="Bank Account"
          description="Link your bank account"
          buttonText="Verify"
          onButtonPress={handleBankVerify}
        />
        <VerificationItem
          iconSource={CAMERA_1}
          title="Upload Selfie"
          description="Take a clear photo"
          buttonText="Verify"
          onButtonPress={handleSelfieVerify}
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