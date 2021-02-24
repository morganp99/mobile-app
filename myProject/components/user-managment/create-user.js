import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "morgan@hotmail",
            password: "password123",
            first_name: "morgan",
            last_name: "porchy",
            id: '',
            token: ''
        }
    }


    render() {
        //add some error handling for email password and such.
        return (
            <View>
                <Text>First name</Text>
                <TextInput
                    placeholder="Enter first name..."
                    onChangeText={(first_name) => this.setState({ first_name })}
                    value={this.state.first_name}
                />
                <Text>Last name</Text>

                <TextInput
                    placeholder="Enter last name..."
                    onChangeText={(last_name) => this.setState({ last_name })}
                    value={this.state.last_name}
                />
                <Text>Email</Text>

                <TextInput
                    placeholder="Enter email..."
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                />
                <Text>Password</Text>

                <TextInput
                    placeholder="Enter password..."
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                />
                <Button
                    title="Create account"
                    onPress={() => this.addUser()}
                />
            </View>
        );
    }


    addUser = async () => {

        const to_send = { first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email, password: this.state.password };

        try {
            let response = await fetch('http://10.0.2.2:3333/api/1.0.0/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
                console.log("User Logged in")
            console.log(await AsyncStorage.getItem('id'))
            console.log(await AsyncStorage.getItem('token'))
            const navigation = this.props.navigation;
            navigation.navigate('AppNavigation')
        }
        catch (error) {
            console.log(error)
        }
    }
}
export default CreateUser;
