import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';


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
    

    render() {
        const navigation = this.props.navigation;
        //add logout button here aswell.
        return (
            <View>
                <Text>Profile</Text>
                <Button
                    title="Update Details"
                    onPress={() => navigation.navigate('UpdateUserDetails')}
                />
            </View>
        );
    }
}
export default Profile;
