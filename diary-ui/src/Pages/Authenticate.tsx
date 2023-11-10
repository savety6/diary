import { StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { Button, Layout, Text, Card, Input } from '@ui-kitten/components';
import LoginForm from '../Components/Authentication/LoginForm';
import { NavigationProp } from '@react-navigation/native';
import SigninForm from '../Components/Authentication/SigninForm';

type Props = {
    navigation: NavigationProp<any>
}

const Authenticate = (props: Props) => {
    const [isRegistered, setIsRegistered] = useState<boolean>(true)
    
    return (
        <ImageBackground source={
            require('../../assets/BackgroundImage.jpg')

        } style={styles.container}>
            {isRegistered ?
                <LoginForm navigation={props.navigation} setIsRegistered={setIsRegistered} />
                :
                <SigninForm navigation={props.navigation} setIsRegistered={setIsRegistered} />
            }
        </ImageBackground>
    )
}

export default Authenticate

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})