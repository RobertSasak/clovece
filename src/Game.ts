import type { Game, Ctx } from 'boardgame.io'

import enumerate from './helpers/enumerate'
import endIf from './helpers/endIf'
import setup from './helpers/setup'
import { move } from './moves/move'
import { roll } from './moves/roll'
import { select } from './moves/select'
import { SEGMENT_SIZE } from './constants'
import { State, Token, Color, FieldSector, Players } from './types'

const game: Game<State> = {
    name: 'Clovece',
    seed: 0,
    minPlayers: 2,
    maxPlayers: 4,
    setup,
    moves: {
        roll,
        move,
        select,
    },
    turn: {
        onEnd: (G) => {
            G.moves = 0
        },
    },
    endIf,
    ai: {
        enumerate,
    },
}

export default game
