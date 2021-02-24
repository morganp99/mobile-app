// import React, { Component } from 'react';
// import { Text, TextInput, View, Button, Alert } from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createStackNavigator } from '@react-navigation/stack';

// import Home from '../home';
// import CredentialValidation from './validation/validate-user-credentials'

// const Stack = createStackNavigator();

// class Login extends Component() {

//     constructor(props) {
//         super(props);

//         this.state = {
//             email: '',
//             password: '',
//             isEmailValid: false,
//             isPasswordValid: false,
//             id: '',
//             token: ''
//         }
//     }

//     handleEmailInput = () => {


//         if (CredentialValidation.ValidateEmail(email)) {
//             this.setState({ email: email })
//             this.setState({ isEmailValid: true })
//         } else {
//             //This is not valid email so make them re enter.
//         }

//     }

//     handlePasswordInput = () => {
//         //add validation e.g. min length, special char, capital letter, numbers


//         if (CredentialValidation.ValidatePassword(password)) {
//             this.setState({ password: password })
//             this.setState({ isPasswordValid: true })
//         } else {
//             //This is not valid email so make them re enter.
//         }
//     }

//     render() {
//         return (
//             <View>
//                 <Text></Text>
//                 <TextInput
//                     placeholder="Enter email..."
//                     onChangeText={(email) => this.setState({ email })}
//                     value={this.state.email}
//                 />

//                 <TextInput
//                     placeholder="Enter password..."
//                     onChangeText={(password) => this.setState({ password })}
//                     value={this.state.password}
//                 />
//                 <Button
//                     title="Login"
//                     onPress={() => this.addUser()}
//                 />
//             </View>

//         );
//     }

    // addUser = async () => {

    //     const to_send = { email: this.state.email, password: this.state.password };

    //     try {
    //         let response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(to_send),
    //         })
    //             .then(response => {
    //                 return response.json()
    //             })
    //             .then(data => {
    //                 console.log('Success:', data);
    //                 this.setState({ id: data.id })
    //                 this.setState({ token: data.token })
    //                 return data
    //             })
    //             .then(async () => {

    //                 try {
    //                     await AsyncStorage.setItem('id', this.state.id.toString())
    //                     await AsyncStorage.setItem('token', this.state.token.toString())
    //                 }
    //                 catch (dataError) {
    //                     console.error('error:', dataError);
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.error('Error:', error);
    //             });
    //         console.log(await AsyncStorage.getItem('id'))
    //         console.log(await AsyncStorage.getItem('token'))
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    //     //navigation.navigate('Home')

    // }

// }

// export default Login;

import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class Login extends Component {

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

        var navigation = this.props.navigation;
        //add some error handling for email password and such.
        return (
            <View>
                
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
        }
        catch (error) {
            console.log(error)
        }

    }
}
export default Login;