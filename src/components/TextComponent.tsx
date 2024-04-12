import { View, Text, StyleProp } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { fontFamilies } from '../constants/fontFamilies';
import { colors } from '../constants/colors';
import { TextStyle } from 'react-native';

interface Props {
    text: string,
    size?: number,
    font?: string,
    color?: string,
    flex?: number,
    styles?: StyleProp<TextStyle>,
}
const TextComponent = (props: Props) => {
    const { text, size, font, color, flex, styles } = props;
  return (
    <Text style={[
      globalStyles.text,
      {
        fontFamily: font ?? fontFamilies.regular,
        fontSize: size ?? 14,
        color: color ?? colors.text,
        flex: flex ?? 1,
      },
      styles,
    ]}>{text}</Text>
  )
}

export default TextComponent