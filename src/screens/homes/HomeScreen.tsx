import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native'

import CardComponent from '../../components/CardComponent'
import Container from '../../components/Container'
import RowComponent from '../../components/RowComponent'
import SectionComponent from '../../components/SectionComponent'
import TextComponent from '../../components/TextComponent'
import TitleComponent from '../../components/TitleComponent'
import { colors } from '../../constants/colors'
import { globalStyles } from '../../styles/globalStyles'

import { Add, Edit2, Element4, Logout, Notification, SearchNormal1 } from 'iconsax-react-native'
import AvatarGroup from '../../components/AvatarGroup'
import CardImageComponent from '../../components/CardImageComponent'
import CircularComponent from '../../components/CircularComponent'
import ProgressBarComponent from '../../components/ProgressBarComponent'
import SpaceComponent from '../../components/SpaceComponent'
import Tag from '../../components/TagComponent'
import { fontFamilies } from '../../constants/fontFamilies'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { TaskModel } from '../../models/TaskModel'




const HomeScreen = ( { navigation }: any ) =>
{
    const user = auth().currentUser;

    const [ isLoading, setIsLoading ] = useState( false );
    const [ tasks, setTasks ] = useState<TaskModel[]>( [] );
    useEffect( () =>
    {
        getNewTasks();
    }, [] );
    const getNewTasks = async () =>
    {
        setIsLoading( true );
        await firestore().collection( 'tasks' ).orderBy( 'dueDate' ).limitToLast( 3 ).onSnapshot( ( snap ) =>
        {
            if ( snap.empty )
            {
                console.log( 'Tasks data not found' );
            }
            else
            {
                const items: TaskModel[] = [];
                snap.forEach( ( item: any ) => items.push( {
                    id: item.id,
                    ...item.data()
                } ) );
                setIsLoading( false );
                setTasks( items );
            }
        } );
    }
    return (
        <View style={{ flex: 1 }}>
            <Container isScroll>
                <SectionComponent>
                    <RowComponent justify='space-between'>
                        <Element4 size={24} color={colors.desc} />
                        <Notification size={24} color={colors.desc} />
                    </RowComponent>
                </SectionComponent>
                <SectionComponent>
                    <RowComponent>
                        <View style={{ flex: 1 }}>
                            <TextComponent text={`Hi, ${ user?.email }`} />
                            <TitleComponent text="Be Productive today" />
                        </View>
                        <TouchableOpacity onPress={async () => auth().signOut()}>
                            <Logout size={24} color={colors.desc} />
                        </TouchableOpacity>
                    </RowComponent>

                </SectionComponent>
                <SectionComponent>
                    <RowComponent
                        styles={[ globalStyles.inputContainer ]}
                        onPress={() => navigation.navigate( 'SearchScreen' )}>
                        <TextComponent color='#696B6F' text="Search task" />
                        <SearchNormal1 size={24} color={colors.desc} />
                    </RowComponent>
                </SectionComponent>
                <SectionComponent>
                    <CardComponent>
                        <RowComponent>
                            <View style={{ flex: 1 }}>
                                <TitleComponent text="Task Progress" font={fontFamilies.bold} />
                                <TextComponent text="30/40 tasks done" />
                                <SpaceComponent height={12} />
                                <RowComponent justify='flex-start'>
                                    <Tag text="March 22" onPress={() => console.log( 'Say hello' )} />
                                </RowComponent>
                            </View>
                            <View>
                                <CircularComponent value={80} />
                            </View>
                        </RowComponent>
                    </CardComponent>
                </SectionComponent>
                {
                    isLoading ? <ActivityIndicator /> : tasks.length > 0 ? <SectionComponent>
                        <RowComponent styles={{ alignItems: 'flex-start' }}>
                            <View style={{ flex: 1 }}>
                                <CardImageComponent>
                                    <TouchableOpacity onPress={() => { }} style={globalStyles.iconContainer}>
                                        <Edit2 size={20} color={colors.white}></Edit2>
                                    </TouchableOpacity>
                                    <TitleComponent text={tasks[ 0 ].title} size={22} />
                                    <TextComponent text={tasks[ 0 ].description} size={13} />
                                    <View style={{ marginVertical: 28 }}>
                                        <AvatarGroup uids={tasks[ 0 ].uids} />
                                        {tasks[ 0 ].progress && <ProgressBarComponent percent={parseInt( tasks[ 0 ].progress )} color='#0AACFF' size='large' />}
                                        {/* <ProgressBarComponent percent={80} color='#0AACFF' size='large' /> */}
                                    </View>
                                    <TextComponent text={`Due: ${ new Date( tasks[ 0 ].dueDate.toDate() ) }`} size={13} />
                                </CardImageComponent>
                            </View>
                            <SpaceComponent width={16} />
                            <View style={{ flex: 1 }}>
                                {tasks[ 1 ] && (
                                    <CardImageComponent color='rgba(33,150,243,0.9)'>
                                        <TouchableOpacity onPress={() => { }} style={globalStyles.iconContainer}>
                                            <Edit2 size={20} color={colors.white}></Edit2>
                                        </TouchableOpacity>
                                        <TitleComponent text={tasks[ 1 ].title} />
                                        {tasks[ 1 ].uids && <AvatarGroup uids={tasks[ 1 ].uids} />}
                                        {tasks[ 1 ].progress && <ProgressBarComponent percent={parseInt( tasks[ 1 ].progress )} color='#A2F068' size='medium' />}
                                    </CardImageComponent> )}

                                <SpaceComponent height={16} />
                                {tasks[ 2 ] && (
                                    <CardImageComponent color='rgba(18,181,22,0.9)'>
                                        <TouchableOpacity onPress={() => { }} style={globalStyles.iconContainer}>
                                            <Edit2 size={20} color={colors.white}></Edit2>
                                        </TouchableOpacity>
                                        <TitleComponent text={tasks[ 2 ].title} />
                                        <TextComponent text={tasks[ 2 ].description} size={13} />
                                    </CardImageComponent>
                                )}

                            </View>
                        </RowComponent>
                    </SectionComponent> : <></>
                }

                <SectionComponent>
                    <TitleComponent text="Urgent tasks" font={fontFamilies.bold} />
                    <SpaceComponent height={12} />
                    <CardComponent>
                        <RowComponent>
                            <CircularComponent value={40} radius={40} />
                            <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 12 }}>
                                <TextComponent text="Title of task" />
                            </View>

                        </RowComponent>
                    </CardComponent>
                </SectionComponent>
            </Container >
            <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 20,
                alignContent: 'center',
                alignItems: 'center',
            }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate( 'AddNewTask' )}
                    activeOpacity={1}
                    style={[ globalStyles.row,
                    {
                        backgroundColor: '#3168E0',
                        padding: 10,
                        borderRadius: 100,
                        width: '80%'
                    } ]}>
                    <TextComponent text="Add new task" flex={0} />
                    <Add size={24} color={colors.white} />
                </TouchableOpacity>
            </View>
        </View>

    );
};

export default HomeScreen

const styles = StyleSheet.create( {} )