import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            id: '',
            token: ''
        }
    }
    

    componentDidMount(){
        this.getData()
    }

    getData = async () => {
        try {
            this.setState({ 'token': await AsyncStorage.getItem('token') })
        }
        catch (error) {
            console.log(error)
        }
        this.getFavouriteLocations()
    }

    getFavouriteLocations = async () => {
        try {
            let response = await fetch('http://10.0.2.2:3333/api/1.0.0/find?search_infavourite' ,{
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
                })
                .catch((error) => {

                    console.error('Error:', error);
                });
        }
        catch (error) {
            console.log(error)
        }
    }

    render() {
        return (

            <View>
                <Text>Favourite Locations</Text>

                <FlatList
                    data={this.state.location_data}
                    renderItem={({ item }) => (
                        <View>
                            <Text>Name: {item.location_name}</Text>
                            <Text>Town: {item.location_town}</Text>
                            <Text>Quality Rating: {item.avg_quality_rating}</Text>
                            <Text>Price Rating: {item.avg_price_rating}</Text>
                            <Text>Quality Rating: {item.avg_quality_rating}</Text>
                            <Text>Clenliness Rating: {item.avg_clenliness_rating}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => item.id}
                />

            </View>
        )
    }
}
export default Home;
