import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList, Dimensions, ListRenderItemInfo, Platform } from 'react-native'
import { Button, Layout, Text, Spinner, Card, Modal } from '@ui-kitten/components';

import type { Token } from '../../Constants/Types'
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUpdateEffect from '../../Hooks/useUpdateEffect';
import WebView from 'react-native-webview';

type Props = {
    token: Token
}

type LoadingState = {
    state: "loading"
}
type ErrorState = {
    state: "error"
    errorMessage: string
}
type SuccessState = {
    state: "success"
    data: any
}
type State = LoadingState | ErrorState | SuccessState

const GetTokenFromLocalStorage = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('JWT-user');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e);
    }
};

const screenWidth = Dimensions.get('window').width;
const boxWidth = 200; // width of each box
const numColumns = Math.floor(screenWidth / boxWidth);

const initialState: LoadingState = {
    state: "loading"
}

const renderItemHeader = (headerProps, info: ListRenderItemInfo<{ title: string }>): React.ReactElement => (
    <Layout {...headerProps} level='3' >
        <Text category='h6'>
            {`${info.item.title}`}
        </Text>
    </Layout>
);

const renderItemFooter = (footerProps, info: ListRenderItemInfo<{ date: string }>): React.ReactElement => (
    <Text {...footerProps}>
        {`${info.item.date}`}
    </Text>
);

const renderItem = (info): React.ReactElement => (
    <Card
        style={styles.item}
        status='basic'
        header={headerProps => renderItemHeader(headerProps, info)}
        footer={footerProps => renderItemFooter(footerProps, info)}
    >
        <Preview html={info.item.content}></Preview>
    </Card>
);

const Preview = ({ html }) => {
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

const MemoryList = (props: any) => {
    const [token, setToken] = useState<Token>({ token: '' })
    const [count, setCount] = useState<number>(0)
    
    const [visibleMemory, setVisibleMemory] = useState<boolean>(false);
    const [selectedMemory, setSelectedMemory] = useState<any>(null)
    
    const [response, setResponse] = useState<State>(initialState)


    const fetchMemory = async () => {
        try {
            setResponse({
                state: "loading"
            })
            console.log(` token in the fetch${token.token}`);

            const response = await fetch('http://localhost:3001/Memory/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.token}`
                }
            });
            const data = await response.json();
            console.log(data);
            setResponse({
                state: "success",
                data: data
            })


        } catch (error) {
            console.error(error);
            setResponse({
                state: "error",
                errorMessage: error.message
            })
        }
    }

    useEffect(() => {
        const getToken = async () => {
            const token = await GetTokenFromLocalStorage()
            if (token === null) {
                props.navigation.navigate('Authenticate');
            } else {
                return await token
            }
        }
        getToken().then((token) => {
            setToken(token)
        })
    }, [count])

    useUpdateEffect(() => {
        fetchMemory()
    }, [token])


    return (
        <Layout style={styles.container}>
            <Text category='h1'>Memory List</Text>
            {response.state == "error" && <Text status='danger'>{response.errorMessage}</Text>}
            <FlatList
                style={{ maxHeight: 500 }}
                contentContainerStyle={styles.contentContainer}
                data={response.state == "success" ? response.data : []}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                numColumns={numColumns}
            />
            {response.state == "loading" && <Layout level='5' style={styles.cover}>
                <Spinner />
            </Layout>}
            <Button onPress={() => setCount(count + 1)}>Load More</Button>
            <Modal visible={visibleMemory}>
                <Card disabled={true}>
                    <Preview html={selectedMemory} /> 
                    <Button onPress={() => setVisibleMemory(false)}>
                        DISMISS
                    </Button>
                </Card>
            </Modal>
        </Layout>
    )
}

export default MemoryList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    item: {
        marginVertical: 4,
        marginHorizontal: 10,
    },
    cover: {
        position: 'absolute',
        height: "100%",
        width: "100%",
        opacity: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    }
})