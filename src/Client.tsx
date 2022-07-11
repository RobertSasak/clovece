import { Client as ClientReact } from 'boardgame.io/react'
import { Client as ClientReactNative } from 'boardgame.io/react-native'
import { Platform } from 'react-native'

import Game from './Game'
import Board from './Board'

const client: typeof ClientReact =
    Platform.OS === 'web' ? ClientReact : ClientReactNative

const Client = client({
    game: Game,
    board: Board,
    debug: {
        collapseOnLoad: true,
    },
    numPlayers: 2,
})

export default Client
