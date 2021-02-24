import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            first_name: 'morhan',
            last_name: 'asasas',
            email: 'test@email.co.uk',
            password: 'test123',
            id: '',
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

        const to_send = { password: this.state.password,first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email };

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
                    return data
                })
                .then(async () => {

                    try {
                        await AsyncStorage.setItem('id', this.state.id.toString())
                    }
                    catch (dataError) {
                        console.error('error:', dataError);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
                console.log("Account Created.")
                //console.log(to_send)
            console.log(await AsyncStorage.getItem('id'))
            const navigation = this.props.navigation;
            navigation.navigate('Login')
        }
        catch (error) {
            console.log(error)
        }
    }
}
export default CreateUser;
