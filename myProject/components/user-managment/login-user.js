

import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: 'test@email.co.uk',
            password: 'test123',
            id: '',
            token: ''
        }
    }

    render() {
        const navigation = this.props.navigation;

        //add some error handling for email password and such.
        return (
            <View style ={styles.flexContainer}>

                <Text style = {styles.title}>Email</Text>

                <View style={styles.formItem}>
                        <Text style={styles.formLabel}>Email</Text>
                        <TextInput style={styles.formInput}
                            placeholder="Enter email..."
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email}
                        />
                    </View>

                    <View style={styles.formItem}>
                        <Text style={styles.formLabel}>Password</Text>
                        <TextInput style={styles.formInput}
                            placeholder="Enter password..."
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.password}
                        />
                    </View>
                <Button
                    title="Login"
                    onPress={() => this.loginUser()}
                />
                <Button
                    title="Sign Up!"
                    onPress={() => navigation.navigate('CreateUser')}
                />
            </View>
        );
    }


    loginUser = async () => {

        const to_send = { email: this.state.email, password: this.state.password };

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
                    //console.error('Error:', error);
                });
            console.log(await AsyncStorage.getItem('id'))
            console.log(await AsyncStorage.getItem('token'))
            const navigation = this.props.navigation;
            navigation.navigate('HomeNavigation')

        }
        catch (error) {
            console.log(error)
        }

    }
}
export default Login;

const styles = StyleSheet.create({
    
    flexContainer: {
        flex: 1,
        backgroundColor: 'sandybrown'
    },
    title: {
        color: 'black',
        padding: 10,
        fontSize: 25
    },
    formItem: {
        padding: 20
    },
    formLabel: {
        backgroundColor: 'sienna',
        fontSize: 20,
        color: 'black'
    },
    formInput: {
        borderWidth: 2,
        borderColor: 'sienna',
        borderRadius: 5
    },
})