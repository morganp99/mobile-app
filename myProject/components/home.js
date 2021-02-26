import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
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

            <View style = {styles.flexContainer}>
                <Text style={styles.title}>Favourite Locations</Text>
                <FlatList
                    data={this.state.location_data}
                    renderItem={({ item }) => (
                        <View style = {styles.outline}>
                            <Text style={styles.outputTitleText}>Loaction: {item.location_name}</Text>
                            <Text style ={styles.outputText}>Town: {item.location_town}</Text>
                            <Text style ={styles.outputText}>Quality Rating: {item.avg_quality_rating}</Text>
                            <Text style ={styles.outputText}>Price Rating: {item.avg_price_rating}</Text>
                            <Text style ={styles.outputText}>Quality Rating: {item.avg_quality_rating}</Text>
                            <Text style ={styles.outputText}>Clenliness Rating: {item.avg_clenliness_rating}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => item.id}
                />

            </View>
        )
    }
}
export default Home;

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
    outputText:{
        fontSize: 18
    },
    outline : {
        borderWidth: 2,
        borderColor: 'sienna'
    }
})