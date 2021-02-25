

import React, { Component, useState } from 'react';
import { Text, TextInput, View, Button, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class FindLocations extends Component {

    constructor(props) {
        super(props);

        this.state = {
            locationData: [{}],
            token: '',
            isLoading: true,

            //props recived from search
            clenliness_rating: '',
            overall_rating: '',
            price_rating: '',
            quality_rating: '',
            latitude: 0,
            location_id: '',
            location_name: '',
            location_reviews: [],
            location_town: '',
            longitude: '',
            photo_path: '',

            //props used to searcg
            string: '',
            input_overall_rating: '',
            input_price_rating: '',
            input_quality_rating: '',
            input_cleniness_rating: '',
            search_in: '',
            limit: 0,
            offset: 0,
        }
    }

    componentDidMount = async () => {
        try {
            this.setState({ 'token': await AsyncStorage.getItem('token') })
        }
        catch (error) {
            console.log(error)
        }
        this.findLocations()
    }

    findLocations = async () => {
        try {
            let response = await fetch('http://10.0.2.2:3333/api/1.0.0/find', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': this.state.token
                },
            })
                .then(response => {
                    return response.json()
                })
                .then(responseData => {
                    this.setState({ locationData: responseData })

                    //console.log(this.state.locationData)
                    return responseData
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

        const [people, setPeople] = useState([
            { name: 'morgan', key: '1' },
            { name: 'morga', key: '2' }

        ])
        return (

            <View>
                <Text>Hey</Text>
                <FlatList
                    data={people}
                    renderItem={({ item }) => (
                        <Text>
                            {item.name}
                        </Text>
                    )}
                />
                {/* <FlatList
                
                    location={this.state.locationData}
                    renderItem={({ locationDetails }) => (
 
                            <Text>{locationDetails.location_name}</Text>
                    )}
                /> */}
            </View>
        )
    }
}


export default FindLocations;



        //     this.setState({ clenliness_rating: location.avg_clenliness_rating })
        //     this.setState({ overall_rating: location.avg_overall_rating })
        //     this.setState({ price_rating: location.avg_price_rating })
        //     this.setState({ quality_rating: location.avg_quality_rating })
        //     this.setState({ latitude: location.latitude })
        //     this.setState({ location_id: location.location_id })
        //     this.setState({ location_name: location.location_name })
        //     this.setState({ location_reviews: location.location_reviews })
        //     this.setState({ location_town: location.location_town })
        //     this.setState({ longitude: location.longitude })
        //     this.setState({ photo_path: location.photo_path })
        // }

// class FindLocations extends Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             string: '',
//             overall_rating: '',
//             price_rating: '',
//             quality_rating: '',
//             cleniness_rating: '',
//             search_in: '',
//             limit: 0,
//             offset: 0,
//             token: '',
//             isLoading: true
//         }
//     }

//     componentDidMount = async () => {
//         try {
//             this.setState({ 'token': await AsyncStorage.getItem('token') })
//         }
//         catch (error) {
//             console.log(error)
//         }
//     }



//     if(isLoading) {
//         return <View><Text>Loading...</Text></View>
//     }
//     render() {
//         return (
//             <FlatList
//                 data
//             />

//         );
//     }


// findLocations = async () => {
//     try {
//         let response = await fetch('http://10.0.2.2:3333/api/1.0.0/find', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-Authorization': this.state.token
//             },
//         })
//             .then(response => {
//                 return response.json()
//             })
//             .then(data => {
//                 console.log('Success:', data);
//                 this.setState({ string: data.string })
//                 this.setState({ overall_rating: data.overall_rating })
//                 this.setState({ price_rating: data.price_rating })
//                 this.setState({ quality_rating: data.quality_rating })
//                 this.setState({ cleniness_rating: data.cleniness_rating })
//                 this.setState({ search_in: data.search_in })
//                 this.setState({ limit: data.limit })
//                 this.setState({ offset: data.offset })
//                 this.setState({ price_rating: data.price_rating })
//                 return data
//             })
//             .then(async () => {

//                 try {
//                     await AsyncStorage.setItem('string',this.state.string.toString())
//                     await AsyncStorage.setItem('overall_rating',this.state.overall_rating.toString())
//                     await AsyncStorage.setItem('price_rating',this.state.price_rating.toString())
//                     await AsyncStorage.setItem('quality_rating',this.state.quality_rating.toString())
//                     await AsyncStorage.setItem('cleniness_rating',this.state.cleniness_rating.toString())
//                     await AsyncStorage.setItem('search_in',this.state.search_in.toString())
//                     await AsyncStorage.setItem('limit',this.state.limit.toString())
//                     await AsyncStorage.setItem('offset',this.state.offset.toString())
//                     await AsyncStorage.setItem('price_rating',this.state.price_rating.toString())                      
//                 }
//                 catch (dataError) {
//                     console.error('error:', dataError);
//                 }
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//             });
//         console.log(await AsyncStorage.getItem('first_name'))
//         console.log(await AsyncStorage.getItem('last_name'))
//         console.log(await AsyncStorage.getItem('email'))
//     }
//     catch (error) {
//         console.log(error)
//     }
// }


