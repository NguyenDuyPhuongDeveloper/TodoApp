import { View, Text, Modal, FlatList, Button, Touchable, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SelectModel } from '../models/SelectModel';
import TitleComponent from './TitleComponent';
import RowComponent from './RowComponent';
import { globalStyles } from '../styles/globalStyles';
import InputComponent from './InputComponent';
import TextComponent from './TextComponent';
import { colors } from '../constants/colors';
import { ArrowDown2, SearchNormal, TickCircle } from 'iconsax-react-native';
import ButtonComponent from './ButtonComponent';
import SpaceComponent from './SpaceComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
interface Props
{
    title?: string;
    items: SelectModel[];
    selected?: string[];
    onSelect: ( val: string[] ) => void;
    multiple?: boolean;
}

const DropdownPicker = ( props: Props ) =>
{
    const { title, items, selected, onSelect, multiple } = props;
    const [ searchKey, setSearchKey ] = useState( '' );
    const [ result, setResult ] = useState<SelectModel[]>( [] );
    const [ isVisible, setIsVisible ] = useState( false );
    const [ dataSelected, setDataSelected ] = useState<string[]>( [] );

    useEffect( () =>
    {
        selected && setDataSelected( selected );
    }, [ isVisible, selected ] );

    useEffect( () =>
    {
        if ( !searchKey )
        {
            setResult( [] );
            console.log( searchKey );
        }
        else
        {
            const data = items.filter( item => item.label.toLowerCase().includes( searchKey.toLowerCase() ) );
            setResult( data );
        }
    }, [ searchKey ] );

    const handleSelectedItem = ( id: string ) =>
    {
        if ( multiple )
        {
            const data = [ ...dataSelected ];
            const index = data.findIndex( item => item === id );
            if ( index !== -1 )
            {
                data.splice( index, 1 );
            }
            else
            {
                data.push( id );
            }
            setDataSelected( data );
        }
        else
        {
            setDataSelected( [ id ] );
        }

    }
    const handleConfirmSelect = () =>
    {
        onSelect( dataSelected );
        setIsVisible( false );
        setDataSelected( [] );

    }
    const handleRemoveSelectedItem = ( index: number ) =>
    {
        if ( selected )
        {
            selected.splice( index, 1 );
            onSelect( selected );
        }
    }
    const renderSelectedItem = ( id: string, index: number ) =>
    {
        const item = items.find( item => item.value === id );
        return (
            item && (
                <RowComponent
                    onPress={() => handleRemoveSelectedItem( index )}
                    key={id}
                    styles={{
                        marginRight: 4,
                        padding: 4,
                        borderRadius: 100,
                        borderWidth: 0.5,
                        borderColor: colors.gray2,
                        marginBottom: 8,
                        backgroundColor: 'coral'
                    }}>
                    <TextComponent text={item.label} flex={0} />
                    <SpaceComponent width={8} />
                    <AntDesign name='close' size={14} color={colors.text} />
                </RowComponent>
            )
        )
    }
    return (
        <View style={{ marginBottom: 16 }}>
            {title && <TitleComponent text={title} />}
            <RowComponent onPress={() => setIsVisible( true )}
                styles={[
                    globalStyles.inputContainer,
                    { marginTop: title ? 8 : 0, paddingVertical: 16 } ]
                }>
                <View style={{ flex: 1, paddingRight: 12 }}>
                    {selected && selected.length > 0 ? (
                        <RowComponent justify='flex-start' styles={{ flexWrap: 'wrap' }}>
                            {selected.map( ( item, index ) =>
                                renderSelectedItem( item, index ) )
                            }
                        </RowComponent>
                    ) : ( <TextComponent text="Select" color={colors.gray2} flex={0} /> )}

                </View>
                <ArrowDown2 size={20} color={colors.text} />
            </RowComponent>
            <Modal
                visible={isVisible}
                style={{ flex: 1 }}
                transparent
                animationType='slide'
                statusBarTranslucent>
                <View
                    style={[
                        globalStyles.container,
                        {
                            padding: 20,
                            paddingTop: 60,
                            paddingBottom: 60,

                        },
                    ]}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                            <RowComponent styles={{ paddingVertical: 16 }} >
                                <View style={{ flex: 1, marginRight: 12 }}>
                                    <InputComponent
                                        value={searchKey}
                                        onChange={val => setSearchKey( val )}
                                        placeholder='Search...'
                                        prefix={<SearchNormal size={20} color={colors.gray2} />}
                                        allowClear
                                    />
                                </View>
                                <TouchableOpacity onPress={() => onSelect( [] )}
                                >
                                    <TextComponent text='Cancel' color='coral' flex={0} styles={{ paddingBottom: 20 }} />
                                </TouchableOpacity>
                            </RowComponent>

                        }
                        style={{ flex: 1 }}
                        data={searchKey ? result : items}
                        renderItem={( { item } ) => (
                            <RowComponent
                                onPress={() => handleSelectedItem( item.value )}
                                key={item.value}
                                styles={{ paddingVertical: 16 }} >
                                <TextComponent text={item.label} size={16}
                                    color={dataSelected.includes( item.value ) ? 'coral' : colors.text} />
                                {
                                    dataSelected.includes( item.value ) && ( <TickCircle size={22} color='coral' /> )
                                }
                            </RowComponent>
                        )} />
                    <ButtonComponent text='Confirm' onPress={handleConfirmSelect} />

                </View>
            </Modal>
        </View >
    )
}

export default DropdownPicker