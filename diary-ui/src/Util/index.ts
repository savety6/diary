import AsyncStorage from '@react-native-async-storage/async-storage';

const isEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const storeTokenToLocalStorage = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('JWT-user', jsonValue);
    } catch (e) {
        console.log(e);
    }
};

const getTokenFromLocalStorage = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('JWT-user');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e);
    }
}

export { isEmail, storeTokenToLocalStorage, getTokenFromLocalStorage };