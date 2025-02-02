

import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class DeleteLocationReview extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location_id: 1,
            rev_id:7,
            token: ''
        }
    }

    componentDidMount = async () => {
        try {
            this.setState({ 'token': await AsyncStorage.getItem('token') })
        }
        catch (error) {
            console.log(error)
        }
    }


    //display review aswell 
    render() {
        const navigation = this.props.navigation;
        return (
            <View>
                <Button
                    title="Delete review"
                    onPress={() => this.deletReview()}
                />
            </View>
        );
    }


    deletReview = async () => {


        try {
            let response = await fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id + '/review/'+this.state.rev_id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': this.state.token
                },
            })
                .then(response => {
                    return response.json()
                })
                .catch((error) => {
                    //console.error('Error:', error);
                });
                //go back 
            // const navigation = this.props.navigation;
            // navigation.navigate('HomeNavigation')

        }
        catch (error) {
            console.log(error)
        }

    }
}
export default DeleteLocationReview;
