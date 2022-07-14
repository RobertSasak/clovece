import { Ctx, Move } from 'boardgame.io'
import { INVALID_MOVE } from 'boardgame.io/core'

import { Color, FieldSector, State } from '../types'

const color2FieldId = {
    [Color.Red]: 0,
    [Color.Green]: 1,
    [Color.Blue]: 2,
    [Color.Yellow]: 3,
}

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
    const token = G.tokens[G.kicked]
    if (G.players[playerId].start[token.color]) {
        return `Player ${playerId} already has token of ${token.color} color in their start.`
    }
    if (G.players[playerId].end[token.color]) {
        return `Player ${playerId} already has token of ${token.color} color in their finish.`
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
    const token = G.tokens[G.kicked]
    token.sector = FieldSector.START
    token.playerId = playerId
    token.fieldId = color2FieldId[token.color]
    G.players[playerId].start[token.color] = true
    G.kicked = null
    if (G.die !== 6) {
        ctx.events?.endTurn()
    }
}
