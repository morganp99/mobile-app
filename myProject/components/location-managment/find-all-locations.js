import React, { Component, useState } from 'react';
import { Text, TextInput, View, Button, Alert, FlatList, Stars } from 'react-native';
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
            this.state.string = this.props.route.params.string
            console.log('Look at me !')
            console.log('This is the string    ' + this.state.string)
        }
        catch (error) {
            console.log(error)
        }


        this.findLocations()
    }

    findLocations = async () => {
        try {
            let response = await fetch('http://10.0.2.2:3333/api/1.0.0/find'+
            '?q' + this.state.string +
            '?overall_rating' + this.state.overall_rating +
            '?price_rating' + this.state.price_rating +
            '?quality_rating' + this.state.quality_rating +
            '?clenliness_rating' + this.state.cleniness_rating,
            {
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
        const navigation = this.props.navigation;
        return (

            <View>
                <Text>Locations</Text>

                <FlatList
                    data={this.state.location_data}
                    renderItem={({ item }) => (
                        <View>
                            <Text>Name: {item.location_name}</Text>
                            <Text>Town: {item.location_town}</Text>
                            <Text>Quality Rating: {item.avg_quality_rating}</Text>
                            <Text>Price Rating: {item.avg_price_rating}</Text>
                            <Text>Quality Rating: {item.avg_quality_rating}</Text>
                            <Text>Clenliness Rating: {item.avg_clenliness_rating}</Text>
                            <Button
                                title="Add Review"
                                onPress={() => navigation.navigate('AddReviewToLocation',
                                {location_id : item.location_id})}
                            />
                            <Button
                                title="Get Reviews"
                                onPress={() => navigation.navigate('GetLocationReviews',
                                {location_id : item.location_id},
                                {location_data : this.state.location_data}
                                )}
                                //add location id and location data here 
                            />
                        
                        </View>
                    )}
                    keyExtractor={(item, index) => item.id}
                />

            </View>
        )
    }
}


export default FindLocations;


