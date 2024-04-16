import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import TitleComponent from './TitleComponent';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { colors } from '../constants/colors';
import { ArrowDown2 } from 'iconsax-react-native';
import { globalStyles } from '../styles/globalStyles';
import { Modal } from 'react-native';
import SpaceComponent from './SpaceComponent';
import DatePicker from 'react-native-date-picker';

interface Props
{
    type?: 'date' | 'time' | 'datetime';
    title?: string;
    placeholder?: string;
    selected?: Date;
    onSelect: ( val: Date ) => void;

}
const DateTimePickerComponent = ( props: Props ) =>
{
    const { type, title, placeholder, selected, onSelect } = props;
    const [ isVisibleModalDateTime, setIsVisibleModalDateTime ] = useState( false );
    const [ date, setDate ] = useState( selected ?? new Date() );
    return (
        <>
            <View style={{ marginBottom: 16 }}>
                {title && <TitleComponent text={title} />}
                <RowComponent
                    onPress={() => setIsVisibleModalDateTime( true )}
                    styles={[ globalStyles.inputContainer, { marginTop: title ? 8 : 0, paddingVertical: 16 } ]}>
                    <TextComponent
                        flex={1}
                        text={
                            selected ? type === 'time'
                                ? `${ selected.getHours() } : ${ selected.getMinutes().toString().padStart( 2, '0' ) }`
                                : `${ selected.getDate() } /${ selected.getMonth() + 1 }/${ selected.getFullYear() }` : placeholder ? placeholder : ''
                        }
                        color={selected ? colors.text : '#676767'} />
                    <ArrowDown2 size={20} color={colors.text} />
                </RowComponent>
            </View>
            <Modal
                visible={isVisibleModalDateTime} transparent animationType='slide'>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}>
                    <View style={{
                        backgroundColor: colors.white,
                        padding: 20,
                        margin: 20,
                        width: '80%',
                        borderRadius: 20,
                    }}>
                        <TextComponent text='Date Time Picker' color={colors.white} />
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <DatePicker
                                locale='en'
                                mode={type ? type : 'date'}
                                date={date}
                                onDateChange={val => setDate( val )} />
                        </View>
                        <SpaceComponent height={20} />
                        <Button title="Confirm" onPress={() =>
                        {
                            onSelect( date );
                            setIsVisibleModalDateTime( false )
                        }} />
                        <SpaceComponent height={10} />
                        <Button title="Close" onPress={() => setIsVisibleModalDateTime( false )} />

                    </View>
                    <Text>DateTimePicker</Text>
                </View>
            </Modal>
        </>

    )
}

export default DateTimePickerComponent