import { StyleSheet, Text, View } from 'react-native'
import React, {useState, forwardRef, useRef, useImperativeHandle } from 'react'
import { Input } from '@ui-kitten/components'

import useInputState from '../../Hooks/useInputState'

type Props = {}

const TextInput = (props: Props, ref) => {
    const {value, onChangeText} = useInputState();

    const valueRef = useRef('');
    valueRef.current = value;

    useImperativeHandle(ref, () => ({
        getValue: () => valueRef.current,
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