

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
            review_body: "",
            token: ''
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        try {
            this.setState({ 'token': await AsyncStorage.getItem('token') })
            this.state.location_id = this.props.route.params.location_id

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

            <View style = {styles.flexContainer}>
                <Text style = {styles.title}>{this.state.location_data.location_name} Reviews</Text>
                <FlatList
                    data={this.state.location_data.location_reviews}
                    renderItem={({ item }) => (

                        <View style={styles.outline}>
                            
                            <Text style={styles.outputText}>Overall Rating: {item.overall_rating}</Text>
                            <Text style={styles.outputText}>Price Rating: {item.price_rating}</Text>
                            <Text style={styles.outputText}>Quality Rating: {item.quality_rating}</Text>
                            <Text style={styles.outputText}>Clenliness Rating: {item.clenliness_rating}</Text>
                            <Text style={styles.outputTitleText}>Review: {item.review_body}</Text>

                            <Button
                                title="Edit Review"
                                onPress={() => navigation.navigate('UpdateLocationReview',{
                                    location_name:this.state.location_data.location_name,
                                    quality_rating: item.quality_rating,
                                    price_rating: item.price_rating,
                                    clenliness_rating: item. clenliness_rating,
                                    overall_rating: item.overall_rating,
                                    review_body: item.review_body,
                                    review_id : item.review_id         
                                })}
                            />
                            <Button
                                title="Like Review"
                                onPress={() => this.likeReview(this.state.location_data.location_id, item.review_id)}
                            />
                            <Button
                                title="Dislike Review"
                                onPress={() => this.dislikeReview(this.state.location_data.location_id, item.review_id)}
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
    }
})

