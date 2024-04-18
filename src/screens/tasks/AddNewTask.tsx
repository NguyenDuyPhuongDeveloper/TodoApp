import React, { useState, useEffect } from 'react'
import { Button, View } from 'react-native'
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

const initValue: TaskModel = {
    title: '',
    description: '',
    dueDate: new Date(),
    start: new Date(),
    end: new Date(),
    uids: [],
    fileUrls: []
}


const AddNewTask = ( { navigation }: any ) =>
{
    const [ taskDetail, setTaskDetail ] = useState<TaskModel>( initValue );
    const [ userSelect, setUserSelect ] = useState<SelectModel[]>( [] );
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
        console.log( taskDetail )
    }
    return (
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
            </SectionComponent>
            <SectionComponent>
                <Button title="Save" onPress={handleAddNewTask} />
            </SectionComponent>

        </Container>
    )
}

export default AddNewTask