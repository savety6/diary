import { StyleSheet, View, ViewProps } from 'react-native'
import React, {useRef} from 'react'
import { Button, Card, Text, Modal} from '@ui-kitten/components'

import TextInput from './TextInput'

type Props = {
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const MemoryCreationModal = ({ visible, setVisible }: Props) => {
    const TextInputRef = useRef<any>(null);

    const handleAccept =  () => {
        console.log(TextInputRef.current?.getValue());
        TextInputRef.current?.clear()
        setVisible(false)
    }

    const handleCancel = () => {
        TextInputRef.current?.clear()
        setVisible(false)
    }

    const Header = (props: ViewProps): React.ReactElement => (
        <View {...props}>
            <Text category='h6'>
                Today
            </Text>
            <Text category='s1'>
                {new Date().toUTCString()}
            </Text>
        </View>
    );

    const Footer = (props: ViewProps): React.ReactElement => (
        <View
            {...props}
            style={[props.style, styles.footerContainer]}
        >
            <Button
                style={styles.footerControl}
                size='small'
                status='basic'
                onPress={handleCancel}
            >
                CANCEL
            </Button>
            <Button
                style={styles.footerControl}
                size='small'
                onPress={handleAccept}
            >
                ACCEPT
            </Button>
        </View>
    );

    return (
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}
        >
            <Card
                disabled={true}
                status='primary'
                style={styles.card}
                header={Header}
                footer={Footer}
            >
                <TextInput ref={TextInputRef}/>
            </Card>
        </Modal>
    )
}

export default MemoryCreationModal

const styles = StyleSheet.create({
    container: {
        minHeight: 192,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        flex: 1,
        margin: 2,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    footerControl: {
        marginHorizontal: 2,
    },
})