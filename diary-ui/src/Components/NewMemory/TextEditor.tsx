import { StyleSheet, Platform, } from 'react-native'
import TextInput from './TextInput'
import React, {useState, forwardRef, useRef, useImperativeHandle } from 'react'
import { Layout, Toggle } from '@ui-kitten/components'
import { WebView } from 'react-native-webview';

type Props = {}

const TextEditor = (props: Props, ref) => {
    const TextInputRef = useRef<any>(null);

    const [checked, setChecked] = useState(false);

    const [html, setHtml] = useState<string | null>(null)

    const valueRef = useRef('');
    valueRef.current = html;

    useImperativeHandle(ref, () => ({
        getValue: () => valueRef.current,
    }));

    const onCheckedChange = (isChecked): void => {
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

export default forwardRef(TextEditor)

const styles = StyleSheet.create({})