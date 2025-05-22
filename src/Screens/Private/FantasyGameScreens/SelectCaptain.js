import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderComponent from '../../../Components/HeaderComponent'
import { WHITE } from '../../../Components/Colors'

const SelectCaptain = () => {
  return (
    <View style={{flex:1,backgroundColor:WHITE}}>
  <HeaderComponent title={'Select Captain and Vice Captain'}/>
    </View>
  )
}

export default SelectCaptain

const styles = StyleSheet.create({})