import React, { useRef } from 'react'
import useFetch from '../../Hooks/useFetch';
import useUpdateEffect from '../../Hooks/useUpdateEffect';
import { StyleSheet, TouchableOpacity } from 'react-native'

import { Button, Text } from '@ui-kitten/components';
import { NavigationProp } from '@react-navigation/native';

import { storeTokenToLocalStorage, isEmail } from '../../Util';

import TextInput from '../Form/TextInput';
import Container from '../Form/Container';
import OtherOptions from '../Form/OtherOptions';


type Props = {
    navigation: NavigationProp<any>
    setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginForm = ({ navigation, setIsRegistered }: Props) => {
    const TextInputUserRef = useRef<any>(null);
    const TextInputPassRef = useRef<any>(null);

    const { execute, loading, error, value } = useFetch(
        "http://localhost:3001/Auth/login",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                [isEmail(TextInputUserRef.current?.getValue()) ? 'email' : 'name']: TextInputUserRef.current?.getValue(),
                password: TextInputPassRef.current?.getValue()
            })
        }
    )

    const handleForm = async () => {
        const username = TextInputUserRef.current?.getValue()
        const password = TextInputPassRef.current?.getValue()
        if (username === '') {
            TextInputUserRef.current?.setError('Username cannot be empty')
            return
        }
        if (password === '') {
            TextInputPassRef.current?.setError('Password cannot be empty')
            return
        }
        try {
            execute()
        } catch (error) {
            console.log(error);
        }
    }

    useUpdateEffect(() => {
        console.log(value);
        if (value) {
            storeTokenToLocalStorage(value)
            navigation.navigate("Home")
        }
    }, [value])

    return (
        <Container isLoading={loading}>
            <Text category="h1" style={styles.title}>Hello</Text>
            <Text category="p1" style={styles.subTitle}>Sign in to your account</Text>
            <Text category="p1" status='danger'>{error != undefined && error.message.toLowerCase()}</Text>

            <TextInput placeholder='Username' label='Username' ref={TextInputUserRef} />
            <TextInput placeholder='Password' label='Password' isSecure={true} ref={TextInputPassRef} />

            <TouchableOpacity onPress={() => alert("Too bad for you :( didn't implement this feature yet!")}>
                <Text category='c1' style={{ textAlign: 'right', marginBottom: 20 }}>Forgot your password?</Text>
            </TouchableOpacity>

            <Button onPress={handleForm} >
                <Text style={styles.title} >LOG IN</Text>
            </Button>

            <Text category='p2' style={styles.textAlignment} >Or Log In using Social Media</Text>

            <OtherOptions />

            <TouchableOpacity onPress={() => setIsRegistered(p => !p)}  >
                <Text category='p2' style={styles.textAlignment} >Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </Container>
    )
}

export default LoginForm

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontWeight: '100',
        letterSpacing: 2,
    },
    subTitle: {
        textAlign: 'center',
        fontWeight: '100',
        letterSpacing: 1,
        marginVertical: 16,
    },
    textAlignment: {
        textAlign: 'center',
        marginVertical: 20,
    }
})