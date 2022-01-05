import { Ctx, Move } from 'boardgame.io'
import { INVALID_MOVE } from 'boardgame.io/core'

import { FieldSector, State } from '../types'

export const selectError = (
    G: State,
    _ctx: Ctx,
    playerId: string,
): false | string => {
    if (playerId === undefined) {
        throw new Error('PlayerId is undefined')
    }
    if (G.kicked === null) {
        return 'Nothing to select. Token need to be kicked out first.'
    }
    return false
}

export const select: Move<State> = (G, ctx, playerId: string) => {
    if (selectError(G, ctx, playerId)) {
        return INVALID_MOVE
    }
    if (G.kicked === null) {
        return INVALID_MOVE
    }
    G.tokens[G.kicked].sector = FieldSector.START
    G.tokens[G.kicked].playerId = playerId
    G.kicked = null
    ctx.events?.endTurn()
}
