import React, { useEffect, useState } from 'react'
import { Button, Text, View } from 'react-native'
import Container from '../../components/Container'
import SectionComponent from '../../components/SectionComponent'
import TextComponent from '../../components/TextComponent'
import TitleComponent from '../../components/TitleComponent'
import { fontFamilies } from '../../constants/fontFamilies'
import InputComponent from '../../components/InputComponent'
import { Sms } from 'iconsax-react-native'
import { colors } from '../../constants/colors'
import ButtonComponent from '../../components/ButtonComponent'
import SpaceComponent from '../../components/SpaceComponent'
import { globalStyles } from '../../styles/globalStyles'
import auth from '@react-native-firebase/auth'

const SigninScreen = ( { navigation }: any ) =>
{
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ isLoading, setIsLoading ] = useState( false );
    const [ errorText, setErrorText ] = useState( '' );
    useEffect( () =>
    {
        if ( email || password )
        {
            setErrorText( '' );
        }
    }, [ email, password ] );
    const handleSignupWithEmail = async () =>
    {
        if ( !email || !password )
        {
            return setErrorText( 'Email and password are required' )
        }
        else
        {
            setErrorText( '' );
            setIsLoading( true );
            await auth().createUserWithEmailAndPassword( email, password )
                .then( userCredential =>
                {
                    const user = userCredential.user;
                    //save user to firestore
                    setIsLoading( false );
                } )
                .catch( ( error: any ) =>
                {
                    setIsLoading( false );
                    setErrorText( error.message );
                } )
        }
    }
    return (
        <Container>
            <SectionComponent styles={{
                justifyContent: 'center',
            }}>
                <TitleComponent
                    text="Login"
                    size={32}
                    font={fontFamilies.bold}
                    styles={{ textTransform: 'uppercase', flex: 0, textAlign: 'center' }}
                />
                <View style={{ marginVertical: 20, }}>
                    <InputComponent
                        value={email}
                        onChange={val => setEmail( val )}
                        placeholder="Email"
                        title="Email"
                        prefix={<Sms size={20} color={colors.desc} />}
                        allowClear

                    />
                    <InputComponent
                        value={password}
                        onChange={val => setPassword( val )}
                        placeholder="Password"
                        title="Password"
                        isPassword
                        prefix={<Sms size={20} color={colors.desc} />}
                    />
                    {errorText && (
                        <TextComponent text={errorText} color='coral' size={14} flex={0} />
                    )}
                </View>

                <ButtonComponent isLoading={isLoading} text="Sign Up" onPress={handleSignupWithEmail} />
                <SpaceComponent height={20} />
                <Text style={[ globalStyles.text, { textAlign: 'center' } ]}>
                    Already have an account? {' '}
                    <Text
                        onPress={() => navigation.navigate( 'LoginScreen' )}
                        style={{ color: 'coral' }}>Login</Text>
                </Text>
            </SectionComponent>
        </Container>
    )
}

export default SigninScreen