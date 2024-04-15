import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'

interface Props
{
  title?: string,
  back?: boolean,
  right?: React.ReactNode,
  children: React.ReactNode,
}

const Container = ( props: Props ) =>
{
  const { title, back, right, children } = props;

  return <ScrollView style={[ globalStyles.container ]}>{children}</ScrollView>;
}

export default Container