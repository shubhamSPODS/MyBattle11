import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, {  } from 'react'
import { IMAGE_THEME_BG } from './ImageAsstes'

const ImageContainer = ({children,continerStye}) => {
  return (
    <ImageBackground source={IMAGE_THEME_BG} style={{flex:1,...continerStye}
}>{children}
</ImageBackground>
  )
}

export default ImageContainer

const styles = StyleSheet.create({})