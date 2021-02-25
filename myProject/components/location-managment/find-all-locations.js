

import React, { Component, useState } from 'react';
import { Text, TextInput, View, Button, Alert, FlatList, List } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class FindLocations extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location_data: null,
            token: '',
            loading: true,

            //props recived from search
            // clenliness_rating: '',
            // overall_rating: '',
            // price_rating: '',
            // quality_rating: '',
            // latitude: 0,
            // location_id: '',
            // location_name: '',
            // location_reviews: [],
            // location_town: '',
            // longitude: '',
            // photo_path: '',

            //props used to searcg
            // string: '',
            // input_overall_rating: '',
            // input_price_rating: '',
            // input_quality_rating: '',
            // input_cleniness_rating: '',
            // search_in: '',
            // limit: 0,
            // offset: 0,
        }
    }

    componentDidMount = async () => {
        try {
            this.setState({ 'token': await AsyncStorage.getItem('token') })
        }
        catch (error) {
            console.log(error)
        }
        this.findLocations()
    }

    findLocations = async () => {
        try {
            let response = await fetch('http://10.0.2.2:3333/api/1.0.0/find', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': this.state.token
                },
            })
                .then(responseData => {
                    this.setState({
                        loading: false
                    })
                    return responseData.json();
                })
                .then(responseData => {
                    this.setState({
                        location_data: responseData
                    })
                    console.log('This is the state ' + JSON.stringify(this.state.location_data))
                })
                .catch((error) => {

                    console.error('Error:', error);
                });
        }
        catch (error) {
            console.log(error)
        }

    }
    render() {
        return (

            <View>
                <Text>Locations</Text>

                <FlatList
                    data={this.state.location_data}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{item.location_name}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => item.id}
                />

            </View>
        )
    }
}


export default FindLocations;