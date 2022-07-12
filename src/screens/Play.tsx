import React, { useMemo } from 'react'
import { Local } from 'boardgame.io/multiplayer'
import { Box, IconButton } from 'native-base'

import client from '../helpers/client'
import Game from '../Game'
import Board from '../Board'
import SimpleBot from '../bots/simple'
import { RootStackScreenProps } from '../navigation/types'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface Bots {
    '1'?: typeof SimpleBot
    '2'?: typeof SimpleBot
    '3'?: typeof SimpleBot
    '4'?: typeof SimpleBot
}

const Play = ({ navigation, route }: RootStackScreenProps<'Play'>) => {
    const { players, bot1, bot2, bot3, bot4 } = route.params

    const Client = useMemo(() => {
        const bots: Bots = {}
        if (bot1) {
            bots['1'] = SimpleBot
        }
        if (bot2) {
            bots['2'] = SimpleBot
        }
        if (bot3) {
            bots['3'] = SimpleBot
        }
        if (bot4) {
            bots['4'] = SimpleBot
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
        <Box safeArea bg="lightBlue.200" p={5} flex={1}>
            <IconButton
                name="plus"
                as={MaterialCommunityIcons}
                onPress={() => navigation.navigate('Settings')}
            />
            <Client playerID="0" />
        </Box>
    )
}

export default Play
