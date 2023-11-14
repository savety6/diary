import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Divider, Layout, TopNavigation, Text } from '@ui-kitten/components';

const GetTokenFromLocalStorage = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('JWT-user');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e);
    }
};

const Home = ({ navigation }) => {

    const navigateDetails = () => {
        navigation.navigate('Details');
    };

    useEffect(() => {

        const getToken = async () => {
            const token = await GetTokenFromLocalStorage()
            if (token === null) {
                navigation.navigate('Authenticate');
            }else{
                return await token
            }
        }
        const token = getToken().then()
        console.log(token)
        
        
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title='MyApp' alignment='center' />
            <Divider />
            
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button onPress={navigateDetails}>OPEN DETAILS</Button>
            </Layout>
        </SafeAreaView>
    );
};

export default Home;