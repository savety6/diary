import React, { useRef } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { Button, Text } from '@ui-kitten/components';
import { NavigationProp } from '@react-navigation/native';

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
        navigation.navigate("Home")
    }

    return (
        <Container>
            <Text category="h1" style={styles.title}>Nice to meat you!</Text>
            <Text category="p1" style={styles.subTitle}>Create your account</Text>

            <TextInput placeholder='Username' label='Username' ref={TextInputUserRef}/>
            <TextInput placeholder='Emile' label='Email' ref={TextInputEmailRef}/>
            <TextInput placeholder='Password' label='Password' isSecure={true} ref={TextInputPassRef}/>
            <TextInput placeholder='Confirm Password' label='Confirm' isSecure={true} ref={TextInputPassConfirmRef}/>

            <Button style={{marginVertical: 20}} onPress={handleForm} >
                <Text style={styles.title} >SIGN UP</Text>
            </Button>

            <Text category='p2' style={styles.textAlignment} >Or Sign In using Social Media</Text>
            <OtherOptions/>

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