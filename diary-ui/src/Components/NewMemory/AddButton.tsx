import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Layout, Text, useTheme } from '@ui-kitten/components'
import { AntDesign } from '@expo/vector-icons';


type Props = {
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const AddButton = ({setVisible}: Props) => {
    const theme = useTheme()
    const handleTouch = () => {
        setVisible(true)
    }
    return (
        <TouchableOpacity onPress={handleTouch}>
            <Layout level='4' style={styles.button}>
                <AntDesign name="plus" size={24} color={theme['text-basic-color']} />
            </Layout>
        </TouchableOpacity>
    )
}

export default AddButton

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 40,
        right: 40,
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
})