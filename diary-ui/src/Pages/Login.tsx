import { StyleSheet } from 'react-native'
import React, {useState} from 'react'

import { Button, Layout, Text } from '@ui-kitten/components';

type Props = {}

const Login = (props: Props) => {
    const [text, setText] = useState(null)
    const handlePress = async () => {
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
        <Layout>
            <Text>{text}</Text>
            <Button onPress={handlePress} >
                LOGIN
            </Button>
        </Layout>
    )
}

export default Login

const styles = StyleSheet.create({})