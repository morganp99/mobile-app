import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';
import Stars from 'react-native-stars'

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location_review: 1,
            review_id: 1,
            string: '',
            overall_rating: 0,
            price_rating: 0,
            quality_rating: 0,
            clenliness_rating: 0,
            search_in: '',
            limit: 5,
            offset: 0,
            token: '',
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
        return (
            <View style={styles.flexContainer}>

                <View style={styles.formInput}>
                    <Text style={styles.formLabel}>Search Word</Text>
                    <TextInput style={styles.formInput}
                        placeholder="String..."
                        onChangeText={(string) => this.setState({ string })}
                        value={this.state.string}
                    />
                </View>

                <View style={styles.formInput}>
                    <Text style={styles.formLabel}>Overall Rating</Text>
                    <Stars
                        half={true}
                        default={this.state.overall_rating}
                        update={(val) => this.setState({ overall_rating: val })}
                    />
                </View>


                <View style={styles.formInput}>
                    <Text style={styles.formLabel}>Price Rating</Text>
                    <Stars
                        half={true}
                        default={this.state.price_rating}
                        update={(val) => this.setState({ price_rating: val })}
                    />
                </View>

                <View style={styles.formInput}>
                    <Text style={styles.formLabel}>Quality Rating</Text>
                    <Stars
                        half={true}
                        default={this.state.quality_rating}
                        update={(val) => this.setState({ quality_rating: val })}
                    />
                </View>

                <View >
                    <Text style={styles.formLabel}>Clenliness Rating</Text>
                    <Stars
                        half={true}
                        default={this.state.clenliness_rating}
                        update={(val) => this.setState({ clenliness_rating: val })}
                    />
                </View>


                <Button
                    title="find locations"
                    onPress={() => navigation.navigate('FindLocations', {
                        string: this.state.string,
                        overall_rating: this.state.overall_rating,
                        price_rating: this.state.price_rating,
                        quality_rating: this.state.quality_rating,
                        clenliness_rating: this.state.clenliness_rating
                    })}
                />
            </View>
        );
    }

}
export default Search;

const styles = StyleSheet.create({

    flexContainer: {
        flex: 1,
        backgroundColor: 'sandybrown'
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
        borderColor: 'sienna'
    },
    buttonStyle: {
        backgroundColor: 'black'
    },
    formItem: {
        padding: 20
    },
    formLabel: {
        backgroundColor: 'sienna',
        fontSize: 20,
        color: 'black'
    },
    formInput: {
        borderWidth: 2,
        borderColor: 'sienna',
        borderRadius: 5
    },
})