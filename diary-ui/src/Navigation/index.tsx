import { useMediaQuery } from "react-responsive";

import React from 'react'

import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from '../../assets/custom-theme.json';

import { Provider } from 'react-redux';
import { store } from '../Context/store';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Authenticate from '../Pages/Authenticate'
import Home from '../Pages/Home'
import Details from '../Pages/Details'

const Stack = createNativeStackNavigator();

const index = () => {
    const isTabletOrMobileDevice = useMediaQuery({
        maxDeviceWidth: 1224,
        query: "(max-device-width: 1224px)"
    });

    return (
        <Provider store={store}>
            <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Authenticate" component={Authenticate} options={{headerShown: false}} />
                        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
                        <Stack.Screen name="Details" component={Details} options={{headerShown: false}} />
                    </Stack.Navigator>
                </NavigationContainer>
            </ApplicationProvider>
        </Provider>
    )
}

export default index
