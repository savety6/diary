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

const SigninForm = ({ navigation, setIsRegistered }: Props) => {

    const TextInputUserRef = useRef<any>(null);
    const TextInputEmailRef = useRef<any>(null);
    const TextInputPassRef = useRef<any>(null);
    const TextInputPassConfirmRef = useRef<any>(null);


    const { execute, loading, error, value } = useFetch(
        "http://localhost:3001/Auth/register",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: TextInputUserRef.current?.getValue(),
                email: TextInputEmailRef.current?.getValue(),
                password: TextInputPassRef.current?.getValue(),
            })
        }
    )
    useUpdateEffect(() => {
        if (value) {
            storeTokenToLocalStorage(value)
            navigation.navigate('Home')
        }else{
            console.log(value);
        }
     }, [value])

    const handleForm = () => {
        const username = TextInputUserRef.current?.getValue()
        const email = TextInputEmailRef.current?.getValue()
        const password = TextInputPassRef.current?.getValue()
        const passwordConfirm = TextInputPassConfirmRef.current?.getValue()

        if (username === '') {
            TextInputUserRef.current?.setError('Username cannot be empty')
            return
        }
        if (password === '') {
            TextInputPassRef.current?.setError('Password cannot be empty')
            return
        }
        if (passwordConfirm === '') {
            TextInputPassConfirmRef.current?.setError('Password cannot be empty')
            return
        }
        if (password !== passwordConfirm) {
            TextInputPassConfirmRef.current?.setError('Password does not match')
            return
        }
        if (email === '') {
            TextInputEmailRef.current?.setError('Email cannot be empty')
            return
        }
        if (!isEmail(email)) {
            TextInputEmailRef.current?.setError('Email is invalid')
            return
        }
        try {
            execute()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container isLoading={loading}>
            <Text category="h1" style={styles.title}>Nice to meat you!</Text>
            <Text category="p1" style={styles.subTitle}>Create your account</Text>
            <Text category="p1" status='danger'>{error != undefined && error.message.toLowerCase()}</Text>

            <TextInput placeholder='Username' label='Username' ref={TextInputUserRef} />
            <TextInput placeholder='Emile' label='Email' ref={TextInputEmailRef} />
            <TextInput placeholder='Password' label='Password' isSecure={true} ref={TextInputPassRef} />
            <TextInput placeholder='Confirm Password' label='Confirm' isSecure={true} ref={TextInputPassConfirmRef} />

            <Button style={{ marginVertical: 20 }} onPress={handleForm} >
                <Text style={styles.title} >SIGN UP</Text>
            </Button>

            <Text category='p2' style={styles.textAlignment} >Or Sign In using Social Media</Text>
            <OtherOptions />

            <TouchableOpacity onPress={() => setIsRegistered(p => !p)}  >
                <Text category='p2' style={styles.textAlignment} >Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </Container>
    )
}

export default SigninForm

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