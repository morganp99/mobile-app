import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationHelpersContext } from '@react-navigation/native';
import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';

//import LogOutUser from './user-managment/logout-user'

class Profile extends Component {

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

    componentDidMount = async () => {
        try {
            this.setState({ 'id': await AsyncStorage.getItem('id'), 'token': await AsyncStorage.getItem('token') })
        }
        catch (error) {
            console.log(error)
        }
        console.log('Users id ' + this.state.id + ' users token ' + this.state.token)
    }

    render() {
        const navigation = this.props.navigation;
        //add logout button here aswell.
        return (
            <View>
                <Text>Profile</Text>
                <Button
                    title="Update Details"
                    onPress={() => navigation.navigate('UpdateUserDetails')}
                />
                <Button
                    title="Logout"
                    onPress={() => this.logOutUser()}
                />
            </View>
        );
    }
    logOutUser() {

        fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', {
                method: 'POST',
                headers: {
                    'X-Authorization': this.state.token
                },
            })
                .catch((error) => {
                    console.error('Error:', error);
                });
            const navigation = this.props.navigation;
            navigation.navigate('Login')
        }

}
export default Profile;
