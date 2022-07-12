import { Client as ClientReact } from 'boardgame.io/react'
import { Client as ClientReactNative } from 'boardgame.io/react-native'
import { Platform } from 'react-native'
import { Local } from 'boardgame.io/multiplayer'

import Game from './Game'
import Board from './Board'
import SimpleBot from './bots/simple'

const client: typeof ClientReact =
    Platform.OS === 'web' ? ClientReact : ClientReactNative

const Client = client({
    game: Game,
    board: Board,
    debug: {
        collapseOnLoad: true,
    },
    numPlayers: 2,
    multiplayer: Local({
        persist: true,
        bots: {
            '1': SimpleBot,
        },
    }),
})

export default Client
