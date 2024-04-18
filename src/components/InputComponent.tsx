import { View, Text, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, { ReactNode, useState } from 'react'
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
    isPassword?: boolean;
}
const InputComponent = ( props: Props ) =>
{
    const { value, onChange, placeholder, title, prefix, affix, allowClear, multiple, numberOfLines, isPassword } = props;
    const [ showPass, setShowPass ] = useState( false );
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
                        style={[
                            globalStyles.text,
                            {
                                margin: 0,
                                padding: 0,
                                paddingVertical: 0,
                                flex: 0,
                            } ]}
                        value={value}
                        onChangeText={val => onChange( val )}
                        placeholder={placeholder ?? ''}
                        placeholderTextColor={'#676767'}
                        multiline={multiple}
                        numberOfLines={numberOfLines}
                        secureTextEntry={isPassword ? !showPass : false}
                        autoCapitalize='none'
                    />
                </View>
                {affix && affix}
                {allowClear && value && (
                    <TouchableOpacity onPress={() => onChange( '' )}>
                        <AntDesign name="close" size={20} color={colors.white} />
                    </TouchableOpacity>
                )}
                {isPassword && (
                    <TouchableOpacity onPress={() => setShowPass( !showPass )}>
                        <AntDesign name={showPass ? 'eye' : 'eyeo'} size={20} color={colors.white} />
                    </TouchableOpacity>
                )}
            </RowComponent>
        </View>
    )
}

export default InputComponent