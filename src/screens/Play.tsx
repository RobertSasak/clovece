import React, { useMemo } from 'react'
import { Local } from 'boardgame.io/multiplayer'
import { Box, Icon, IconButton } from 'native-base'

import client from '../helpers/client'
import Game from '../Game'
import Board from '../Board'
import SimpleBot from '../bots/simple'
import { RootStackScreenProps } from '../navigation/types'

interface Bots {
    '0'?: typeof SimpleBot
    '1'?: typeof SimpleBot
    '2'?: typeof SimpleBot
    '3'?: typeof SimpleBot
}

const Play = ({ navigation, route }: RootStackScreenProps<'Play'>) => {
    const { players, bot1, bot2, bot3, bot4 } = route.params

    const Client = useMemo(() => {
        const bots: Bots = {}
        if (bot1) {
            bots['0'] = SimpleBot
        }
        if (bot2) {
            bots['1'] = SimpleBot
        }
        if (bot3) {
            bots['2'] = SimpleBot
        }
        if (bot4) {
            bots['3'] = SimpleBot
        }

        return client({
            game: Game,
            board: Board,
            debug: {
                collapseOnLoad: true,
            },
            numPlayers: players,
            multiplayer: Local({
                bots,
            }),
        })
    }, [players, bot1, bot2, bot3, bot4])
    return (
        <Box safeArea bg="lightBlue.200" flex={1}>
            <Client playerID="0" />
            <Box safeAreaTop safeAreaRight position="absolute">
                <IconButton
                    color="black"
                    size="lg"
                    _icon={{
                        name: 'menu',
                    }}
                    variant="outline"
                    onPress={() => navigation.navigate('Settings')}
                />
            </Box>
        </Box>
    )
}

export default Play
