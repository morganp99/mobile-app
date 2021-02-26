import React, { Component, useState } from 'react';
import { Text, TextInput, View, Button, Alert, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class FindLocations extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location_data: null,
            token: '',
            loading: true,

            //props recived from search
            clenliness_rating: '',
            overall_rating: '',
            price_rating: '',
            quality_rating: '',
            string: ''
        }
    }

    componentDidMount = async () => {
        this.getData()
    }


    getData = async () => {

        try {
            this.setState({ 'token': await AsyncStorage.getItem('token') })
            this.state.string = this.props.route.params.string
            this.state.overall_rating = this.props.route.params.overall_rating
            this.state.price_rating = this.props.route.params.price_rating
            this.state.quality_rating = this.props.route.params.quality_rating
            this.state.clenliness_rating = this.props.route.params.clenliness_rating
        }
        catch (error) {
            console.log(error)
        }
        this.findLocations()
    }

    findLocations = async () => {
        try {
            let response = await fetch('http://10.0.2.2:3333/api/1.0.0/find' +
                '?q' + this.state.string +
                '?overall_rating' + this.state.overall_rating +
                '?price_rating' + this.state.price_rating +
                '?quality_rating' + this.state.quality_rating +
                '?clenliness_rating' + this.state.clenliness_rating,
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
                    console.log('This is the state ' + this.state.location_data)
                })
                .catch((error) => {

                    console.error('Error:', error);
                });
        }
        catch (error) {
            console.log(error)
        }
    }


    favouriteLocation(location_id) {
        console.log("this is location id " + location_id)

        fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/favourite/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.state.token
            },
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    unFavouriteLocation(location_id) {
        console.log("this is location id " + location_id)

        fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/favourite/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.state.token
            },
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    render() {
        const navigation = this.props.navigation;
        return (

            <View style={styles.flexContainer}>
                <FlatList
                    data={this.state.location_data}
                    renderItem={({ item }) => (


                        <View style={styles.flexContainer}>
                            <Text style={styles.title}>Favourite Locations</Text>
                            <FlatList
                                data={this.state.location_data}
                                renderItem={({ item }) => (
                                    <View style={styles.outline}>
                                        <Text style={styles.outputTitleText}>Loaction: {item.location_name}</Text>
                                        <Text style={styles.outputText}>Town: {item.location_town}</Text>
                                        <Text style={styles.outputText}>Quality Rating: {item.avg_quality_rating}</Text>
                                        <Text style={styles.outputText}>Price Rating: {item.avg_price_rating}</Text>
                                        <Text style={styles.outputText}>Quality Rating: {item.avg_quality_rating}</Text>
                                        <Text style={styles.outputText}>Clenliness Rating: {item.avg_clenliness_rating}</Text>
                                        <Button
                                            title="Add Review"
                                            onPress={() => navigation.navigate('AddReviewToLocation',
                                                { location_id: item.location_id })}
                                        />

                                        <Button
                                            title="Get Reviews"
                                            onPress={() => navigation.navigate('GetLocationReviews', {
                                                location_id: item.location_id
                                            })}
                                        />

                                        <Button
                                            title="Favourite Location"
                                            onPress={() => this.favouriteLocation(item.location_id)}
                                        />
                                        <Button
                                            title="unFavourite Location"
                                            onPress={() => this.unFavouriteLocation(item.location_id)}
                                        />
                                    </View>
                                )}
                                keyExtractor={(item, index) => item.id}
                            />

                        </View>
                    )}
                    keyExtractor={(item, index) => item.id}
                />

            </View>
        )
    }
}


export default FindLocations;

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
    outputText: {
        fontSize: 18
    },
    outline: {
        borderWidth: 2,
        borderColor: 'cornflowerblue'
    },
    buttonStyle: {
        backgroundColor: 'black'
    }
})

