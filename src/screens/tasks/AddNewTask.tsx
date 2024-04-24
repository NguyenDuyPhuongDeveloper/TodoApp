import React, { useState, useEffect } from 'react'
import { Button, View, ScrollView } from 'react-native'
import Container from '../../components/Container'
import DateTimePickerComponent from '../../components/DateTimePickerComponent'
import DropdownPicker from '../../components/DropdownPicker'
import InputComponent from '../../components/InputComponent'
import RowComponent from '../../components/RowComponent'
import SectionComponent from '../../components/SectionComponent'
import SpaceComponent from '../../components/SpaceComponent'
import { TaskModel } from '../../models/TaskModel'
import { SelectModel } from '../../models/SelectModel'
import firestore from '@react-native-firebase/firestore'
import TitleComponent from '../../components/TitleComponent'
import { AttachSquare, Scroll } from 'iconsax-react-native'
import { colors } from '../../constants/colors'
import DocumentPicker, { DocumentPickerOptions, DocumentPickerResponse } from 'react-native-document-picker'
import TextComponent from '../../components/TextComponent'
import ButtonComponent from '../../components/ButtonComponent'
import storage from '@react-native-firebase/storage'

const initValue: TaskModel = {
    id: '',
    title: '',
    description: '',
    dueDate: new Date(),
    start: new Date(),
    end: new Date(),
    uids: [],
    fileUrls: [],
    progress: '',
}


const AddNewTask = ( { navigation }: any ) =>
{
    const [ taskDetail, setTaskDetail ] = useState<TaskModel>( initValue );
    const [ userSelect, setUserSelect ] = useState<SelectModel[]>( [] );
    const [ attachments, setAttachments ] = useState<DocumentPickerResponse[]>( [] );
    const [ attachmentUrls, setAttachmentUrls ] = useState<string[]>( [] );
    const [ isLoading, setIsLoading ] = useState( false );
    useEffect( () =>
    {
        handleGetAllUsers();
    }, [] );

    const handleGetAllUsers = async () =>
    {
        await firestore().collection( 'users' ).get().then( ( snap ) =>
        {
            if ( snap.empty )
            {
                console.log( 'Users data not found' );
            }
            else
            {
                let temp: SelectModel[] = [];
                snap.forEach( ( doc ) =>
                {
                    const data = doc.data();
                    temp.push( { label: data.email, value: doc.id } );
                } )
                setUserSelect( temp );
            }
        } )
            .catch( ( error: any ) => 
            {
                console.log( `Can not get user. ${ error.message }` )
            } );
    }

    const handleChangeValue = ( id: string, value: string | string[] | Date ) =>
    {
        const item: any = { ...taskDetail };
        item[ id ] = value;
        setTaskDetail( item );
    }
    const handleAddNewTask = async () =>
    {
        const data = { ...taskDetail, fileUrls: attachmentUrls };
        await firestore()
            .collection( 'tasks' )
            .add( data )
            .then( () =>
            {
                console.log( 'New task added!' );
                navigation.goBack();
            } ).catch( error => console.log( error ) );
    }
    const handlePickerDocument = () =>
    {
        DocumentPicker.pick( {} )
            .then( res =>
            {
                setAttachments( res );
                res.forEach( item => handleUploadFileToStorage( item ) );
            } )
            .catch( error =>
            {
                console.log( error )
            } );
    }
    const handleUploadFileToStorage = async ( item: DocumentPickerResponse ) =>
    {
        const filename = item.name ?? `file${ Date.now() }`;
        const path = `documents/${ filename }`;
        const items = [ ...attachmentUrls ];

        await storage().ref( path ).putFile( item.uri );
        await storage().ref( path ).getDownloadURL().then( url =>
        {
            items.push( url );
            setAttachmentUrls( items );
        } )
            .catch( error => console.log( error ) );
    }

    return (
        <Container isScroll>
            <Container back title="Add new task">
                <SectionComponent>
                    <InputComponent
                        value={taskDetail.title}
                        onChange={val => handleChangeValue( 'title', val )}
                        title='Title'
                        allowClear
                        placeholder='Title of task' />
                    <InputComponent
                        value={taskDetail.description}
                        onChange={val => handleChangeValue( 'description', val )}
                        title='Description'
                        allowClear
                        placeholder='Content'
                        multiple
                        numberOfLines={3} />
                    <DateTimePickerComponent
                        selected={taskDetail.dueDate}
                        onSelect={val => handleChangeValue( 'dueDate', val )}
                        placeholder='Choice'
                        type='date'
                        title='Due date' />
                    <RowComponent>
                        <View style={{ flex: 1 }}>
                            <DateTimePickerComponent
                                selected={taskDetail.start}
                                onSelect={val => handleChangeValue( 'start', val )}
                                placeholder='Choice'
                                type='time'
                                title='Start time' />
                        </View>
                        <SpaceComponent width={10} />
                        <View style={{ flex: 1 }}>
                            <DateTimePickerComponent
                                selected={taskDetail.end}
                                onSelect={val => handleChangeValue( 'end', val )}
                                placeholder='Choice'
                                type='time'
                                title='End time' />
                        </View>
                    </RowComponent>
                    <DropdownPicker
                        selected={taskDetail.uids}
                        items={userSelect}
                        onSelect={val => handleChangeValue( 'uids', val )}
                        multiple
                        title='Members' />
                    <View>
                        <RowComponent justify='flex-start' onPress={handlePickerDocument}>
                            <TitleComponent text='Attachments' flex={0} />
                            <SpaceComponent width={8} />
                            <AttachSquare size={20} color={colors.white} />
                        </RowComponent>
                        {
                            attachments.length > 0 && attachments.map( ( item, index ) => (
                                <RowComponent styles={{ paddingVertical: 12 }} key={`attachment${ index }`} justify='flex-start'>
                                    <TextComponent text={item.name ?? ''} flex={0} />
                                </RowComponent>
                            ) )

                        }
                    </View>
                </SectionComponent>
                <SectionComponent>
                    <ButtonComponent text="Save" onPress={handleAddNewTask} />
                </SectionComponent>

            </Container>
        </Container>


    )
}

export default AddNewTask