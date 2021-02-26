

import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, ScrollView, Alert } from 'react-native';
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

    validateReviewBody() {
        var contains = false
        var forbiddenWords = ["tea","Tea", "Cake","cake","cakes","Calkes" ,"Pastries","pastries","Pastry","pastry"];     
        for( var i=0; i<forbiddenWords.length;i++){
            console.log(this.state.review_body)
            console.log(forbiddenWords[i])
            contains = this.state.review_body.includes(forbiddenWords[i])
            if (contains) {
                Alert.alert('Please dont use thoese profanities, try again')
                return
            }
        }
        this.addReview()
    }

    addReview = async () => {
        const to_send = {
            overall_rating: this.state.overall_rating,
            price_rating: this.state.price_rating,
            quality_rating: this.state.quality_rating,
            clenliness_rating: this.state.clenliness_rating,
            review_body: this.state.review_body
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
        const navigation = this.props.navigation;
        navigation.naigate('GetLocationReviews')
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

            <View style={styles.flexContainer}>
                <ScrollView>

                    <Text style={styles.title}>Add Review</Text>

                    <View style={styles.formItem}>
                        <Text style={styles.formLabel}>Overall Rating</Text>
                        <TextInput style={styles.formInput}
                            placeholder="Enter Overall rating 0-5"
                            onChangeText={(overall_rating) => this.setState({ overall_rating })}
                            value={this.state.overall_rating}
                        />
                    </View>

                    <View style={styles.formItem}>
                        <Text style={styles.formLabel} >Price Rating</Text>
                        <TextInput style={styles.formInput}
                            placeholder="Enter Price rating 0-5"
                            onChangeText={(price_rating) => this.setState({ price_rating })}
                            value={this.state.price_rating}
                        />
                    </View>

                    <View style={styles.formItem}>
                        <Text style={styles.formLabel}>Quality Rating</Text>
                        <TextInput style={styles.formInput}
                            placeholder="Enter Quality rating 0-5"
                            onChangeText={(quality_rating) => this.setState({ quality_rating })}
                            value={this.state.quality_rating}
                        />
                    </View>

                    <View style={styles.formItem}>
                        <Text style={styles.formLabel}>Clenliness Rating</Text>
                        <TextInput style={styles.formInput}
                            placeholder="Enter Clenliness rating 0-5"
                            onChangeText={(clenliness_rating) => this.setState({ clenliness_rating })}
                            value={this.state.clenliness_rating}
                        />
                    </View>

                    <View style={styles.formItem}>
                        <Text style={styles.formLabel}>Feedback</Text>
                        <TextInput style={styles.formInput}
                            placeholder="Enter Feedback"
                            onChangeText={(review_body) => this.setState({ review_body })}
                            value={this.state.review_body}
                        />
                    </View>

                    <View styles={styles.formItem}>

                    </View>
                    <Button
                        title="Add review"
                        onPress={() => this.validateReviewBody()}
                    />

                </ScrollView>
            </View>

        );
    }

}
export default AddReviewToLocation;

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
    formItem: {
        padding: 20
    },
    formLabel: {
        backgroundColor: 'cornflowerblue',
        fontSize: 20,
        color: 'black'
    },
    formInput: {
        borderWidth: 2,
        borderColor: 'cornflowerblue',
        borderRadius: 5
    },
})