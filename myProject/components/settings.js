import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


class Settings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            id: '',
            token: ''
        }
    }
    

    render() {
        //add some error handling for email password and such.
        return (
            <View>
                <Text>Home page</Text>
                
            </View>
        );
    }
}
export default Settings;
