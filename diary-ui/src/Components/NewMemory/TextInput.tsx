import { StyleSheet, Text, View } from 'react-native'
import React, {useState, forwardRef, useRef, useImperativeHandle } from 'react'
import { Input } from '@ui-kitten/components'
import useDebounce from '../../Hooks/useDebounce'

import useInputState from '../../Hooks/useInputState'
import markdownToHtml from '../../Util/markdownToHtml'

type Props = {
    setHtml: React.Dispatch<React.SetStateAction<string | null>>
}

const TextInput = ({setHtml}: Props, ref) => {
    const {value, onChangeText} = useInputState();

    const valueRef = useRef('');
    valueRef.current = value;

    useDebounce(() => {
        const parsedHtml = markdownToHtml(value)
        setHtml(parsedHtml)
    }, 500, [value])

    useImperativeHandle(ref, () => ({
        getValue: () => valueRef.current,
        setValue: (value: string) => onChangeText(value),
        clear: () => onChangeText('')
    }));

    return (
        <Input
            multiline={true}
            textStyle={styles.inputTextStyle}
            placeholder='Place your Memory here'
            value={value}
            onChangeText={onChangeText}
        />
    )
}

export default forwardRef(TextInput)

const styles = StyleSheet.create({
    inputTextStyle: {
        minHeight: 80,
    },
})