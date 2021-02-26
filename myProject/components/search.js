import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, TextInput, View, Button, } from 'react-native';
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

    componentDidMount(){
        this.getData()
        // this.findLocations()
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
                    onPress={() => navigation.navigate('FindLocations', {string : this.state.string,})}
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

    // findLocations = async () => {
    //     try {
            // let response = await fetch('http://10.0.2.2:3333/api/1.0.0/find?q' + this.state.string +
            //     '?overall_rating' + this.state.overall_rating +
            //     '?price_rating' + this.state.price_rating +
            //     '?quality_rating' + this.state.quality_rating +
            //     '?clenliness_rating' + this.state.cleniness_rating,
            //     {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'X-Authorization': this.state.token
    //                 },
    //             }) 
    //             .then(responseData => {
    //                 this.setState({
    //                     loading: false
    //                 })
    //                 return responseData.json();
    //             })
    //             .then(responseData => {
    //                 this.setState({
    //                     location_data: responseData
    //                 })
    //             })
    //             .catch((error) => {

    //                 console.error('Error:', error);
    //             });
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
        // const navigation = this.props.navigation;
        // navigation.navigate('FindLocations', {location_data : this.state.location_data}) 
    // }
    // findLocations = async () => {
    //     try {
    //         let response = await fetch('http://10.0.2.2:3333/api/1.0.0/find', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'X-Authorization': this.state.token
    //             },
    //         })
    //             .then(responseData => {
    //                 this.setState({
    //                     loading: false
    //                 })
    //                 return responseData.json();
    //             })
    //             .then(responseData => {
    //                 this.setState({
    //                     location_data: responseData
    //                 })
    //                 console.log('This is the state ' + JSON.stringify(this.state.location_data))
    //             })
    //             .catch((error) => {

    //                 console.error('Error:', error);
    //             });
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }

    // }
    // render() {
    //     return (

    //         <View>
    //             <Text>Locations</Text>

    //             <FlatList
    //                 data={this.state.location_data}
    //                 renderItem={({ item }) => (
    //                     <View>
    //                         <Text>{item.location_name}</Text>
    //                     </View>
    //                 )}
    //                 keyExtractor={(item, index) => item.id}
    //             />

    //         </View>
    //     )
    // }

}
export default Search;
