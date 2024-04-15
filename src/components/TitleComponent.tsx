import { View, Text } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { fontFamilies } from '../constants/fontFamilies';
import { colors } from '../constants/colors';
import TextComponent from './TextComponent';

interface Props
{
    text: string,
    size?: number,
    font?: string,
    color?: string
}
const TitleComponent = ( props: Props ) =>
{
    const { text, size, font, color } = props;
    return (
        <TextComponent
            size={size ?? 20}
            font={font ?? fontFamilies.semiBold}
            color={color}
            text={text}
        />
    );
}

export default TitleComponent