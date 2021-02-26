

import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/user-managment/login-user';
import CreateUser from './components/user-managment/create-user';
import HomeNavigation from './components/navigation/home-navigation';
import UpdateUserDetails from './components/user-managment/update-user-details';
import GetUserDetails from './components/user-managment/get-user-details';
import FindLocations from './components/location-managment/find-all-locations';
import AddReviewToLocation from './components/location-reviews/add-location-review'
//import DeleteLocationReview from './components/location-reviews/delete-location-review'
import AddPhotoToReview from './components/location-reviews/add_photo_to_review'
//import DeletPhotoFromReview from './components/location-reviews/delete-location-review'
import GetLocationReviews from './components/location-reviews/get-location-reviews'

const Stack = createStackNavigator();

class App extends Component {
    render() {
        return (

            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="CreateUser" component={CreateUser} options={{title: "Create Account"}} />
                    <Stack.Screen name= "HomeNavigation" component={HomeNavigation}options={{title: "Home"}}/>
                    <Stack.Screen name= "UpdateUserDetails" component={UpdateUserDetails}options={{title: "Update User Details"}}/>
                    <Stack.Screen name= "GetUserDetails" component={GetUserDetails}options={{title: "User Details"}}/>
                    <Stack.Screen name= "FindLocations" component={FindLocations}options={{title: "Find Locations"}}/>
                    <Stack.Screen name= "AddReviewToLocation" component={AddReviewToLocation}options={{title: "Add review"}}/>
                    {/* <Stack.Screen name= "DeleteLocationReview" component={DeleteLocationReview}options={{title: "Delete review"}}/> */}
                    <Stack.Screen name= "AddPhotoToReview" component={AddPhotoToReview}options={{title: "AddPhotoToReview"}}/>
                    {/* <Stack.Screen name= "DeletPhotoFromReview" component={DeletPhotoFromReview}options={{title: "DeletPhotoFromReview"}}/> */}
                    <Stack.Screen name= "GetLocationReviews" component={GetLocationReviews}options={{title: "GetLocationReviews"}}/>
                </Stack.Navigator>
            </NavigationContainer>

        );
    }
}

export default App;


