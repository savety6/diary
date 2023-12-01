import { StyleSheet, View, ViewProps,  } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import { Button, Card, Text, Modal} from '@ui-kitten/components'

import TextEditor from './TextEditor'
import { getTokenFromLocalStorage } from '../../Util'

type Props = {
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

type Token = {
    token: string
}

const MemoryCreationModal = ({ visible, setVisible }: Props) => {
    const [token, setToken] = useState<Token>({ token: '' })

    const TextEditorRef = useRef<any>(null);

    const checkToken = async () => {
        try {
            const localToken = await getTokenFromLocalStorage()
            if (localToken != null) {
                setToken(localToken)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const makeNewMemory = async ( content: string ) => {
        try {
            const response = await fetch("http://localhost:3001/Memory/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.token}`
                },
                body: JSON.stringify({
                    content: `<body>${content}</body>`
                })
            })
            const data = await response.json()
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleAccept =  () => {
        const html = TextEditorRef.current.getValue()
        makeNewMemory(html)
        setVisible(false)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    useEffect(() => {
        checkToken()
    }, [])

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
                <TextEditor ref={TextEditorRef}/>
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