import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useState, useEffect } from 'react'
import SearchScreen from '../screens/SearchScreen'
import HomeScreen from '../screens/homes/HomeScreen'
import AddNewTask from '../screens/tasks/AddNewTask'
import LoginScreen from '../screens/auth/LoginScreen'
import auth from '@react-native-firebase/auth'
import SignupScreen from '../screens/auth/SignupScreen'


const Router = () =>
{
    const [ isLogin, setIsLogin ] = useState( false );
    useEffect( () =>
    {
        auth().onAuthStateChanged( ( user ) =>
        {
            if ( user )
            {
                setIsLogin( true );
            }
            else
            {
                setIsLogin( false );
            }
        } );
    }, [] );
    const Stack = createNativeStackNavigator();
    const MainRouter = (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AddNewTask" component={AddNewTask} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
        </Stack.Navigator>

    );
    const AuthRouter = (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
        </Stack.Navigator>
    );
    return isLogin ? MainRouter : AuthRouter;
    //return MainRouter;

}

export default Router