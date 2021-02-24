import React, { Component } from 'react';
import { Text, TextInput, View, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: 'morgan.williams@mmu.ac.uk',
            password: 'heyheyhey',
            id: '',
            token: ''
        }
    }

    handleEmailInput = (email) => {
        //add validation
        this.setState({ email: email })
    }

    handlePasswordInput = (pass) => {
        //add validation e.g. min length, special char, capital letter, numbers
        this.setState({ password: pass })
    }

    render() {
        return (
            <View>
                <TextInput placeholder="email..." onChangeText={this.handleEmailInput} value={this.state.email} />
                <TextInput placeholder="password..." onChangeText={this.handlePasswordInput} value={this.state.password} />
                <Button
                    title="Login"
                    onPress={() => this.loginUser()}
                />
            </View>

        );
    }

    loginUser = async () => {
        const to_send = { email: 'morgan.williams@mmu.ac.uk', password: 'heyheyhey' };
        try {
            let response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
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
            // console.log(await AsyncStorage.getItem('id'))
            // console.log(await AsyncStorage.getItem('token'))
        }
        catch(error) {
            console.log(error)
        }
    }
}
export default Login;
