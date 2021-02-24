

import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/user-managment/login-user';
import CreateUser from './components/user-managment/create-user';
import UpdateUserDetails from './components/user-managment/update-user-details';
import Home from './components/home';

const Stack = createStackNavigator();

class App extends Component {
    render() {
        return (

            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="CreateUser" component={CreateUser} options={{title: "Create Account"}} />
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Update Details" component={UpdateUserDetails} /> 
                </Stack.Navigator>
            </NavigationContainer>

        );
    }
}

export default App;


