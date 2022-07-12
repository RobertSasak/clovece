import { Local } from 'boardgame.io/multiplayer'

import client from './helpers/client'
import Game from './Game'
import Board from './Board'
import SimpleBot from './bots/simple'

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
