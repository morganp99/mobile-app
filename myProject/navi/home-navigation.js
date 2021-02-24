
import React from 'react'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Login from '../components/user-managment/login-2.js'
import CreateUser from '../components/user-managment/create-user2.js'

const HomeNavigation = createMaterialBottomTabNavigator(
    {
        Login : {screen: Login},
        CreateUser : {screen: CreateUser}
    }
)
export default HomeNavigation