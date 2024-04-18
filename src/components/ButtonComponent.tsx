import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import TextComponent from './TextComponent';
import { fontFamilies } from '../constants/fontFamilies';
import { colors } from '../constants/colors';

interface Props
{
    text: string;
    isLoading?: boolean;
    onPress: () => void;
    color?: string;
}
const ButtonComponent = ( props: Props ) =>
{
    const { text, isLoading, onPress, color } = props;
    return (
        <TouchableOpacity onPress={onPress}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: color ?? colors.blue,
                padding: 14,
                borderRadius: 14,
            }}
            disabled={isLoading}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <TextComponent
                    text={text}
                    color={color}
                    flex={0}
                    styles={{ textTransform: 'uppercase' }}
                    size={16}
                    font={fontFamilies.semiBold} />
            )}
        </TouchableOpacity>
    )
}

export default ButtonComponent