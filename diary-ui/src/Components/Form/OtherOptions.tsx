import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { useTheme } from "@ui-kitten/components"

import { Entypo, FontAwesome } from '@expo/vector-icons';

const OtherOptions = (): React.ReactElement => {
    const theme = useTheme()
    const alertMessage = () => alert("Too bad :( didn't implement this feature yet!")
    return (
        <View style={styles.row}>
                <TouchableOpacity onPress={alertMessage}>
                    <FontAwesome name="google" size={24} color={theme['text-basic-color']} />
                </TouchableOpacity>
                <TouchableOpacity onPress={alertMessage}>
                    <FontAwesome name="facebook" size={24} color={theme['text-basic-color']} />
                </TouchableOpacity>
                <TouchableOpacity onPress={alertMessage}>
                    <Entypo name="twitter" size={24} color={theme['text-basic-color']} />
                </TouchableOpacity>
            </View>
    )
}

export default OtherOptions

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 20,
    },
})