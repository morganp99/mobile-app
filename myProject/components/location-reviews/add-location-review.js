

import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class AddReviewToLocation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location_id: 1,
            overall_rating: 4,
            price_rating: 2,
            quality_rating: 3,
            clenliness_rating: 5,
            review_body: "Great coffee, but the bathrooms stank!",
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

    render() {
        const navigation = this.props.navigation;

        //add some error handling for email password and such.
        return (
            <View>

                <Text>Overall Rating</Text>

                <TextInput
                    placeholder="Overall rating"
                    onChangeText={(overall_rating) => this.setState({ overall_rating })}
                    value={this.state.overall_rating}
                />
                <Text>Price Rating</Text>

                <TextInput
                    placeholder="price rating"
                    onChangeText={(price_rating) => this.setState({ price_rating })}
                    value={this.state.price_rating}
                />
                <Text>Quality Rating</Text>
                <TextInput
                    placeholder="qualityrating"
                    onChangeText={(quality_rating) => this.setState({ quality_rating })}
                    value={this.state.quality_rating}
                />
                <Text>Clenliness rating</Text>
                <TextInput
                    placeholder="clenliness rating"
                    onChangeText={(cleniness_rating) => this.setState({ cleniness_rating })}
                    value={this.state.cleniness_rating}
                />
                <Text>Feedback</Text>
                <TextInput
                    placeholder="feedback"
                    onChangeText={(review_body) => this.setState({ review_body })}
                    value={this.state.review_body}
                />
                <Button
                    title="Add review"
                    onPress={() => this.addReview()}
                />
            </View>
        );
    }


    addReview = async () => {

        const to_send = {
            overall_rating: this.state.overall_rating,
            price_rating: this.state.price_rating, 
            quality_rating: this.state.quality_rating,
            clenliness_rating: this.state.clenliness_rating,
            review_body: this.state.review_body,
        }
        try {
            let response = await fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id + '/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': this.state.token
                },
                body: JSON.stringify(to_send),
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
export default AddReviewToLocation;
