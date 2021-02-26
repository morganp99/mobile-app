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
            <View style={styles.flexContainer}>
                <ScrollView>

                    <Text style={styles.title}>Create an Account</Text>

                    <View style={styles.formItem}>
                        <Text style={styles.formLabel}>First name</Text>
                        <TextInput style={styles.formInput}
                            placeholder="Enter first name..."
                            onChangeText={(first_name) => this.setState({ first_name })}
                            value={this.state.first_name}
                        />
                    </View>

                    <View style={styles.formItem}>
                        <Text style={styles.formLabel} >Last name</Text>
                        <TextInput style={styles.formInput}
                            placeholder="Enter last name..."
                            onChangeText={(last_name) => this.setState({ last_name })}
                            value={this.state.last_name}
                        />
                    </View>

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


export default CreateUser;

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
