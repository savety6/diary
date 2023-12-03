import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TopNav from '../Components/TopNav';
import MemoryList from '../Components/MemoryList/MemoryList';
import NewMemory from '../Components/NewMemory';

import { Token } from '../Constants/Types'

const GetTokenFromLocalStorage = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('JWT-user');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e);
    }
};

const Home = ({ navigation }) => {
    const [token, setToken] = useState<Token>({ token: '' })
    const navigateDetails = () => {
        navigation.navigate('Details');
    };

    useEffect(() => {

        const getToken = async () => {
            const token = await GetTokenFromLocalStorage()
            if (token === null) {
                navigation.navigate('Authenticate');
            } else {
                return await token
            }
        }
        getToken().then((token) => {
            setToken(token)
        })

    }, [])
    //New memory 

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNav />
            {
                token && <MemoryList token={token}/>
            }
            <NewMemory />
        </SafeAreaView>
    );
};

export default Home;