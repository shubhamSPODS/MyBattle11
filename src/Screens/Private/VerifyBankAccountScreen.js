import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CommonButton from '../../Components/CommonButton';
import HeaderComponent from '../../Components/HeaderComponent';
import { WHITE, PURPLE } from '../../Components/Colors';
import Typography, { FULL_WIDTH } from '../../Components/Typography';
import { MEDIUM } from '../../Components/AppFonts';
import CustomTextInput from '../../Components/CustomTextInput';
import ImageUploadModal from '../../Components/ImageUploadModal';

const VerifyBankAccountScreen = () => {
  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');

  const handleVerify = () => {
    console.log('Verifying Bank Account');
  };

  return (
    <View style={styles.container}>
      <HeaderComponent title="Verify Bank Account" />
    
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <CustomTextInput
          heading='Name'
          label
          placeholder="Enter Your Name"
          value={name}
          onChangeTypography={setName}
          labelStyle={{ marginTop: 10, marginLeft: 30 }} containerStyle={{ width: FULL_WIDTH - 50 }}
        />
        <CustomTextInput
          heading='Account number'
          label
          placeholder="Enter Account Number"
          value={name}
          onChangeTypography={setName}
          labelStyle={{ marginTop: 10, marginLeft: 30 }}
          containerStyle={{ width: FULL_WIDTH - 50 }}
        />

        <CustomTextInput
          heading='Confirm Account Number'
          label
          placeholder="Confirm Account Number"
          value={name}
          onChangeTypography={setName}
          labelStyle={{ marginTop: 10, marginLeft: 30 }}
          containerStyle={{ width: FULL_WIDTH - 50 }}
        />
        <CustomTextInput
          heading='IFSC Code'
          label
          placeholder="Enter IFSC Code"
          value={name}
          onChangeTypography={setName}
          labelStyle={{ marginTop: 10, marginLeft: 30 }}
          containerStyle={{ width: FULL_WIDTH - 50 }}
        />
        <CustomTextInput
          heading='Bank Name'
          label
          placeholder="Enter Bank Name"
          value={name}
          onChangeTypography={setName}
          labelStyle={{ marginTop: 10, marginLeft: 30 }}
          containerStyle={{ width: FULL_WIDTH - 50 }}
        />
        <CustomTextInput
          heading='Branch Name'
          label
          placeholder="Enter Branch Name"
          value={name}
          onChangeTypography={setName}
          labelStyle={{ marginTop: 10, marginLeft: 30 }}
          containerStyle={{ width: FULL_WIDTH - 50 }}
        />

      </ScrollView>

      <CommonButton title="Verify" onPress={handleVerify} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PURPLE,
  },
  scrollViewContent: {
    paddingVertical: 20,
  },
  instructionTypography: {
    fontSize: 18,
    color: WHITE,
    TypographyAlign: 'center',
    marginBottom: 20,
  },
  hintTypography: {
    fontSize: 12,
    color: WHITE,
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 15,
  },
});

export default VerifyBankAccountScreen; 