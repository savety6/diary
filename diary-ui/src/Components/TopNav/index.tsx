import React from 'react';
import {
    IconElement,
    Text,
    Layout,
    MenuItem,
    OverflowMenu,
    TopNavigation,
    TopNavigationAction,
    Divider,
} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const BackIcon = (props): IconElement => (
    <Ionicons
        {...props}
        name='arrow-back'
    />
);

const EditIcon = (props): IconElement => (
    <Ionicons
        {...props}
        name='edit'
    />
);

const MenuIcon = (props): IconElement => (
    <Ionicons
        {...props}
        name='more-vertical'
    />
);

const InfoIcon = (props): IconElement => (
    <Ionicons
        {...props}
        name='info'
    />
);

const LogoutIcon = (props): IconElement => (
    <Ionicons
        {...props}
        name='log-out'
    />
);

export default function TopNav (): React.ReactElement {

    const [menuVisible, setMenuVisible] = React.useState(false);

    const toggleMenu = (): void => {
        setMenuVisible(!menuVisible);
    };

    const renderMenuAction = (): React.ReactElement => (
        <TopNavigationAction
            icon={MenuIcon}
            onPress={toggleMenu}
        />
    );

    // const renderRightActions = (): React.ReactElement => (
    //     <>
    //         <TopNavigationAction icon={EditIcon} />
    //         <OverflowMenu
    //             anchor={renderMenuAction}
    //             visible={menuVisible}
    //             onBackdropPress={toggleMenu}
    //         >
    //             <MenuItem
    //                 accessoryLeft={InfoIcon}
    //                 title='About'
    //             />
    //             <MenuItem
    //                 accessoryLeft={LogoutIcon}
    //                 title='Logout'
    //             />
    //         </OverflowMenu>
    //     </>
    // );

    return (
        <Layout
            style={styles.container}
            level='1'
        >
            <TopNavigation
                alignment='start'
                title={evaProps => <Text {...evaProps} category='h1' style={{marginHorizontal: 20, fontWeight: "100"}} >My Diary</Text>}
                // accessoryRight={renderRightActions}
            />
            <Divider />
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: 128,
    },
});