

import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AppNavigation from './app-navigation.js'
import HomeNavigation from './home-navigation.js'

const SwitchNavigator = createSwitchNavigator(
    {
        Home: HomeNavigation,
        App: AppNavigation
    },
    {
        initalRouteName: 'Home'
    }
)
const AppContainer = createAppContainer(SwitchNavigator)

export default AppContainer