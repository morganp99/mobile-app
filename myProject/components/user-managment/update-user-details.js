import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UpdateUserDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            first_name: 'morgan',
            last_name: 'porch',
            email: 'morgan.porch@cdl.co.uk',
            password: 'test123',
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
            let response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/'+this.state.id, {
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
}
export default UpdateUserDetails;
