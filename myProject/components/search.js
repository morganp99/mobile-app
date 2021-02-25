import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            string: '',
            overall_rating: 0,
            price_rating: 0,
            quality_rating: 0,
            cleniness_rating: 0,
            search_in: '',
            limit: 5,
            offset: 0,
            token: '',
        }
    }


    //replace for token being passed in through container
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
        return (
            <View>
                <TextInput
                    placeholder="String..."
                    onChangeText={(string) => this.setState({ string })}
                    value={this.state.string}
                />
                <TextInput
                    placeholder="Overll rating..."
                    onChangeText={(overall_rating) => this.setState({ overall_rating })}
                    value={this.state.overall_rating}
                />
                <TextInput
                    placeholder="pring ratinf..."
                    onChangeText={(price_rating) => this.setState({ price_rating })}
                    value={this.state.price_rating}
                />
                <TextInput
                    placeholder="quality rating..."
                    onChangeText={(quality_rating) => this.setState({ quality_rating })}
                    value={this.state.quality_rating}
                />
                <TextInput
                    placeholder="clenliness..."
                    onChangeText={(cleniness_rating) => this.setState({ cleniness_rating })}
                    value={this.state.cleniness_rating}
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

            </View>
        );
    }
}
export default Search;
