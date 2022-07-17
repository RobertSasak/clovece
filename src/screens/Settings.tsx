import React from 'react'
import { Heading, Button, ScrollView, VStack, Text } from 'native-base'
import { useStatePersist } from 'use-state-persist'

import PlayerInput from '../components/PlayerInput'
import { RootStackScreenProps } from '../navigation/types'

const Settings = ({ navigation }: RootStackScreenProps<'Settings'>) => {
    const [type, setType] = useStatePersist('TYPE', 'local')
    const [players, setPlayers] = useStatePersist('PLAYERS', '2')
    // const [theme, setTheme] = useStatePersist('THEME', 'classic')
    const [player1, setPlayer1] = useStatePersist('PLAYER1', '')
    const [player2, setPlayer2] = useStatePersist('PLAYER2', '')
    const [player3, setPlayer3] = useStatePersist('PLAYER3', '')
    const [player4, setPlayer4] = useStatePersist('PLAYER4', '')
    const [bot1, setBot1] = useStatePersist('BOT1', false)
    const [bot2, setBot2] = useStatePersist('BOT2', true)
    const [bot3, setBot3] = useStatePersist('BOT3', true)
    const [bot4, setBot4] = useStatePersist('BOT4', true)
    return (
        <VStack
            flex={1}
            bg="lightBlue.200"
            alignItems="center"
            justifyContent="center"
            alignContent={'stretch'}>
            <VStack
                safeArea
                bg="white"
                flex={1}
                borderRadius={{ sm: 20 }}
                maxW={480}
                w="100%"
                m={{ sm: 5 }}>
                <ScrollView h="100px" p={5}>
                    <Heading size="4xl" textAlign="center">
                        Clovece
                    </Heading>
                    <Heading size="lg" my="3">
                        Game type
                    </Heading>
                    <Button.Group isAttached>
                        <Button
                            onPress={() => setType('local')}
                            variant={type === 'local' ? 'solid' : 'outline'}>
                            Local
                        </Button>
                        <Button
                            onPress={() => setType('online')}
                            variant={type === 'online' ? 'solid' : 'outline'}
                            isDisabled>
                            Online*
                        </Button>
                    </Button.Group>
                    <Heading size="lg" my="3">
                        Number of players
                    </Heading>
                    <Button.Group isAttached>
                        <Button
                            onPress={() => setPlayers('2')}
                            variant={players === '2' ? 'solid' : 'outline'}>
                            2
                        </Button>
                        <Button
                            onPress={() => setPlayers('3')}
                            variant={players === '3' ? 'solid' : 'outline'}
                            isDisabled>
                            3*
                        </Button>
                        <Button
                            onPress={() => setPlayers('4')}
                            variant={players === '4' ? 'solid' : 'outline'}>
                            4
                        </Button>
                    </Button.Group>
                    {/* <Heading size="lg" my="3">
                        Theme
                    </Heading>
                    <Button.Group isAttached>
                        <Button
                            onPress={() => setTheme('classic')}
                            variant={theme === 'classic' ? 'solid' : 'outline'}>
                            Classic
                        </Button>
                        <Button
                            onPress={() => setTheme('modern')}
                            variant={theme === 'modern' ? 'solid' : 'outline'}
                            isDisabled>
                            Modern*
                        </Button>
                    </Button.Group> */}
                    <Heading size="lg" my="3">
                        Players
                    </Heading>
                    <PlayerInput
                        value={player1}
                        placeholder="Player 1"
                        onChange={setPlayer1}
                        bot={bot1}
                        setBot={setBot1}
                    />
                    <PlayerInput
                        visible={+players >= 2}
                        value={player2}
                        placeholder="Player 2"
                        onChange={setPlayer2}
                        bot={bot2}
                        setBot={setBot2}
                    />
                    <PlayerInput
                        visible={+players >= 3}
                        value={player3}
                        placeholder="Player 3"
                        onChange={setPlayer3}
                        bot={bot3}
                        setBot={setBot3}
                    />
                    <PlayerInput
                        visible={+players >= 4}
                        value={player4}
                        placeholder="Player 4"
                        onChange={setPlayer4}
                        bot={bot4}
                        setBot={setBot4}
                    />
                    <Text color={'gray.400'}>
                        *Stay tuned for future version
                    </Text>
                </ScrollView>
                <Button
                    size="lg"
                    mx={5}
                    mb={5}
                    onPress={() =>
                        navigation.navigate('Play', {
                            players: +players,
                            bot1,
                            bot2: +players > 1 && bot2,
                            bot3: +players > 2 && bot3,
                            bot4: +players > 3 && bot4,
                        })
                    }>
                    Start game
                </Button>
            </VStack>
        </VStack>
    )
}

export default Settings
