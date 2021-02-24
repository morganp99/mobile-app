import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: 'morgan.williams@mmu.ac.uk',
            password: 'heyheyhey',
            first_name: 'Morgan',
            last_name: 'Porch',
            id: '',
            token: ''
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
                    onPress={() => this.addUser()}
                />
            </View>
        );
    }


    addUser = async () => {

        const to_send = { first_name :'Morganp', last_name:'Porcpph', email: 'morganp.williams@mmu.ac.uk', password: 'heyheyheeyy'};

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
            console.log(await AsyncStorage.getItem('id'))
            console.log(await AsyncStorage.getItem('token'))
        }
        catch (error) {
            console.log(error)
        }
    }
}
export default CreateUser;
