import React, { Component } from 'react';
import { Text, TextInput, View, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
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

    addUser = async () => {

        const to_send = { password: this.state.password, first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email };

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

            const navigation = this.props.navigation;
            navigation.navigate('Login')
        }
        catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <View>
                <ScrollView>

                    <Text styles={styles.title}>Create an Account</Text>

                    <View styles={styles.formItem}>
                        <Text styles={styles.formLabel}>First name</Text>
                        <TextInput styles={styles.formInput}
                            placeholder="Enter first name..."
                            onChangeText={(first_name) => this.setState({ first_name })}
                            value={this.state.first_name}
                        />
                    </View>

                    <View styles={styles.formItem}>
                        <Text styles={styles.formLabel} >Last name</Text>
                        <TextInput styles={styles.formInput}
                            placeholder="Enter last name..."
                            onChangeText={(last_name) => this.setState({ last_name })}
                            value={this.state.last_name}
                        />
                    </View>

                    <View styles={styles.formItem}>
                        <Text styles={styles.formLabel}>Email</Text>
                        <TextInput styles={styles.formInput}
                            placeholder="Enter email..."
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email}
                        />
                    </View>

                    <View styles={styles.formItem}>
                        <Text styles={styles.formLabel}>Password</Text>
                        <TextInput styles={styles.formInput}
                            placeholder="Enter password..."
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.password}
                        />
                    </View>

                    <View styles={styles.formItem}>

    

                        <Button
                            title="Sign Up!"
                            onPress={() => this.addUser()}
                        />
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'black',
        backgroundColor: 'lightgray',
        padding: 10,
        fontSize: 50
    },
    formItem: {
        padding: 20
    },
    formLabel: {
        fontSize: 15,
        color: 'black'
    },
    formInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5
    },
    formTouch: {
        padding: 10,
        alignItems: 'center'
    },
    formTouchText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    }



})

export default CreateUser;


