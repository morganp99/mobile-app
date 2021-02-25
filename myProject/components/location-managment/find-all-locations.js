

import React, { Component, useState } from 'react';
import { Text, TextInput, View, Button, Alert, FlatList, List } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class FindLocations extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [{}],
            token: '',
            loading: true,

            //props recived from search
            clenliness_rating: '',
            overall_rating: '',
            price_rating: '',
            quality_rating: '',
            latitude: 0,
            location_id: '',
            location_name: '',
            location_reviews: [],
            location_town: '',
            longitude: '',
            photo_path: '',

            //props used to searcg
            string: '',
            input_overall_rating: '',
            input_price_rating: '',
            input_quality_rating: '',
            input_cleniness_rating: '',
            search_in: '',
            limit: 0,
            offset: 0,
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
                .then(response => {
                    return response.json()
                })
                .then(responseData => {
                    this.setState({ data: responseData })

                    //console.log(this.state.data)
                    return responseData
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
                <Text>Hey</Text>
                <List>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ locationDetails }) => (
                            <View>
                                <Text>{locationDetails.location_name}</Text>
                            </View>
                        )}
                        keyExtractor={(locationDetails, index) => locationDetails.location_id}
                    />
                </List>
            </View>
        )
    }
}


export default FindLocations;