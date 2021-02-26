import React, { Component, useEffect, useState } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UpdateUserDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {

            org_first_name: '',
            org_last_name: '',
            org_email: '',
            org_first_name: '',

            first_name: '',
            last_name: '',
            email: '',
            password: '',
            id: '',
            token: ''
        }
    }

    componentDidMount() {
        this.getData()
    }


    getData = async () => {
        try {
            this.setState({ 'id': await AsyncStorage.getItem('id'), 'token': await AsyncStorage.getItem('token') })
        }
        catch (error) {
            console.log(error)
        }
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
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    console.log('Success:', data);
                    this.setState({ org_first_name: data.first_name })
                    this.setState({ org_last_name: data.last_name })
                    this.setState({ org_email: data.email })
                    return data
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        catch (error) {
            console.log(error)
        }
    }

    validateInput() {

        if ((this.state.password.length)>6) {
            this.validateUserDetails()
        }
        else{
            Alert.alert("Password is too short")
        }
    }
    validateUserDetails() {

        let first_name_changed = false;
        let last_name_changed = false;
        let email_changed = false;

        let to_send = {};
        if (this.state.first_name != this.state.org_first_name) {

            to_send['first_name'] = this.state.first_name;
            first_name_changed = true;
        }
        if (this.state.last_name != this.state.org_last_name) {
            to_send['last_name'] = this.state.last_name;
            last_name_changed = true;
        }
        if (this.state.first_name != this.state.org_email) {
            to_send['email'] = this.state.email;
            email_changed = true;
        }
        if (first_name_changed === true && last_name_changed === true && email_changed === true) {
            console.log('SENDING')
            this.updateUserDetails(to_send)

        }
        else {
            Alert.alert('Details dont differ, try again')

        }
    }

    updateUserDetails = async (to_send) => {

        try {
            let response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.state.id, {
                method: 'PATCH',
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
                    this.setState({ token: data.token })
                    return data
                })
                .then(async () => {

                    try {
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
            const navigation = this.props.navigation;
            navigation.navigate('Profile')
        }
        catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder="Update first name..."
                    onChangeText={(first_name) => this.setState({ first_name })}
                    value={this.state.first_name}
                />
                <TextInput
                    placeholder=" last name..."
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
                    title="Update details"
                    onPress={() => this.validateInput()}
                />
            </View>
        );
    }
}
export default UpdateUserDetails;
