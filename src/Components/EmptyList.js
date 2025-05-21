import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Typography, { FULL_WIDTH } from './Typography'
import { SEMI_BOLD } from './AppFonts'
import { DARK_RED, WHITE } from './Colors'

const EmptyList = ({title='No Contest Found.'}) => {
  return (
    <View style={{width:FULL_WIDTH-80,alignSelf:"center",paddingVertical:30,backgroundColor:DARK_RED,borderRadius:10,alignItems:"center",
        justifyContent:"center"
    }}>
        <Typography size={18}  color={WHITE} fontFamily={SEMI_BOLD}>{title}</Typography>
        </View>
  )
}

export default EmptyList

const styles = StyleSheet.create({})