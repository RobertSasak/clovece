import type { Game } from 'boardgame.io'

import enumerate from './helpers/enumerate'
import endIf from './helpers/endIf'
import setup from './helpers/setup'
import { move } from './moves/move'
import { roll } from './moves/roll'
import { select } from './moves/select'
import { State } from './types'

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
    endIf,
    ai: {
        enumerate,
    },
}

export default game
