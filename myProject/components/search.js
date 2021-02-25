import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import Stars from 'react-native-stars'

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location_review: 1,
            review_id: 1,
            string: '',
            overall_rating: 1,
            price_rating: 1,
            quality_rating: 1,
            cleniness_rating: 1,
            search_in: '',
            limit: 5,
            offset: 0,
            token: '',
        }
    }


    render() {
        const navigation = this.props.navigation;
        return (
            <View>
                <TextInput
                    placeholder="String..."
                    onChangeText={(string) => this.setState({ string })}
                    value={this.state.string}
                />
                <Text>Overall Rating</Text>
                <Stars
                    half={true}
                    default={this.state.overall_rating}
                    update={(val) => this.setState({ overall_rating: val })}
                />

                <Text>Price Rating</Text>
                <Stars
                    half={true}
                    default={this.state.price_rating}
                    update={(val) => this.setState({ price_rating: val })}
                />

                <Text>Quality Rating</Text>
                <Stars
                    half={true}
                    default={this.state.quality_rating}
                    update={(val) => this.setState({ quality_rating: val })}
                />

                <Text>Clenliness Rating</Text>
                <Stars
                    half={true}
                    default={this.state.cleniness_rating}
                    update={(val) => this.setState({ cleniness_rating: val })}
                />

                <TextInput
                    placeholder="search in..."
                    onChangeText={(search_in) => this.setState({ search_in })}
                    value={this.state.search_in}
                />
                <Button
                    title="find locations"
                    onPress={() => navigation.navigate('FindLocations')}
                />
                <Button
                    title="Add Review"
                    onPress={() => navigation.navigate('AddReviewToLocation')}
                />
                <Button
                    title=" Delete Review"
                    onPress={() => navigation.navigate('DeleteLocationReview')}
                />
                <Button
                    title=" Delete Review"
                    onPress={() => navigation.navigate('DeleteLocationReview')}
                />
                <Button
                    title=" add photo Review"
                    onPress={() => navigation.navigate('AddPhotoToReview')}
                />

            </View>
        );
    }

}
export default Search;
