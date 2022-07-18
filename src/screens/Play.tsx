import React, { useState } from 'react'
import { Box, Button, IconButton, Modal } from 'native-base'

import { RootStackScreenProps } from '../navigation/types'
import Client from '../Client'

const Play = ({ navigation, route }: RootStackScreenProps<'Play'>) => {
    const { players, bot1, bot2, bot3, bot4 } = route.params
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Do you want to quit the game?</Modal.Header>
                    <Modal.Footer borderWidth="0">
                        <Button.Group space={2}>
                            <Button
                                variant="ghost"
                                colorScheme="blueGray"
                                onPress={() => setShowModal(false)}>
                                No
                            </Button>
                            <Button
                                colorScheme="error"
                                onPress={() => navigation.navigate('Settings')}>
                                Yes
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <Box
                safeArea
                bg="lightBlue.200"
                flex={1}
                justifyContent="center"
                p="3">
                <Client
                    players={players}
                    bot1={bot1}
                    bot2={bot2}
                    bot3={bot3}
                    bot4={bot4}
                />
                <Box
                    safeAreaTop
                    safeAreaRight
                    position="absolute"
                    top="0"
                    right="0">
                    <IconButton
                        color="black"
                        size="lg"
                        _icon={{
                            name: 'close',
                        }}
                        onPress={() => setShowModal(true)}
                    />
                </Box>
            </Box>
        </>
    )
}

export default Play
