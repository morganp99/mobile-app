

import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class GetUserDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            id: '',
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
        this.getUserData();
    }
    render() {
        // const navigation = this.props.navigation;
        return (
            <View>
                <Text>Name</Text>
                <Text>{this.state.first_name}</Text>

                <Text>Last Name</Text>
                <Text>{this.state.last_name}</Text>

                <Text>Email</Text>
                <Text>{this.state.email}</Text>
            </View>
        );
    }

    getUserData = async () => {
        try {
            let response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.state.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': this.state.token
                },
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    console.log('Success:', data);
                    this.setState({ first_name: data.first_name })
                    this.setState({ last_name: data.last_name })
                    this.setState({ email: data.email })

                    return data
                })
                .then(async () => {

                    try {
                        await AsyncStorage.setItem('first_name', this.state.first_name.toString())
                        await AsyncStorage.setItem('last_name', this.state.last_name.toString())
                        await AsyncStorage.setItem('email', this.state.email.toString())
                    }
                    catch (dataError) {
                        console.error('error:', dataError);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            console.log(await AsyncStorage.getItem('first_name'))
            console.log(await AsyncStorage.getItem('last_name'))
            console.log(await AsyncStorage.getItem('email'))
        }
        catch (error) {
            console.log(error)
        }
    }

}
export default GetUserDetails;
