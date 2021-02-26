

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
    }
    

    render() {
        const navigation = this.props.navigation;
        //get location id here from props
        const loc_id = this.props.params;

        return (
            <View>

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
            </View>
        );
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
