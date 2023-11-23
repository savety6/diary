import { StyleSheet, Platform, } from 'react-native'
import TextInput from './TextInput'
import React, { useRef, useState } from 'react'
import { Layout, Toggle } from '@ui-kitten/components'
import { WebView } from 'react-native-webview';

type Props = {}

const TextEditor = (props: Props) => {
    const TextInputRef = useRef<any>(null);

    const [checked, setChecked] = useState(false);
    const [storeValue, setStoreValue] = useState('');

    const [html, setHtml] = useState<string | null>(null)

    const onCheckedChange = (isChecked): void => {
        // if (isChecked) {
        //     setStoreValue(TextInputRef.current?.getValue());
        // }else{
        //     TextInputRef.current?.setValue("gei");
        // }

        setChecked(isChecked);
    };

    const Preview = () => {
        if (Platform.OS === 'web') {
            return (
                <div dangerouslySetInnerHTML={{ __html: html || '' }} />
            )
        }
        else {
            return (
                <WebView source={{ html: html }} />
            )
        }
    }

    return (
        <Layout>
            <Toggle
                checked={checked}
                onChange={onCheckedChange}
            >
                {`Preview: ${checked ? 'ON' : 'OFF'}`}
            </Toggle>
            {checked && <Preview />}

            <TextInput ref={TextInputRef} setHtml={setHtml} />

        </Layout>
    )
}

export default TextEditor

const styles = StyleSheet.create({})