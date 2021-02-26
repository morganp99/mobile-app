

import React, { Component } from 'react';
import { Text, TextInput, View, Button, Stars, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class GetLocationReviews extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location_name: '',
            review_id: 12,
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
            this.state.review_id = this.props.route.params.review_id
            this.state.review_body = this.props.route.params.review_body
            this.state.overall_rating = this.props.route.params.overall_rating
            this.state.price_rating = this.props.route.params.price_rating
            this.state.quality_rating = this.props.route.params.quality_rating
            this.state.clenliness_rating = this.props.route.params.clenliness_rating
            this.state.location_name = this.props.route.params.location_name
        }
        catch (error) {
            console.log(error)
        }
    }

    deleteReview = async () => {

        try {
            let response = await fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id + '/review/' + this.state.review_id, {
                method: 'DELETE',
                headers: {
                    'X-Authorization': this.state.token
                },
            })
                .then(response => {
                    return response.json()
                })
                .catch((error) => {
                });
        }
        catch (error) {
            console.log(error)
        }
        navigation.navigate('GetLocationReviews')
    }

    validateReviewBody() {
        var contains = false
        var forbiddenWords = ["tea", "Tea", "Cake", "cake", "cakes", "Cakes", "Pastries", "pastries", "Pastry", "pastry"];
        for (var i = 0; i < forbiddenWords.length; i++) {
            contains = this.state.review_body.includes(forbiddenWords[i])
            if (contains) {
                Alert.alert('Please dont use thoese profanities, try again')
                return
            }
        }
        this.updateReview()
        navigation.navigate
    }


    updateReview() {
        const to_send = {
            overall_rating: this.state.overall_rating,
            price_rating: this.state.price_rating,
            quality_rating: this.state.quality_rating,
            clenliness_rating: this.state.clenliness_rating,
            review_body: this.state.review_body,
        }

        fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id + '/review/' + this.state.review_id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.state.token
            },
            body: JSON.stringify(to_send),
        })
            .catch((error) => {
                console.error('Error:', error);
            });
        this.getData()
    }

    render() {
        return (

            <View>
                <Text style ={styles.title}>{this.state.location_name} </Text>

                <Text style={styles.outputText}>Overall Rating: {this.state.overall_rating}</Text>
                <Text style={styles.outputText}>Price Rating: {this.state.price_rating}</Text>
                <Text style={styles.outputText}>Quality Rating: {this.state.quality_rating}</Text>
                <Text style={styles.outputText}>Clenliness Rating: {this.state.clenliness_rating}</Text>
                <Text style={styles.outputTitleText}>Review: {this.state.review_body}</Text>

                <TextInput styles={styles.formInput}
                    placeholder="Enter review..."
                    onChangeText={(review_body) => this.setState({ review_body })}
                    value={this.state.review_body}
                />
                <Button
                    title="Clear Review Body"
                    onPress={() => this.setState({ review_body: '' })}
                />
                <Button
                    title="Update Review"
                    onPress={() => this.updateReview()}
                />
                <Button
                    title="Delete Review"
                    onPress={() => this.deleteReview()}
                />
            </View>
        )
    }
}
export default GetLocationReviews;

const styles = StyleSheet.create({
    title: {
        color: 'black',
        padding: 10,
        fontSize: 25
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
