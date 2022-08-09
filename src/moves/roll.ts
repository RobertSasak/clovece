import { Ctx, Move } from 'boardgame.io'
import { INVALID_MOVE } from 'boardgame.io/core'

import enumerate from '../helpers/enumerate'
import { State } from '../types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const rollError = (G: State, ctx: Ctx): false | string => {
    if (ctx.gameover) {
        return 'The game is over.'
    }
    if (G.moves !== 0) {
        return 'Finish your move before before rolling die.'
    }
    if (G.kicked !== null) {
        return 'Select which player gets kicked out token before rolling die again.'
    }
    return false
}

export const roll: Move<State> = (G, ctx) => {
    if (rollError(G, ctx)) {
        return INVALID_MOVE
    }
    if (!ctx.random) {
        throw new Error('Random is undefined')
    }
    G.die = ctx.random.D6()
    G.moves = G.die
    if (enumerate(G, ctx).length == 0) {
        G.moves = 0
        ctx.events?.endTurn()
    }
}
