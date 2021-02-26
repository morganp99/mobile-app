import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../home';
import Search from '../search';
import Profile from '../profile';

const Tab = createBottomTabNavigator();

class HomeNavigation extends Component {
    render() {
        const navigation = this.props.navigation;
        return (
            <Tab.Navigator
            initialRouteName="Home"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'home' : 'home-outline';
                        } else if (route.name === 'Settings') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'home' : 'home-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Profile" component={Profile} />
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Search" component={Search} />
            </Tab.Navigator>
        );
    }
}
export default HomeNavigation;