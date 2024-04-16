import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import CardComponent from '../../components/CardComponent'
import Container from '../../components/Container'
import RowComponent from '../../components/RowComponent'
import SectionComponent from '../../components/SectionComponent'
import TextComponent from '../../components/TextComponent'
import TitleComponent from '../../components/TitleComponent'
import { colors } from '../../constants/colors'
import { globalStyles } from '../../styles/globalStyles'

import { Add, Edit2, Element4, Notification, SearchNormal1 } from 'iconsax-react-native'
import AvatarGroup from '../../components/AvatarGroup'
import CardImageComponent from '../../components/CardImageComponent'
import CircularComponent from '../../components/CircularComponent'
import ProgressBarComponent from '../../components/ProgressBarComponent'
import SpaceComponent from '../../components/SpaceComponent'
import Tag from '../../components/TagComponent'
import { fontFamilies } from '../../constants/fontFamilies'




const HomeScreen = ( { navigation }: any ) =>
{
    return (
        <View style={{ flex: 1 }}>
            <Container>
                <SectionComponent>
                    <RowComponent justify='space-between'>
                        <Element4 size={24} color={colors.desc} />
                        <Notification size={24} color={colors.desc} />
                    </RowComponent>
                </SectionComponent>
                <SectionComponent>
                    <TextComponent text="Hi, Jason" />
                    <TitleComponent text="Be Productive today" />
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
                <SectionComponent>
                    <RowComponent styles={{ alignItems: 'flex-start' }}>
                        <View style={{ flex: 1 }}>
                            <CardImageComponent>
                                <TouchableOpacity onPress={() => { }} style={globalStyles.iconContainer}>
                                    <Edit2 size={20} color={colors.white}></Edit2>
                                </TouchableOpacity>
                                <TitleComponent text="UX Design" size={22} />
                                <TextComponent text="Task managements mobile app" size={13} />
                                <View style={{ marginVertical: 28 }}>
                                    <AvatarGroup />
                                    <ProgressBarComponent percent={80} color='#0AACFF' size='large' />
                                </View>
                                <TextComponent text="Due, 2024 March" size={13} />
                            </CardImageComponent>
                        </View>
                        <SpaceComponent width={16} />
                        <View style={{ flex: 1 }}>
                            <   CardImageComponent color='rgba(33,150,243,0.9)'>
                                <TouchableOpacity onPress={() => { }} style={globalStyles.iconContainer}>
                                    <Edit2 size={20} color={colors.white}></Edit2>
                                </TouchableOpacity>
                                <TitleComponent text="API Payment " />
                                <TextComponent text="Task managements mobile app" size={13} />
                                <AvatarGroup />
                                <ProgressBarComponent percent={40} color='#A2F068' size='medium' />
                            </CardImageComponent>
                            <SpaceComponent height={16} />
                            <CardImageComponent color='rgba(18,181,22,0.9)'>
                                <TouchableOpacity onPress={() => { }} style={globalStyles.iconContainer}>
                                    <Edit2 size={20} color={colors.white}></Edit2>
                                </TouchableOpacity>
                                <TitleComponent text="Update work" />
                                <TextComponent text="Revision home page" size={13} />
                            </CardImageComponent>
                        </View>
                    </RowComponent>
                </SectionComponent>
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