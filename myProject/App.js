import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/user-managment/login-user';
import CreateUser from './components/user-managment/create-user';

const Stack = createStackNavigator();

function App() {
    return (

        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Sign Up!" component={CreateUser} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;

