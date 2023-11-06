import { useMediaQuery } from "react-responsive";

import React from 'react'
import { Provider } from 'react-redux';
import { store } from '../Context/store';

import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Home from '../Pages/Home'
import Login from '../Pages/Login'

const Stack = createNativeStackNavigator();

const index = () => {
    const isTabletOrMobileDevice = useMediaQuery({
        maxDeviceWidth: 1224,
        query: "(max-device-width: 1224px)"
    });

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Home" component={Home} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default index
