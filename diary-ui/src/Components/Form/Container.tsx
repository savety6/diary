import React from "react";
import { View } from "react-native";
import { Card, Spinner } from "@ui-kitten/components";
import { useMediaQuery } from "react-responsive";

type Props = {
    children: React.ReactNode;
    isLoading: boolean;
};

const Container = ({ children, isLoading}): React.ReactElement => {
    const isTabletOrMobileDevice: boolean = useMediaQuery({
        maxDeviceWidth: 1224,
        query: "(max-device-width: 1224px)"
    });

    if(isLoading) 
        return (<Spinner/>)

    return isTabletOrMobileDevice ? (
        <View>{children}</View>
    ) : (
        <Card disabled={true}>{children}</Card>
    );
};

export default Container;