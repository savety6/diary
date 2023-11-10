import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Input, useTheme } from '@ui-kitten/components';
import { Entypo, Ionicons, FontAwesome } from '@expo/vector-icons';
import React, { useState, forwardRef, useRef, useImperativeHandle, lazy } from 'react'


const AlertIcon = (props) => (
    <Ionicons
        {...props}
        name='alert-circle-outline'
        size={24}
        color={"black"}//TODO: change color to theme color
    />
);

type Props = {
    placeholder: string
    label?: string
    isSecure?: boolean
}

const TextInput = ({ placeholder, label, isSecure }: Props, ref) => {
    const theme = useTheme()

    const [value, setValue] = useState('')
    const [Error, setError] = useState('')

    const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

    const valueRef = useRef('');
    valueRef.current = value;

    useImperativeHandle(ref, () => ({
        setError: (error) => setError(error),
        getValue: () => valueRef.current
    }));

    const toggleSecureEntry = (): void => {
        setSecureTextEntry(!secureTextEntry);
    };

    const handleChangeText = (nextValue): void => {
        setError('');
        setValue(nextValue);
    }

    const renderIcon = (props): React.ReactElement => {
        if (!isSecure) {
            return (<Ionicons name="person" size={24} color={theme['text-disabled-color']} />)
        }
        return (
            <TouchableOpacity onPress={toggleSecureEntry}>
                <Entypo
                    name={secureTextEntry ? 'eye-with-line' : 'eye'}
                    size={24}
                    color={theme['text-disabled-color']}
                />
            </TouchableOpacity>
        )
    };
    const renderCaption = (): React.ReactElement => {
        if (!Error) {
            return <></>
        }
        return (
            <View style={styles.captionContainer}>
                {AlertIcon(styles.captionIcon)}
                <Text style={styles.captionText}>
                    {Error}
                </Text>
            </View>
        );
    };
    return (
        <Input
            status='basic'
            value={value}
            label={evaProps => <Text {...evaProps} style={{ color: theme['text-basic-color'] }}>{label ? label : ""}</Text>}
            placeholder={placeholder}
            caption={renderCaption}
            onChangeText={handleChangeText}
            accessoryRight={renderIcon}
            secureTextEntry={isSecure ? secureTextEntry : false}
        />
    )
}

export default forwardRef(TextInput)

const styles = StyleSheet.create({
    captionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    captionIcon: {
        width: 16,
        height: 16,
        marginRight: 8,
    },
    captionText: {
        fontSize: 12,
        fontWeight: '400',
        color: 'red',
    },
})