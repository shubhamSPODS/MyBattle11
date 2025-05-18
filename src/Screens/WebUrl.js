import React, { useState } from "react";
import { View, StyleSheet } from 'react-native';
import WebView from "react-native-webview";
import HeaderComponent from "../Components/HeaderComponent";
import { FULL_HEIGHT, FULL_WIDTH } from "../Components/Typography";
import Loader from "../Components/Loader";

const WebUrl = ({ route }) => {
    const [isLoading, setIsLoading] = useState(true);
    let title = route?.params?.titleNames;

    let titleName = () => {
        if (title == 'Terms & Conditions') {
            return 'https://mybattle11.com/termsNConditionsmobile'
        } else if (title == 'About Us') {
            return 'https://mybattle11.com/aboutmobile'
        } else if (title == 'HowToPlay') {
            return 'https://mybattle11.com/howToPlaymobile'
        } else if (title == 'Privacy Policy') {
            return 'https://mybattle11.com/policymobile'
        } else if (title == 'Points System') {
            return 'https://mybattle11.com/fantasy_points_systemmobile'
        } else if (title == 'Responsible Gaming') {
            return 'https://mybattle11.com/responsible_gamingmobile'
        } else if (title == 'Legalities') {
            return 'https://mybattle11.com/legalitiesmobile'
        } else if (title == 'Fair Play Policy') {
            return 'https://mybattle11.com/fairPlaymobile'
        } else {
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <HeaderComponent title={title} />
            <Loader visible={isLoading} />
            <WebView
                source={{ uri: titleName() }}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
            />
        </View>
    )
}
const styles = StyleSheet.create({

})
export default WebUrl
