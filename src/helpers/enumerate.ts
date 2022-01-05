import { Ctx } from 'boardgame.io'

import { moveError } from '../moves/move'
import { rollError } from '../moves/roll'
import { selectError } from '../moves/select'
import { State } from '../types'

export default (G: State, ctx: Ctx) => {
    let moves = []
    if (!rollError(G, ctx)) {
        moves.push({ move: 'rollDie' })
    }
    for (let i = 0; i < G.tokens.length; i++) {
        if (!moveError(G, ctx, i)) {
            moves.push({ move: 'move', args: [i] })
        }
    }
    ctx.playOrder.forEach((p) => {
        if (!selectError(G, ctx, p)) {
            moves.push({ move: 'select', args: [p] })
        }
    })
    return moves
}
