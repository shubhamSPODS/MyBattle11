import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import HeaderComponent from '../../Components/HeaderComponent'
import { AADHAR, BANNER_AADHAR, CALENDAR, CheckAdhaar, RECOMMENDED_ICON } from '../../Components/ImageAsstes'
import Typography, { FULL_WIDTH } from '../../Components/Typography'
import { MEDIUM, REGULAR, SEMI_BOLD } from '../../Components/AppFonts'
import CustomTextInput from '../../Components/CustomTextInput'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { BLACK, DARK_PURPLE, GOLDEN, GREY, LIGHT_GREY, WHITE } from '../../Components/Colors'
import moment from 'moment'
import Icon from '../../Components/Icon'
import { checkValidAdharCardNumber, formatAadharNumber, POST_WITH_TOKEN } from '../../Backend/Backend'
import Checkbox from '../../Components/CheckBox'
import Toast from 'react-native-simple-toast';
import CommonButton from '../../Components/CommonButton'
import { useSelector } from 'react-redux'
import Loader from '../../Components/Loader'

const AadharVerification = () => {
    const userToken = useSelector((state) => state.auth?.user);
    console.log(userToken, '==token');
    const [submitData, setSubmitData] = useState({})
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [otp, setOtp] = useState('');
    const [visible, setVisible] = useState(false)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDob(moment(date).format('DD/MM/YYYY'));
        hideDatePicker();
    };
    const sendOtp = async () => {
        try {
            if (!formatAadharNumber(name)) {
                Toast.show('Please enter adhaar number.');
            }
            else if (!checkValidAdharCardNumber(name.replace(/\s/g, ''))) {
                Toast.show('Please enter vaild adhaar number.');
            } else if (!dob) {
                Toast.show('Please enter vaild DOB');
            } else {
                const data = {
                    adhar_no: name.replace(/\s/g, ''),
                };
                setVisible(true)
                const responseOtp = await POST_WITH_TOKEN('user/addadharotp', data)
                console.log(responseOtp, '==respose');
                if (responseOtp?.success === true) {
                    setVisible(false)
                    setSubmitData(responseOtp?.data)
                    Toast.show(responseOtp?.message)
                } else {
                    setVisible(false)
                    Toast.show(responseOtp?.message)
                }

            }
        } catch (error) {
            setVisible(false)
            console.log(error, '==errror');

        }

    };


    const onSubmit = async () => {
        try {
            if (!formatAadharNumber(name)) {
                Toast.show('Please enter adhaar number.');
            }
            else if (!checkValidAdharCardNumber(name.replace(/\s/g, ''))) {
                Toast.show('Please enter vaild adhaar number');
            } else if (!dob) {
                Toast.show('Please enter vaild DOB');
            } else if (!otp) {
                Toast.show('Please enter vaild OTP');
            } else {
                let data = {
                    request_id: submitData?.request_id,
                    otp: otp,
                    task_id: submitData?.task_id,
                    adhar_no: name.replace(/\s/g, ''),
                    dob: dob
                        .split('/')
                        .map(part => part.replace(/^0+/, ''))
                        .join('/'),
                };
                setVisible(true)
                const response = await POST_WITH_TOKEN('user/verifyaadhar', data)
                if (response?.success === true) {
                    setVisible(false)
                    Toast.show(response?.message)
                } else {
                    setVisible(false)
                    Toast.show(response?.message)
                }
            }
        } catch (error) {
            setVisible(false)
            console.log(error, '==error');

        }

    };

    return (
        <View style={{ flex: 1 }}>
            <HeaderComponent title={'Aadhar Verification'} />
            <Loader visible={visible} />
            <ScrollView style={styles.scrollViewContent}>
                <Image
                    source={BANNER_AADHAR}
                    style={styles.bannerImage}
                />

                <View style={styles.box}>
                    <Typography size={14} fontFamily={SEMI_BOLD}>
                        Enter your Aadhaar number
                    </Typography>
                    <Image
                        source={RECOMMENDED_ICON}
                        resizeMode="contain"
                        style={styles.recommended}
                    />
                </View>

                <Typography size={13} color={GREY} fontFamily={MEDIUM} style={{ marginLeft: 10 }}>Aadhar Numer</Typography>

                <View style={styles.inputContainer}>

                    <TextInput
                        placeholder={'Adhaar Number'}
                        placeholderTextColor={GREY}
                        style={styles.inputStyle}
                        value={formatAadharNumber(name)}
                        onChangeText={value => setName(value)}
                        maxLength={14}
                        keyboardType={'decimal-pad'}
                    />
                    {checkValidAdharCardNumber(name?.replace(/\s/g, '')) ? (
                        <Icon
                            source={CheckAdhaar}
                            resizeMode="contain"
                            size={20}
                        />
                    ) : (
                        <></>
                    )}
                </View>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    maximumDate={moment().subtract(18, 'years').toDate()}

                />
                <Typography size={13}
                    color={GREY} fontFamily={MEDIUM} style={{ marginTop: 15, marginLeft: 10, }}>Date Of Birth</Typography>
                <TouchableOpacity onPress={() => {
                    setDatePickerVisibility(true)
                }} style={styles.datePickerButton}>
                    <Typography size={13} color={dob ? BLACK : GREY} >{dob ? dob : 'Date of birth'}</Typography>
                    <Icon
                        size={20}
                        source={CALENDAR}
                    />
                </TouchableOpacity>

                <Typography size={13}
                    color={GREY} fontFamily={MEDIUM} style={{ marginTop: 15, marginLeft: 10, }}>Enter OTP</Typography>
                <View style={styles.inputContainer}>
                    <TextInput
                        allowFontScaling={false}
                        placeholder={'Enter OTP'}
                        placeholderTextColor={GREY}
                        style={{ ...styles.inputStyle, flex: 1, marginRight: 10 }}
                        keyboardType={'number-pad'}
                        maxLength={6}
                        value={otp}
                        onChangeText={e => {
                            setOtp(e)
                        }}
                    />
                    <TouchableOpacity
                        style={styles.sendOtpButton}
                        onPress={sendOtp}
                    >
                        <Typography size={12} color={WHITE} fontFamily={SEMI_BOLD}>
                            SEND OTP
                        </Typography>
                    </TouchableOpacity>
                </View>
                <View style={styles.commonFlow}>
                    <Checkbox value={true} />
                    <Typography size={14} style={styles.commonText} fontFamily={MEDIUM}>
                        {`User must be 18 years of age or above to play pay-to-play contest on MyBattle11`}
                    </Typography>
                </View>

                <View style={styles.commonFlow}>
                    <Checkbox value={true} />
                    <Typography size={14} style={styles.commonText} fontFamily={MEDIUM}>
                        {`Users must not be residing in restricted states.To know more, read Terms & conditions.`}
                    </Typography>
                </View>
                <View style={styles.commonFlow}>
                    <Checkbox value={true} />
                    <Typography size={14} style={styles.commonText} fontFamily={MEDIUM}>
                        {`I hereby confirm that my attached documents are credible and binding.`}
                    </Typography>
                </View>

            </ScrollView>
            <CommonButton title={'Submit'} onPress={onSubmit} />

        </View>
    )
}

export default AadharVerification

const styles = StyleSheet.create({
    commonFlow: {
        flexDirection: 'row',
        marginTop: 10
    },
    commonText: {
        flex: 1,
        marginLeft: 10,
        marginTop: 10
    },
    inputStyle: {
        fontSize: 13,
        fontFamily: REGULAR,
        color: GREY,
        width: "90%"
    },
    box: {
        borderColor: '#002E610F',
        borderRadius: 8,
        marginTop: 10,
        paddingHorizontal: 25,
        paddingVertical: 20,
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    recommended: {
        width: 82,
        height: 19,

    },
    inputContainer: {
        backgroundColor: WHITE,
        borderRadius: 10,
        height: 45,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: LIGHT_GREY,
        alignSelf: "center",
        width: "95%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        alignItems: "center"

    },
    scrollViewContent: {
        paddingHorizontal: 20,
    },
    bannerImage: {
        width: FULL_WIDTH - 40,
        alignSelf: "center",
        height: 120,
        resizeMode: 'stretch',
        marginTop: 10
    },
    datePickerButton: {
        flexDirection: 'row',
        backgroundColor: WHITE,
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 45,
        width: '95%',
        alignSelf: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: LIGHT_GREY,
        justifyContent: "space-between"
    },
    sendOtpButton: {
        backgroundColor: DARK_PURPLE,
        borderRadius: 8,
        height: 35,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: "center",
    }
})