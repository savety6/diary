import { StyleSheet, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import useFetch from '../Hooks/useFetch';
import { getTokenFromLocalStorage, storeTokenToLocalStorage } from '../Util';

import LoginForm from '../Components/Authentication/LoginForm';
import { NavigationProp } from '@react-navigation/native';
import SigninForm from '../Components/Authentication/SigninForm';
import useUpdateEffect from '../Hooks/useUpdateEffect';

type Props = {
    navigation: NavigationProp<any>
}
type Token = {
    token: string
}

const Authenticate = (props: Props) => {
    const [isRegistered, setIsRegistered] = useState<boolean>(true)
    const [token, setToken] = useState<Token>({ token: '' })

    const { execute, value, error, loading } = useFetch(
        "http://localhost:3001/Auth/verify",
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token}`
            }
        }
    )

    const checkToken = async () => {
        try {
            const localToken = await getTokenFromLocalStorage()
            if (localToken != null) {
                setToken(localToken)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkToken()
    }, [])

    useUpdateEffect(() => {
        console.log(token);
        execute()
    }, [token])

    useUpdateEffect(() => {
        if (value) {
            storeTokenToLocalStorage(value)
            props.navigation.navigate("Home")
        }
    }, [value])

    useUpdateEffect(() => {
        console.log(error);
    }, [error])


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