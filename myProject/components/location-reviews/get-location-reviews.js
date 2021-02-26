

import React, { Component } from 'react';
import { Text, TextInput, View, Button, Stars, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class GetLocationReviews extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location_data: [],
            location_id: 1,
            overall_rating: 0,
            price_rating: 0,
            quality_rating: 0,
            clenliness_rating: 0,
            review_body: "Great coffee, but the bathrooms stank!",
            token: ''
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
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
            let response = await fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id +

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
                    console.log('This is the review body ' + JSON.stringify(this.state.location_data.location_reviews))
                })
                .catch((error) => {

                    console.error('Error:', error);
                });
        }
        catch (error) {
            console.log(error)
        }
        this.render()
    }
     deleteReview(location_id, review_id) {
        console.log("this is location id "+location_id)
        console.log("this is review id "+review_id)
        
        fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.state.token
            },
        })
            .catch((error) => {
                console.error('Error:', error);
            });
        this.getData()
    }


    render() {
        const navigation = this.props.navigation;
        return (

            <View>
                <Text>Reviews</Text>
                <Text>Name: {this.state.location_data.location_name}</Text>
                <Text>location ID {this.state.location_data.location_id}</Text>



                <FlatList
                    data={this.state.location_data.location_reviews}
                    renderItem={({ item }) => (
                        <View>
                            <Text>Review {item.review_body}</Text>
                            <Text>Review Id {item.review_id}</Text>

                            {/* <Text>Review{item.review_body}</Text>
                            <Text>Town: {item.location_town}</Text>
                            <Text>Quality Rating: {item.avg_quality_rating}</Text>
                            <Text>Price Rating: {item.avg_price_rating}</Text>
                            <Text>Quality Rating: {item.avg_quality_rating}</Text>
                            <Text>Clenliness Rating: {item.avg_clenliness_rating}</Text> */}
                            <Button
                                title="Delete Review"
                                onPress={() => this.deleteReview(this.state.location_data.location_id, item.review_id)}
                            />
                        </View>
                    )}
                    keyExtractor={(item, index) => item.id}
                />

            </View>
        )
    }
}
export default GetLocationReviews;

