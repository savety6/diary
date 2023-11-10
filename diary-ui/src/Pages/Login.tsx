import { StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { Button, Layout, Text, Card, Input } from '@ui-kitten/components';
import LoginForm from '../Components/Authentication/LoginForm';
import { NavigationProp } from '@react-navigation/native';
import SigninForm from '../Components/Authentication/SigninForm';

type Props = {
    navigation: NavigationProp<any>
}

const Login = (props: Props) => {
    const [text, setText] = useState(null)
    const [isRegistered, setIsRegistered] = useState<boolean>(false)

    const handlePress = async () => {
        //Authentication
        try {
            const response = await fetch('http://localhost:3001/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.text()
            console.log(response)
            setText(data)
        } catch (error) {
            console.warn(error);

        }
    }
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

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})