import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './home';
import Settings from './settings';
import Profile from './profile';

const Tab = createBottomTabNavigator();

class AppNavigation extends Component {
    render() {
        const navigation = this.props.navigation;
        return (
            <Tab.Navigator
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

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Settings" component={Settings} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
        );
    }
}
export default AppNavigation;