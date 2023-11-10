import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { Layout, Button, Card, Input, Text, useTheme } from '@ui-kitten/components';
import { Entypo, Ionicons, FontAwesome } from '@expo/vector-icons';
import { useMediaQuery } from 'react-responsive';
import { NavigationProp } from '@react-navigation/native';

type Props = {
    navigation: NavigationProp<any>
    setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>
}

const AlertIcon = (props) => (
    <Ionicons
        {...props}
        name='alert-circle-outline'
        size={24}
        color={"black"}//TODO: change color to theme color
    />
);

const SigninForm = ({ navigation, setIsRegistered }: Props) => {
    const isTabletOrMobileDevice: boolean = useMediaQuery({
        maxDeviceWidth: 1224,
        query: "(max-device-width: 1224px)"
    });
    const theme = useTheme()

    const [username, setUsername] = useState<string>('');
    const [userError, setUserError] = useState<string | null>(null);
    const [password, setPassword] = useState<string>('');
    const [passError, setPassError] = useState<string | null>(null);
    const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

    const handleForm = async () => {
        if (username === '') {
            setUserError('Username cannot be empty')
            return
        }
        if (password === '') {
            setPassError('Password cannot be empty')
            return
        }
        navigation.navigate("Home")
    }

    const toggleSecureEntry = (): void => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props): React.ReactElement => (
        <TouchableOpacity onPress={toggleSecureEntry}>
            <Entypo
                name={secureTextEntry ? 'eye-with-line' : 'eye'}
                size={24}
                color={theme['text-disabled-color']}
            />
        </TouchableOpacity>
    );
    const renderCaptionUsername = (): React.ReactElement => {
        if (!userError) {
            return <></>
        }
        return (
            <View style={styles.captionContainer}>
                {AlertIcon(styles.captionIcon)}
                <Text style={styles.captionText}>
                    {userError}
                </Text>
            </View>
        );
    };
    const renderCaptionPassword = (): React.ReactElement => {
        if (!passError) {
            return <></>
        }
        return (
            <View style={styles.captionContainer}>
                {AlertIcon(styles.captionIcon)}
                <Text style={styles.captionText}>
                    {passError}
                </Text>
            </View>
        );
    };
    const Container = (props): React.ReactElement => {
        if (!isTabletOrMobileDevice) {
            return (
                <Card disabled={true}>
                    {props.children}
                </Card>
            )
        } else
            return (
                <View>
                    {props.children}
                </View>
            )
    }

    return (
        <Container>
            <Text category="h1" style={styles.title}>Hello</Text>
            <Text category="p1" style={styles.subTitle}>Sign in to your account</Text>
            <Input
                status='basic'
                value={username}
                label={evaProps => <Text {...evaProps} style={{ color: theme['text-basic-color'] }}>Username</Text>}
                placeholder='Username or Email'
                caption={renderCaptionUsername}
                onChangeText={nextValue => setUsername(nextValue)}
                accessoryRight={<Ionicons name="person" size={24} color={theme['text-disabled-color']} />}
            />
            <Input
                value={password}
                label={evaProps => <Text {...evaProps} style={{ color: theme['text-basic-color'] }}>Password</Text>}
                placeholder='Password'
                caption={renderCaptionPassword}
                onChangeText={nextValue => setPassword(nextValue)}
                secureTextEntry={secureTextEntry}
                accessoryRight={renderIcon}
            />
            <TouchableOpacity onPress={() => alert("Too bad for you :( didn't implement this feature yet!")}>
                <Text category='c1' style={{ textAlign: 'right', marginBottom: 20 }}>Forgot your password?</Text>
            </TouchableOpacity>

            <Button onPress={handleForm} >
                <Text style={styles.title} >SIGN UP</Text>
            </Button>
            <Text category='p2' style={styles.textAlignment} >Or Sign In using Social Media</Text>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => alert("Too bad for you :( didn't implement this feature yet!")}>
                    <FontAwesome name="google" size={24} color={theme['text-basic-color']} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert("Too bad for you :( didn't implement this feature yet!")}>
                    <FontAwesome name="facebook" size={24} color={theme['text-basic-color']} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert("Too bad for you :( didn't implement this feature yet!")}>
                    <Entypo name="twitter" size={24} color={theme['text-basic-color']} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setIsRegistered(p => !p)}  >
                <Text category='p2' style={styles.textAlignment} >Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </Container>
    )
}

export default SigninForm

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontWeight: '100',
        letterSpacing: 2,
    },
    subTitle: {
        textAlign: 'center',
        fontWeight: '100',
        letterSpacing: 1,
        marginVertical: 16,
    },
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
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 20,
    },
    textAlignment: {
        textAlign: 'center',
        marginVertical: 20,
    }
})