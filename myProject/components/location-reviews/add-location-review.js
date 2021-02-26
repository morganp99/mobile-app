

import React, { Component } from 'react';
import { Text, TextInput, View, Button, Stars } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class AddReviewToLocation extends Component {

    constructor(props) {
        super(props);

        this.state = {
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
        }
        catch (error) {
            console.log(error)
        }
        this.state.location_id = this.props.route.params.location_id
        this.render()
    }


    addReview = async () => {
        console.log('Overall rating' + this.state.overall_rating)


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
                    console.error('Error:', error);
                });


        }
        catch (error) {
            console.log(error)
        }

    }


    addPhotoToReview(location_id, review_id) {

        fetch('http://10.0.2.2:3333/api/1.0.0//location/' + location_id + '/review/' + review_id + '/photo', {
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


    render() {
        const navigation = this.props.navigation;
        return (
            <View>

                <Text>Clenliness Rating</Text>
                {/* <Stars
                    half={true}
                    default={this.state.clenliness_rating}
                    update={(val) => this.setState({ clenliness_rating: val })}
                /> */}


                <View>
                    <Text>Feedback</Text>
                    <TextInput
                        placeholder="feedback"
                        onChangeText={(review_body) => this.setState({ review_body })}
                        value={this.state.review_body}
                    />
                </View>

                <Button
                    title="Add review"
                    onPress={() => this.addReview()}
                />

                <Button
                    title="Attatch Photo"
                    onPress={() => this.addPhotoToReview()}
                />

                <Button
                    title="Take Photo"
                    onPress={() => navigation.navigate('TakePhotoForReview')}
                //send name review body and all 4 ratings

                />
            </View>
        );
    }

}
export default AddReviewToLocation;
