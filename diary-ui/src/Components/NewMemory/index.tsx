import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Button, Card, Modal, Text } from '@ui-kitten/components';

import AddButton from './AddButton'
import MemoryCreationModal from './MemoryCreationModal'

type Props = {}

const NewMemory = (props: Props) => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <AddButton setVisible={setVisible} />
            <MemoryCreationModal visible={visible} setVisible={setVisible} />
        </>
    )
}

export default NewMemory

const styles = StyleSheet.create({
    container: {
        minHeight: 192,
    },
})