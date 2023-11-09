import React from 'react';
import { SafeAreaView } from 'react-native';
import { Divider, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';

const BackIcon = (props) => (
    <Ionicons {...props} name='arrow-back' size={24} color={"black"} /> //TODO: change color to theme color
);

const Details = ({ navigation }) => {

    const navigateBack = () => {
        navigation.goBack();
    };

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title='MyApp' alignment='center' accessoryLeft={BackAction} />
            <Divider />
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text category='h1'>DETAILS</Text>
            </Layout>
        </SafeAreaView>
    );
};

export default Details;