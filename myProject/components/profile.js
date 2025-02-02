import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationHelpersContext } from '@react-navigation/native';
import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';


class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            id: '',
            token: ''
        }
    }

    componentDidMount = async () => {
        this.getData()
    }
    

    getData = async () => {
        try {
            this.setState({ 'id': await AsyncStorage.getItem('id'), 'token': await AsyncStorage.getItem('token') })
        }
        catch (error) {
            console.log(error)
        }
        console.log('Users id ' + this.state.id + ' users token ' + this.state.token)
    }


    render() {
        const navigation = this.props.navigation;
        //add logout button here aswell.
        return (
            <View style = {styles.flexContainer}>
                <Button style = {styles.buttonStyle}
                    title="Update Details"
                    onPress={() => navigation.navigate('UpdateUserDetails')}
                />
                <Button
                    title="Logout"
                    onPress={() => this.logOutUser()}
                />
                <Button
                    title="User Details"
                    onPress={() => navigation.navigate('GetUserDetails')}
                />
 
            </View>
        );
    }
    logOutUser() {

        fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': this.state.token
                },
            })
                .catch((error) => {
                    console.error('Error:', error);
                });
            const navigation = this.props.navigation;
            navigation.navigate('Login')
        }

}
export default Profile;

const styles = StyleSheet.create({
    
    flexContainer: {
        flex: 1,
        backgroundColor: 'aliceblue'
    },
    title: {
        color: 'black',
        padding: 10,
        fontSize: 25
    },
    outputTitleText: {
        fontSize: 20
    },
    outputText:{
        fontSize: 18
    },
    outline : {
        borderWidth: 2,
        borderColor: 'cornflowerblue'
    },
    buttonStyle :{
        backgroundColor: 'black'
    }
})