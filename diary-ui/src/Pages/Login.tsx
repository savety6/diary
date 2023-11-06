import { StyleSheet, Text, View, Button } from 'react-native'
import React, {useState} from 'react'

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
        <View>
            <Text>{text}</Text>
            <Button title="Go to Home" onPress={handlePress} />
        </View>
    )
}

export default Login

const styles = StyleSheet.create({})