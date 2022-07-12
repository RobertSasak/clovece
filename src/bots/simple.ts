import { MCTSBot } from 'boardgame.io/ai'
import { Ctx } from 'boardgame.io'

import { State } from '../types'

class SimpleBot extends MCTSBot {
    constructor(config, ...args) {
        super(
            {
                ...config,
                objectives: (_G: State, _ctx: Ctx, playerId: string) => ({
                    finished1: {
                        checker: (G: State, _ctx: Ctx) => {
                            return G.players[playerId].finished === 1
                        },
                        weight: 10,
                    },
                    finished2: {
                        checker: (G: State, _ctx: Ctx) => {
                            return G.players[playerId].finished === 2
                        },
                        weight: 20,
                    },
                    finished3: {
                        checker: (G: State, _ctx: Ctx) => {
                            return G.players[playerId].finished === 3
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

export default SimpleBot
