import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UodateUserDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
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
        console.log('Users id ' + this.state.id + 'users token ' + this.state.token)
        this.getUserData()
    }

    getUserData = async () => {
        try {
            let response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.state.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': this.state.token
                },
                body: JSON.stringify(to_send),
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    console.log('Success:', data);
                    this.setState({ id: data.id })
                    this.setState({ token: data.token })
                    this.setState({ first_name: data.first_name })
                    this.setState({ last_name: data.last_name })
                    this.setState({ email: data.email })
                    this.setState({ password: data.password })

                    return data
                })
                .then(async () => {

                    try {
                        await AsyncStorage.setItem('id', this.state.id.toString())
                        await AsyncStorage.setItem('token', this.state.token.toString())
                        await AsyncStorage.setItem('first_name', this.state.first_name.toString())
                        await AsyncStorage.setItem('last_name', this.state.last_name.toString())
                        await AsyncStorage.setItem('email', this.state.email.toString())
                        await AsyncStorage.setItem('password', this.state.password.toString())

                    }
                    catch (dataError) {
                        console.error('error:', dataError);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            console.log(await AsyncStorage.getItem('id'))
            console.log(await AsyncStorage.getItem('token'))
            console.log(await AsyncStorage.getItem('first_name'))
            console.log(await AsyncStorage.getItem('last_name'))
            console.log(await AsyncStorage.getItem('email'))
            console.log(await AsyncStorage.getItem('password'))
        }
        catch (error) {
            console.log(error)
        }
    }

    render() {
        //add some error handling for email password and such.
        return (
            <View>
                <TextInput
                    placeholder="Enter first name..."
                    onChangeText={(first_name) => this.setState({ first_name })}
                    value={this.state.first_name}
                />
                <TextInput
                    placeholder="Enter last name..."
                    onChangeText={(last_name) => this.setState({ last_name })}
                    value={this.state.last_name}
                />
                <TextInput
                    placeholder="Enter email..."
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    placeholder="Enter password..."
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                />
                <Button
                    title="Create account"
                    onPress={() => this.updateUserDetails()}
                />
            </View>
        );
    }


    updateUserDetails = async () => {

        const to_send = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        };

        try {
            let response = await fetch('http://10.0.2.2:3333/api/1.0.0/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': this.state.token
                },
                body: JSON.stringify(to_send),
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    console.log('Success:', data);
                    this.setState({ id: data.id })
                    this.setState({ token: data.token })
                    return data
                })
                .then(async () => {

                    try {
                        await AsyncStorage.setItem('id', this.state.id.toString())
                        await AsyncStorage.setItem('token', this.state.token.toString())
                    }
                    catch (dataError) {
                        console.error('error:', dataError);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            console.log(await AsyncStorage.getItem('id'))
            console.log(await AsyncStorage.getItem('token'))
        }
        catch (error) {
            console.log(error)
        }
    }
}
export default UodateUserDetails;
