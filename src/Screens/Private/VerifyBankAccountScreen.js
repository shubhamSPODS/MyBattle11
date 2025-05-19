import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CommonButton from '../../Components/CommonButton';
import HeaderComponent from '../../Components/HeaderComponent';
import { WHITE, PURPLE } from '../../Components/Colors';
import  { FULL_WIDTH } from '../../Components/Typography';
import CustomTextInput from '../../Components/CustomTextInput';
import Toast from 'react-native-simple-toast';
import { ifsclNumber, POST_WITH_TOKEN } from '../../Backend/Backend';
import Loader from '../../Components/Loader';

const VerifyBankAccountScreen = () => {
  const [visible,setVisible] = useState(false)
  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const handleVerify = async() => {
   try {
    if (!name) {
      Toast.show('Please enter your name.')
    }
    else if (!accountNumber) {
      Toast.show('Please enter your account number.')
    } else if (confirmAccountNumber != accountNumber) {
      Toast.show('Please check confirm account number.')
    } else if (!ifsclNumber(ifscCode)) {
      Toast.show('Please enter vaild ifsc code.')
    } else if (!bankName) {
      Toast.show('Please enter bank name.')
    } else if (!branchName) {
      Toast.show('Please enter branch name.')
    } 
    else {
      const data = {
          account_number: accountNumber,
          ifsc_code: ifscCode,
          bank_name: bankName,
          branch_name: branchName,
          name: name
      }
      setVisible(true)
      const response = await POST_WITH_TOKEN('user/verifybankpenny',data)
      if (response?.success ===true) {
        setVisible(false)
        Toast.show(response?.message)
      }else{
        setVisible(false)
        Toast.show(response?.message)
      }
    }
    
   } catch (error) {
    setVisible(false)
    Toast.show(error?.message)
     console.log(error,'==err>>');
     
   }
  };

  return (
    <View style={styles.container}>
      <HeaderComponent title="Verify Bank Account" />
    <Loader visible={visible}/>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <CustomTextInput
          heading='Name'
          label
          placeholder="Enter Your Name"
          value={name}
          onChangeText={setName}
          labelStyle={{ marginTop: 10, marginLeft: 30 }} containerStyle={{ width: FULL_WIDTH - 50 }}
        />
        <CustomTextInput
          heading='Account number'
          label
          placeholder="Enter Account Number"
          value={accountNumber}
          onChangeText={setAccountNumber}
          labelStyle={{ marginTop: 10, marginLeft: 30 }}
          containerStyle={{ width: FULL_WIDTH - 50 }}
        />

        <CustomTextInput
          heading='Confirm Account Number'
          label
          placeholder="Confirm Account Number"
          value={confirmAccountNumber}
          onChangeText={setConfirmAccountNumber}
          labelStyle={{ marginTop: 10, marginLeft: 30 }}
          containerStyle={{ width: FULL_WIDTH - 50 }}
        />
        <CustomTextInput
          heading='IFSC Code'
          label
          placeholder="Enter IFSC Code"
          value={ifscCode}
          onChangeText={setIfscCode}
          labelStyle={{ marginTop: 10, marginLeft: 30 }}
          containerStyle={{ width: FULL_WIDTH - 50 }}
        />
        <CustomTextInput
          heading='Bank Name'
          label
          placeholder="Enter Bank Name"
          value={bankName}
          onChangeText={setBankName}
          labelStyle={{ marginTop: 10, marginLeft: 30 }}
          containerStyle={{ width: FULL_WIDTH - 50 }}
        />
        <CustomTextInput
          heading='Branch Name'
          label
          placeholder="Enter Branch Name"
          value={branchName}
          onChangeText={setBranchName}
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