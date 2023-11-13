import React from "react";
import { View } from "react-native";
import { Card } from "@ui-kitten/components";
import { useMediaQuery } from "react-responsive";

const Container = ({ children }): React.ReactElement => {
    const isTabletOrMobileDevice: boolean = useMediaQuery({
        maxDeviceWidth: 1224,
        query: "(max-device-width: 1224px)"
    });

    return isTabletOrMobileDevice ? (
        <View>{children}</View>
    ) : (
        <Card disabled={true}>{children}</Card>
    );
};

export default Container;