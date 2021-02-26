

import React, { Component } from 'react';
import { Text, TextInput, View, Button, Stars, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class GetLocationReviews extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location_data: [],
            review_id: 2,
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

        console.log('This is the review and location ID ----------------------------'+location_id + review_id)
        const to_send = {
            overall_rating: this.state.overall_rating,
            price_rating: this.state.price_rating,
            quality_rating: this.state.quality_rating,
            clenliness_rating: this.state.clenliness_rating,
            review_body: this.state.review_body,
        }

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
        //navigate back 
    }






    render() {
        const navigation = this.props.navigation;
        return (

            <View>
                <Text>Update LOCATION Review</Text>
                <Text>Name: {this.state.location_data.location_name} add this to what ever gete passed in by name </Text>
                <Text>All 4 ratings in stars here, set them too what ever was passed in.</Text>
                <Text>All 4 ratings in stars here, set them too what ever was passed in.</Text>
                <Text>All 4 ratings in stars here, set them too what ever was passed in.</Text>
                <Text>All 4 ratings in stars here, set them too what ever was passed in.</Text>

                <TextInput styles={styles.formInput}
                    placeholder="Enter review..."
                    onChangeText={(review_body) => this.setState({ review_body })}
                    value={this.state.review_body}
                />
                <Button
                    title="Clear Review Body"
                    onPress={() => this.setState({review_body : ''})}
                />
                <Text>ADD LOCATION AND REVIEW ID TO UPDATE REVIEW</Text>
                <Button
                    title="Update Review"
                    onPress={() => this.updateReview()}
                />
            </View>
        )
    }
}
export default GetLocationReviews;

const styles = StyleSheet.create({
    title: {
        color: 'black',
        backgroundColor: 'lightgray',
        padding: 10,
        fontSize: 50
    },
    formItem: {
        padding: 20
    },
    formLabel: {
        fontSize: 15,
        color: 'black'
    },
    formInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5
    }
})
