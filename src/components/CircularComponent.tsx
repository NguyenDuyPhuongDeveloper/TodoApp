import { View, Text } from 'react-native'
import React from 'react'
import CircularProgress from 'react-native-circular-progress-indicator';
import { colors } from '../constants/colors';
import { fontFamilies } from '../constants/fontFamilies';


interface Props
{
  value: number,
  maxValue?: number,
  color?: string,
  radius?: number,
}

const CircularComponent = ( props: Props ) =>
{
  const { value, maxValue, color, radius } = props;
  return (
    <CircularProgress
      value={value}
      title={`${ value }%`}
      radius={radius ?? 46}
      showProgressValue={false}
      activeStrokeColor={color ?? colors.blue}
      inActiveStrokeColor={color ?? colors.gray2}
      titleColor={colors.text}
      titleFontSize={radius ? radius / 2 : 23}
      activeStrokeWidth={14}
      inActiveStrokeWidth={14}
      titleStyle={{
        fontFamily: fontFamilies.semiBold,
      }} />
  );
}

export default CircularComponent