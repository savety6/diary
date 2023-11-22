import { StyleSheet, Text, View } from 'react-native'
import TextInput from './TextInput'
import React, { useRef, useState } from 'react'
import { Layout, Toggle } from '@ui-kitten/components'
import { WebView } from 'react-native-webview';

type Props = {}

const TextEditor = (props: Props) => {
    const TextInputRef = useRef<any>(null);

    const [checked, setChecked] = useState(false);

    const onCheckedChange = (isChecked): void => {
        setChecked(isChecked);
    };


    return (
        <Layout>
            <Toggle
                checked={checked}
                onChange={onCheckedChange}
            >
                {`Preview: ${checked ? 'ON' : 'OFF'}`}
            </Toggle>
            {checked && <WebView source={{ html: `<h1>hello</h1>` }} />}
            <TextInput ref={TextInputRef} />
        </Layout>
    )
}

export default TextEditor

const styles = StyleSheet.create({})