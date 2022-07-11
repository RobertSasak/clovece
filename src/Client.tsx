import { Client as ClientReact } from 'boardgame.io/react'
import { Client as ClientReactNative } from 'boardgame.io/react-native'
import { Platform } from 'react-native'
import { Local } from 'boardgame.io/multiplayer'
import { MCTSBot } from 'boardgame.io/ai'

import Game from './Game'
import Board from './Board'
import { Ctx } from 'boardgame.io'
import { State } from './types'

const client: typeof ClientReact =
    Platform.OS === 'web' ? ClientReact : ClientReactNative

class CustomMCTSBot extends MCTSBot {
    constructor(config, ...args) {
        super(
            {
                ...config,
                objectives: () => ({
                    finished1: {
                        checker: (G: State, ctx: Ctx) => {
                            return G.players[ctx.currentPlayer].finished === 1
                        },
                        weight: 10,
                    },
                    finished2: {
                        checker: (G: State, ctx: Ctx) => {
                            return G.players[ctx.currentPlayer].finished === 2
                        },
                        weight: 20,
                    },
                    finished3: {
                        checker: (G: State, ctx: Ctx) => {
                            return G.players[ctx.currentPlayer].finished === 3
                        },
                        weight: 30,
                    },
                    kickPlayer: {
                        checker: (G: State, _ctx: Ctx) => {
                            return G.kicked !== null
                        },
                        weight: 1,
                    },
                }),
                iterations: 1,
                playoutDepth: 1,
            },
            ...args,
        )
    }
}

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
            '1': CustomMCTSBot,
        },
    }),
})

export default Client
