import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Typography, { FULL_WIDTH } from './Typography'
import { SEMI_BOLD } from './AppFonts'
import { GOLDEN, WHITE } from './Colors'

const CustomButton = ({style ,onPress,title='',textStyle,backgroundColor=GOLDEN}) => {
    return (
        <TouchableOpacity
        onPress={onPress}
            activeOpacity={0.9}
            style={{
                marginTop: 10, width: FULL_WIDTH - 80, left: 10, alignSelf: 'center',
                backgroundColor: backgroundColor, padding: 10,
                borderRadius: 10,
                alignItems: "center",
                ...style
            }}
        >
            <Typography color={WHITE}  style ={{...textStyle}} fontFamily={SEMI_BOLD}>{title}</Typography>
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({})