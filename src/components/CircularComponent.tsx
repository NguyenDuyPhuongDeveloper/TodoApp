import { View, Text } from 'react-native'
import React from 'react'
import CircularProgress from 'react-native-circular-progress-indicator';
import { colors } from '../constants/colors';
import { fontFamilies } from '../constants/fontFamilies';


interface Props {
    value: number,
    maxValue?: number,
    color?: string,
}

const CircularComponent = (props: Props) => {
    const { value, maxValue, color } = props;
  return (
    <CircularProgress 
    value={value} 
    title={`${value}%`}
    showProgressValue={false}
    activeStrokeColor={color ?? colors.blue}
    inActiveStrokeColor={color ?? colors.gray2}
    titleColor = {colors.text}
    titleFontSize = {32}
    titleStyle={{
      fontFamily: fontFamilies.semiBold,
    }}/>
  );
}

export default CircularComponent