import { View, Text, ViewStyle, StyleProp } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'


interface Props {
  children: React.ReactNode;
  bgColor?: string;
  styles?: StyleProp<ViewStyle>;
}
const CardComponent = (prop: Props) => {
    const {children, bgColor, styles} = prop;
  return (
    <View style = {[globalStyles.inputContainer, {padding: 12}, styles]}>
      {children}
    </View>
  )
}

export default CardComponent