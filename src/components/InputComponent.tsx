import { View, Text, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import TitleComponent from './TitleComponent';
import RowComponent from './RowComponent';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';



interface Props
{
    value: string;
    onChange: ( val: string ) => void;
    placeholder?: string;
    title?: string;
    prefix?: ReactNode;
    affix?: ReactNode;
    allowClear?: boolean;
    multiple?: boolean;
    numberOfLines?: number;
}
const InputComponent = ( props: Props ) =>
{
    const { value, onChange, placeholder, title, prefix, affix, allowClear, multiple, numberOfLines } = props;
    return (
        <View style={{ marginBottom: 16 }}>
            {title && <TitleComponent text={title} />}
            <RowComponent styles={[
                globalStyles.inputContainer,
                {
                    marginTop: title ? 8 : 0,
                    minHeight: multiple && numberOfLines ? 32 * numberOfLines : 32,
                    paddingVertical: 14,
                    paddingHorizontal: 10,
                    alignItems: multiple && numberOfLines ? 'flex-start' : 'center',

                },
            ]}>
                {prefix && prefix}
                <View style={{ flex: 1, paddingLeft: prefix ? 8 : 0, paddingRight: affix ? 8 : 0 }}>
                    <TextInput
                        value={value}
                        onChangeText={val => onChange( val )}
                        placeholder={placeholder ?? ''}
                        placeholderTextColor={'#676767'}
                        multiline={multiple}
                        numberOfLines={numberOfLines}
                        style={[
                            globalStyles.text,
                            {
                                margin: 0,
                                padding: 0,
                                paddingVertical: 6,
                                flex: 1,
                            } ]} />
                </View>
                {affix && affix}
                {allowClear && value && (
                    <TouchableOpacity onPress={() => onChange( '' )}>
                        <AntDesign name="close" size={20} color={colors.white} />
                    </TouchableOpacity>
                )}
            </RowComponent>
        </View>
    )
}

export default InputComponent