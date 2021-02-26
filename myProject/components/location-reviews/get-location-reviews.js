

import React, { Component } from 'react';
import { Text, TextInput, View, Button, Stars, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationHelpersContext } from '@react-navigation/native';


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
            let response = await fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id,

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
                    //console.log('This is the state ' + JSON.stringify(this.state.location_data))
                    //console.log('This is the review body ' + JSON.stringify(this.state.location_data.location_reviews))
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
        console.log("this is location id " + location_id)
        console.log("this is review id " + review_id)

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

    updateReview(location_id, review_id) {
        console.log("this is location id " + location_id)
        console.log("this is review id " + review_id)

        fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id, {
            method: 'PATCH',
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

    likeReview(location_id, review_id) {
        fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id + '/like', {
            method: 'POST',
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

    dislikeReview(location_id, review_id) {
        console.log('LOcation and review ID _----------------'+location_id + review_id)
        fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id + '/like', {
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
                <Text>GET LOACTION REVIEW</Text>
                <Text>Name: {this.state.location_data.location_name}</Text>
                <Text>location ID {this.state.location_data.location_id}</Text>



                <FlatList
                    data={this.state.location_data.location_reviews}
                    renderItem={({ item }) => (
                        <View>
                            <Text>Review {item.review_body}</Text>
                            <Text>Review Id {item.review_id}</Text>


                            {/* <View>
                                <Text>Overall Rating</Text>
                                <Stars
                                    half={true}
                                    default={this.state.overall_rating}
                                    update={(val) => this.setState({ overall_rating: val })}
                                />
                            </View>

                            <View>
                                <Text>Price Rating</Text>
                                <Stars
                                    half={true}
                                    default={this.state.price_rating}
                                    update={(val) => this.setState({ price_rating: val })}
                                />
                            </View>

                            <View>
                                <Text>Quality Rating</Text>
                                <Stars
                                    half={true}
                                    default={this.state.quality_rating}
                                    update={(val) => this.setState({ quality_rating: val })}
                                />
                            </View>

                            <View>
                                <Text>Clenliness rating</Text>
                                <Stars
                                    half={true}
                                    default={this.state.clenliness_rating}
                                    update={(val) => this.setState({ clenliness_rating: val })}
                                />
                            </View> */}

                            <Button
                                title="Edit Review"
                                onPress={() => navigation.navigate('UpdateLocationReview')}
                            //send name review body and all 4 ratings

                            />
                            <Button
                                title="Like Review"
                                onPress={() => this.likeReview(this.state.location_data.location_id, item.review_id)}
                            //send name review body and all 4 ratings

                            />
                            <Text>change location id to be passed in with param not state</Text>
                            <Button
                                title="Dislike Review"
                                onPress={() => this.dislikeReview(this.state.location_data.location_id, item.review_id)}
                            //send name review body and all 4 ratings

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


