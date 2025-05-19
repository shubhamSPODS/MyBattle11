import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import HeaderComponent from '../../Components/HeaderComponent'
import Typography, { FULL_WIDTH } from '../../Components/Typography'
import LinearGradient from 'react-native-linear-gradient'
import { BLACK, GREY, LIGHT_GREY, LINEAR_DARK_PURPLE, LINEAR_LIGHT_PURPLE, WHITE } from '../../Components/Colors'
import { REGULAR, SEMI_BOLD } from '../../Components/AppFonts'
import { CheckAdhaar, RECOMMENDED_ICON } from '../../Components/ImageAsstes'
import CustomTextInput from '../../Components/CustomTextInput'
import CommonButton from '../../Components/CommonButton'
import Toast from 'react-native-simple-toast';
import { checkValidPanCardNumber, POST_WITH_TOKEN } from '../../Backend/Backend'
import Loader from '../../Components/Loader'
import Icon from '../../Components/Icon'

const PanVerification = () => {
    const [name, setName] = useState('');
    const [pan, setPan] = useState('');
    const [isVisible,setIsVisible] = useState(false)
    const onSubmit = async () => {
        try {
            if (!name) {
                Toast.show('Please Enter Your Name');
            } else if (!checkValidPanCardNumber(pan)) {
                Toast.show('Please Enter Vaild Pan Number');
            }
            else {
                const data = {
                    name: name?.toLocaleUpperCase(),
                    PanNumber: pan?.toLocaleUpperCase(),

                };
                setIsVisible(true)
                const response = await POST_WITH_TOKEN('user/pan_verify', data)
                if (response?.success === true) {
                    setIsVisible(false)
                    Toast.show(response?.message);
                } else {
                    setIsVisible(false)
                    Toast.show(response?.message);
                }
            }
        } catch (error) {
            setIsVisible(false)
            Toast.show(error);
            console.log(error, '==errr==');

        }

    };
    return (
        <View style={{ flex: 1 }}>


            <HeaderComponent title={'Pan Verification'} />
            <Loader visible={isVisible}/>
            <ScrollView>

                <LinearGradient
                    colors={[LINEAR_LIGHT_PURPLE, LINEAR_DARK_PURPLE]}
                    style={styles.balanceCard}
                >
                    <View style={styles.box}>
                        <Typography size={14} color={WHITE} fontFamily={SEMI_BOLD}>
                            Enter your Pan number
                        </Typography>
                        <Image
                            source={RECOMMENDED_ICON}
                            resizeMode="contain"
                            style={styles.recommended}
                        />
                    </View>

                    <View style={styles.inputContainer}>

                        <TextInput
                            placeholder={'Pan Number'}
                            placeholderTextColor={GREY}
                            style={styles.inputStyle}
                            value={pan?.toLocaleUpperCase()}
                            onChangeText={value => setPan(value)}
                            maxLength={14}
                            keyboardType={'decimal-pad'}
                        />
                        {checkValidPanCardNumber(pan?.replace(/\s/g, '')) ? (
                            <Icon
                                source={CheckAdhaar}
                                resizeMode="contain"
                                size={20}
                            />
                        ) : (
                            <></>
                        )}
                    </View>
                    <CustomTextInput
                        value={name?.toLocaleUpperCase()}
                        placeholder={'Pan Card Holder Name'}
                        containerStyle={{ width: '100%', marginTop: 20 }}
                        onChangeText={(value) => setName(value)}
                    />

                </LinearGradient>

            </ScrollView>
            <CommonButton title={'Submit'} onPress={onSubmit}/>

        </View>
    )
}

export default PanVerification

const styles = StyleSheet.create({
    balanceCard: {
        width: FULL_WIDTH - 30,
        alignSelf: "center",
        padding: 20,
        borderRadius: 10,
        elevation: 4,
        shadowColor: BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginTop: 30
    },
    box: {
        borderRadius: 8,
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: 'space-between',
        width: '100%'
    },
    recommended: {
        width: 82,
        height: 20,

    },
    inputContainer: {
        backgroundColor: WHITE,
        borderRadius: 10,
        height: 45,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: LIGHT_GREY,
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        alignItems: "center",
        width: '100%'
    },
    inputStyle: {
        fontSize: 13,
        fontFamily: REGULAR,
        color: GREY,
        width: "90%"
    },
})